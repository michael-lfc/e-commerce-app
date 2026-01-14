// utils/formatPrice.js
export const formatPrice = (amount) => {
  if (!amount && amount !== 0) return "$0.00";

  return `$${Number(amount).toFixed(2)}`;
};
