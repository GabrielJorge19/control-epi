/**
 * Máscara de data para o formulário manual: só deixa passar dígitos e monta
 * as barras de `dd/mm/aaaa`. Não valida faixa (o campo `data` do modelo é texto
 * livre, igual ao aceito pela planilha) — a máscara só padroniza o formato.
 */
export function maskDate(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}
