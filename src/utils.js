export const DOLAR_AARS = 1455;

export const formatARS = (value) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(value * DOLAR_AARS);
};