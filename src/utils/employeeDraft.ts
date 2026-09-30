import type { DraftItem, EmployeeDocument, EmployeeDraft } from "../types/employee";
import { randomId } from "./id";
import { collapseSpaces } from "./string";

/**
 * Conversão rascunho -> documento.
 * As regras abaixo repetem as de `excel.service.ts` (defaults "—", descarte de item sem
 * equipamento, quantidade mínima 1) para que o PDF gerado pelo formulário manual
 * fique idêntico ao gerado a partir da planilha.
 */

export function createEmptyItem(): DraftItem {
  return {
    key: randomId(),
    data: "",
    quantidade: "1",
    equipamento: "",
    tamanho: "",
    ca: "",
  };
}

export function createEmptyDraft(): EmployeeDraft {
  return {
    id: randomId(),
    nome: "",
    cargo: "",
    admissao: "",
    itens: [createEmptyItem()],
  };
}

export function normalizeQuantity(raw: string): number {
  const parsed = Number.parseFloat(raw.replaceAll(".", "").replace(",", "."));
  if (!Number.isFinite(parsed)) return 1;
  return Math.max(1, Math.trunc(parsed));
}

export function draftToEmployeeDocument(draft: EmployeeDraft): EmployeeDocument {
  return {
    id: draft.id,
    nome: collapseSpaces(draft.nome),
    cargo: collapseSpaces(draft.cargo) || "—",
    admissao: collapseSpaces(draft.admissao),
    itens: draft.itens
      .map((item): EmployeeDocument["itens"][number] | null => {
        const equipamento = collapseSpaces(item.equipamento);
        if (!equipamento) return null;
        return {
          data: collapseSpaces(item.data) || "—",
          quantidade: normalizeQuantity(item.quantidade),
          equipamento,
          tamanho: collapseSpaces(item.tamanho) || "—",
          ca: collapseSpaces(item.ca),
        };
      })
      .filter((item): item is EmployeeDocument["itens"][number] => item !== null),
  };
}

/** Sem nome ou sem nenhum item com equipamento não há o que gerar. */
export function isDraftExportable(draft: EmployeeDraft): boolean {
  if (!collapseSpaces(draft.nome)) return false;
  return draft.itens.some((item) => collapseSpaces(item.equipamento).length > 0);
}

/** Há algo digitado? Usado para a guarda de recarga e para habilitar "Limpar". */
export function isDraftDirty(draft: EmployeeDraft): boolean {
  if (collapseSpaces(draft.nome) || collapseSpaces(draft.cargo) || collapseSpaces(draft.admissao)) {
    return true;
  }
  return draft.itens.some(
    (item) =>
      collapseSpaces(item.data) ||
      collapseSpaces(item.equipamento) ||
      collapseSpaces(item.tamanho) ||
      collapseSpaces(item.ca) ||
      item.quantidade !== "1",
  );
}
