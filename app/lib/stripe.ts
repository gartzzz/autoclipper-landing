// Único punto donde vive el link de compra. Apunta al checkout de GHL
// (FastPayDirect) que dispara la automatización de entrega por email.
// Para override puntual (testing, link alternativo) setear
// NEXT_PUBLIC_STRIPE_LINK en Vercel o .env.local.
export const STRIPE_PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_LINK ||
  "https://link.fastpaydirect.com/payment-link/69d785fdc6a0e600f4d089b7";
