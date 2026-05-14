import type { EmployeeDocument } from "../types/employee";

/** Dados fixos para demonstração (ids estáveis para listas React). */
export const MOCK_EMPLOYEES: EmployeeDocument[] = [
  {
    id: "mock-emp-1",
    nome: "Maria Souza",
    cargo: "Técnica de segurança",
    admissao: "10/01/2023",
    itens: [
      {
        data: "12/05/2026",
        quantidade: 1,
        equipamento: "Capacete classe B",
        tamanho: "M",
        ca: "38.XXX",
      },
      {
        data: "12/05/2026",
        quantidade: 2,
        equipamento: "Luva nitrílica",
        tamanho: "G",
        ca: "",
      },
    ],
  },
  {
    id: "mock-emp-2",
    nome: "João Silva",
    cargo: "Encanador",
    admissao: "03/08/2024",
    itens: [
      {
        data: "12/05/2026",
        quantidade: 1,
        equipamento: "Calça jeans azul",
        tamanho: "42",
        ca: "",
      },
    ],
  },
  {
    id: "mock-emp-3",
    nome: "Ana Costa",
    cargo: "Auxiliar administrativa",
    admissao: "",
    itens: [
      {
        data: "12/05/2026",
        quantidade: 1,
        equipamento: "Camisa social branca",
        tamanho: "P",
        ca: "",
      },
      {
        data: "12/05/2026",
        quantidade: 1,
        equipamento: "Óculos de proteção",
        tamanho: "—",
        ca: "12.345",
      },
    ],
  },
];

/** Total de linhas de “dados” equivalente ao que uma planilha teria (soma dos itens). */
export const MOCK_EXCEL_ROW_COUNT = MOCK_EMPLOYEES.reduce((n, e) => n + e.itens.length, 0);
