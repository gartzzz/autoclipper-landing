// Meta Pixel helper — client-side events con deduplicación CAPI.
//
// El pixel base se inyecta en app/layout.tsx. Desde ahí window.fbq está
// disponible. Este módulo expone funciones tipadas para disparar eventos
// estándar y generar event_ids que se propagan al checkout de GHL vía
// query param, de modo que el Purchase server-side que GHL dispara vía
// CAPI pueda deduplicar con el mismo event_id.

export const META_PIXEL_ID = "1276275577225616";

type FbqFn = (
  command: "track" | "trackCustom" | "init" | "consent",
  eventName: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string }
) => void;

declare global {
  interface Window {
    fbq?: FbqFn;
  }
}

function hasFbq(): boolean {
  return typeof window !== "undefined" && typeof window.fbq === "function";
}

function newEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback para navegadores antiguos.
  return `ev_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

// Guarda un event_id en sessionStorage por tipo de evento, de modo que si
// el usuario hace click en Comprar varias veces o refresca antes de pagar,
// el Purchase que GHL envíe por CAPI siga deduplicando con el último ID.
function persistEventId(eventName: string, id: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(`ac_evid_${eventName}`, id);
  } catch {
    // sessionStorage bloqueado (modo incógnito estricto). Seguimos sin
    // persistir — no es crítico.
  }
}

export function trackViewContent(params?: {
  contentName?: string;
  value?: number;
  currency?: string;
}) {
  const eventId = newEventId();
  persistEventId("ViewContent", eventId);

  if (!hasFbq()) return eventId;
  window.fbq!(
    "track",
    "ViewContent",
    {
      content_name: params?.contentName ?? "AutoClipper v0.1",
      content_type: "product",
      value: params?.value ?? 67,
      currency: params?.currency ?? "USD",
    },
    { eventID: eventId }
  );
  return eventId;
}

export function trackInitiateCheckout(params?: {
  value?: number;
  currency?: string;
}) {
  const eventId = newEventId();
  persistEventId("InitiateCheckout", eventId);

  if (hasFbq()) {
    window.fbq!(
      "track",
      "InitiateCheckout",
      {
        content_name: "AutoClipper v0.1",
        value: params?.value ?? 67,
        currency: params?.currency ?? "USD",
      },
      { eventID: eventId }
    );
  }
  return eventId;
}

// Añade el event_id como query param al link de checkout para que GHL lo
// reenvíe al disparar el Purchase server-side via CAPI. El param lo lee la
// automatización de GHL desde la URL del checkout (FastPayDirect preserva
// query params en los webhooks).
export function withEventId(checkoutUrl: string, eventId: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("event_id", eventId);
    return url.toString();
  } catch {
    // URL malformada — devolvemos el original sin romper el click.
    return checkoutUrl;
  }
}
