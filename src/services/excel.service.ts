import * as XLSX from "xlsx";
import type { EmployeeDocument, ExcelParseResult, UniformItem } from "../types/employee";
import { randomId } from "../utils/id";
import { collapseSpaces, stableEmployeeKey } from "../utils/string";

const REQUIRED_HEADERS = [
  "nome",
  "cargo",
  "admissao",
  "data",
  "quantidade",
  "equipamento",
  "tamanho",
  "ca",
] as const;

type RequiredHeader = (typeof REQUIRED_HEADERS)[number];

function normalizeHeader(value: unknown): string {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function cellToString(value: unknown): string {
  if (value == null) return "";
  if (value instanceof Date) {
    try {
      return value.toLocaleDateString("pt-BR");
    } catch {
      return value.toISOString().slice(0, 10);
    }
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  return String(value).trim();
}

function parseQuantity(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    const n = Math.trunc(value);
    return n >= 1 ? n : 1;
  }
  const raw = cellToString(value).replace(/\./g, "").replace(",", ".");
  const n = Number(raw);
  if (!Number.isFinite(n)) return 1;
  const q = Math.trunc(n);
  return q >= 1 ? q : 1;
}

function buildHeaderMap(
  headerRow: unknown[],
): { map: Record<number, RequiredHeader>; missing: string[] } {
  const map: Partial<Record<number, RequiredHeader>> = {};
  const found = new Set<string>();

  headerRow.forEach((cell, index) => {
    const key = normalizeHeader(cell) as RequiredHeader;
    if (REQUIRED_HEADERS.includes(key)) {
      map[index] = key;
      found.add(key);
    }
  });

  const missing = REQUIRED_HEADERS.filter((h) => !found.has(h)).map(
    (h) => `Coluna obrigatória ausente: "${h}"`,
  );

  return { map: map as Record<number, RequiredHeader>, missing };
}

function rowIsEmpty(cells: unknown[]): boolean {
  return cells.every((c) => cellToString(c) === "");
}

function readRowsAsArrays(sheet: XLSX.WorkSheet): unknown[][] {
  const ref = sheet["!ref"];
  if (!ref) return [];
  const range = XLSX.utils.decode_range(ref);
  const rows: unknown[][] = [];
  for (let r = range.s.r; r <= range.e.r; r++) {
    const row: unknown[] = [];
    for (let c = range.s.c; c <= range.e.c; c++) {
      const addr = XLSX.utils.encode_cell({ r, c });
      const cell = sheet[addr];
      row.push(cell?.v ?? "");
    }
    rows.push(row);
  }
  return rows;
}

function mapRowToFields(
  cells: unknown[],
  headerMap: Record<number, RequiredHeader>,
): Record<RequiredHeader, string> {
  const out = {} as Record<RequiredHeader, string>;
  for (const h of REQUIRED_HEADERS) {
    out[h] = "";
  }
  for (const [colIndex, field] of Object.entries(headerMap)) {
    const idx = Number(colIndex);
    out[field] = cellToString(cells[idx]);
  }
  return out;
}

export function parseExcelBuffer(buffer: ArrayBuffer): ExcelParseResult {
  const warnings: string[] = [];

  let workbook: XLSX.WorkBook;
  try {
    workbook = XLSX.read(buffer, { type: "array", cellDates: true });
  } catch {
    return {
      ok: false,
      employees: [],
      errors: ["Não foi possível ler o arquivo Excel."],
      warnings: [],
      rowCount: 0,
      skippedEmptyRows: 0,
    };
  }

  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    return {
      ok: false,
      employees: [],
      errors: ["A planilha não contém abas."],
      warnings: [],
      rowCount: 0,
      skippedEmptyRows: 0,
    };
  }

  const sheet = workbook.Sheets[sheetName];
  const matrix = readRowsAsArrays(sheet);
  if (matrix.length < 2) {
    return {
      ok: false,
      employees: [],
      errors: ["A planilha precisa ter cabeçalho e ao menos uma linha de dados."],
      warnings: [],
      rowCount: 0,
      skippedEmptyRows: 0,
    };
  }

  const [headerRow, ...dataRows] = matrix;
  const { map: headerMap, missing } = buildHeaderMap(headerRow);
  if (missing.length > 0) {
    return {
      ok: false,
      employees: [],
      errors: missing,
      warnings: [],
      rowCount: dataRows.length,
      skippedEmptyRows: 0,
    };
  }

  const groups = new Map<
    string,
    {
      nome: string;
      cargo: string;
      admissao: string;
      itens: UniformItem[];
    }
  >();

  let skippedEmptyRows = 0;
  let rowIndex = 1;

  for (const cells of dataRows) {
    rowIndex += 1;
    if (rowIsEmpty(cells)) {
      skippedEmptyRows += 1;
      continue;
    }

    const fields = mapRowToFields(cells, headerMap);

    const nome = collapseSpaces(fields.nome);
    if (!nome) {
      skippedEmptyRows += 1;
      continue;
    }

    const equipamento = collapseSpaces(fields.equipamento);
    if (!equipamento) {
      warnings.push(
        `Linha ${rowIndex}: colaborador "${nome}" sem equipamento — linha ignorada.`,
      );
      continue;
    }

    const key = stableEmployeeKey(nome);
    const item: UniformItem = {
      data: collapseSpaces(fields.data) || "—",
      quantidade: parseQuantity(fields.quantidade),
      equipamento,
      tamanho: collapseSpaces(fields.tamanho) || "—",
      ca: collapseSpaces(fields.ca),
    };

    const cargo = collapseSpaces(fields.cargo);
    const admissao = collapseSpaces(fields.admissao);

    const existing = groups.get(key);
    if (!existing) {
      groups.set(key, {
        nome,
        cargo: cargo || "—",
        admissao,
        itens: [item],
      });
    } else {
      if (cargo && existing.cargo !== cargo) {
        warnings.push(
          `Linha ${rowIndex}: cargo diferente para "${nome}" — mantido o primeiro valor ("${existing.cargo}").`,
        );
      }
      if (admissao && existing.admissao && existing.admissao !== admissao) {
        warnings.push(
          `Linha ${rowIndex}: admissão diferente para "${nome}" — mantido o primeiro valor.`,
        );
      }
      if (!existing.admissao && admissao) {
        existing.admissao = admissao;
      }
      if (existing.cargo === "—" && cargo) {
        existing.cargo = cargo;
      }
      existing.itens.push(item);
    }
  }

  const employees: EmployeeDocument[] = [...groups.values()].map((g) => ({
    id: randomId(),
    nome: g.nome,
    cargo: g.cargo,
    admissao: g.admissao,
    itens: g.itens,
  }));

  const errors: string[] = [];
  if (employees.length === 0) {
    errors.push("Nenhum colaborador válido encontrado após a leitura da planilha.");
  }

  return {
    ok: errors.length === 0 && employees.length > 0,
    employees,
    errors,
    warnings,
    rowCount: dataRows.length,
    skippedEmptyRows,
  };
}
