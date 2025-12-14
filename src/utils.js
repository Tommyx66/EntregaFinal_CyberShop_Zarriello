export const DOLAR_AARS = 1455;

/**
 * @param {number} value - Precio en USD.
 * @returns {string} - Precio formateado en ARS.
 */
export const formatARS = (value) => {
  let arsValue = value * DOLAR_AARS;

  let roundedToThousand = Math.ceil(arsValue / 1000) * 1000;

  let finalMarketingPrice = roundedToThousand - 1.0;

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(finalMarketingPrice);
};
