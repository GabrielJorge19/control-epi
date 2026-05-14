const INVALID = /[\\/:*?"<>|]/g;

export function sanitizePdfFileName(nomeColaborador: string): string {
  const base = nomeColaborador.trim().replace(INVALID, "_").replace(/\s+/g, "_");
  return base.length > 0 ? base : "documento";
}

export function pdfFileNameForEmployee(nome: string): string {
  return `${sanitizePdfFileName(nome)}.pdf`;
}
