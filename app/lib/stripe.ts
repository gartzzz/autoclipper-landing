// Único punto donde vive el link de compra. En producción debe apuntar al
// checkout custom de GHL (que triggea la automatización de entrega por email).
// Setear NEXT_PUBLIC_STRIPE_LINK en Vercel con esa URL de GHL antes de deploy.
// El fallback es el link de test de Stripe para no romper el dev local.
export const STRIPE_PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_LINK ||
  "https://buy.stripe.com/test_eVqeVcev987M3JMcAwew800";
