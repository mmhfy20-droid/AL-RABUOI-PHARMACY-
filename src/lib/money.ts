export function formatMinorCurrency(amount: number, currency: string): string {
  const safeCurrency = ["YER", "SAR", "USD"].includes(currency) ? currency : "YER";
  const formatted = new Intl.NumberFormat("ar", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount / 100);
  return `${formatted} ${safeCurrency}`;
}
