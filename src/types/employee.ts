export type UniformItem = {
  data: string;
  quantidade: number;
  equipamento: string;
  tamanho: string;
  ca: string;
};

export type EmployeeDocument = {
  id: string;
  nome: string;
  cargo: string;
  admissao: string;
  itens: UniformItem[];
};

/** Item em edição no formulário manual (quantidade livre como texto, convertida na normalização). */
export type DraftItem = {
  key: string;
  data: string;
  quantidade: string;
  equipamento: string;
  tamanho: string;
  ca: string;
};

/** Rascunho de colaborador no formulário manual, antes de virar `EmployeeDocument`. */
export type EmployeeDraft = {
  id: string;
  nome: string;
  cargo: string;
  admissao: string;
  itens: DraftItem[];
};

export type ExcelParseResult = {
  ok: boolean;
  employees: EmployeeDocument[];
  errors: string[];
  warnings: string[];
  rowCount: number;
  skippedEmptyRows: number;
};
