// Fuente única de verdad para el ladder de precios y el deadline de v1.0.
// Cualquier cambio de precio o fecha se propaga a toda la landing (Hero,
// UrgencyBar, Pricing, StatBar, Countdown) desde aquí.

export const V1_RELEASE_DATE = new Date("2026-05-15T00:00:00Z");

export const EARLY_BIRD_LIMIT = 100;
export const PRICE_EARLY_BIRD = 49;
export const PRICE_TIER_0 = 67;
export const PRICE_POST_V1 = 97;

// Formato legible para mostrar la fecha junto al countdown ("v1.0 el 15 mayo").
export const V1_RELEASE_LABEL = "15 mayo";
