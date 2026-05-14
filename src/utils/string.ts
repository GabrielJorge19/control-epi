export function collapseSpaces(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function stableEmployeeKey(nome: string): string {
  return collapseSpaces(nome).toLowerCase();
}
