export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};
