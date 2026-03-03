export function formatCurrency(pricePaisa) {
  return (Math.round(pricePaisa) / 100).toFixed(2);
}

export default formatCurrency;
