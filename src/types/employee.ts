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

export type ExcelParseResult = {
  ok: boolean;
  employees: EmployeeDocument[];
  errors: string[];
  warnings: string[];
  rowCount: number;
  skippedEmptyRows: number;
};
