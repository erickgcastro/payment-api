export function formatAmount(amount: string): string | null {
  const valor = parseInt(amount, 10);
  if (isNaN(valor)) return null;
  const reais = valor / 100;
  return reais.toFixed(2);
}
