import HeroWizard from "./HeroWizard";
import HeroShader from "./HeroShader";
import Countdown from "./Countdown";
import { PRICE_EARLY_BIRD, PRICE_TIER_0 } from "../lib/config";

export default function Hero() {
  return (
    <section className="ac-section ac-section--hero">
      <HeroShader />
      <div className="ac-hero">
        {/* ── Left column: Copy + CTAs ────────────────────────────────────── */}
        <div className="ac-hero__content">
          <span className="ac-badge ac-badge--cyan ac-hero-animate--badge">
            Plugin para Adobe Premiere Pro
          </span>

          <h1 className="ac-heading ac-heading--display ac-hero-animate--title">
            Tu video tiene momentos virales. AutoClipper los encuentra y los
            prepara para que solo tengas que exportar.
          </h1>

          <p className="ac-hero__sub ac-hero-animate--subtitle">
            Pega tu transcripcion. La IA detecta los momentos con mayor carga
            viral, los puntua en 7 factores y genera una secuencia
            independiente en Premiere por cada clip aprobado. Revision
            keyboard-first: 10-15 clips listos en 5 minutos, sin tocar el
            raton.
          </p>

          <div className="ac-hero__actions ac-hero-animate--cta">
            <a
              href="#precios"
              className="ac-button ac-button--primary ac-button--lg"
            >
              Comprar por $49
              <span className="ac-button__arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>
            <a href="#como-funciona" className="ac-button ac-button--ghost">
              Ver como funciona
            </a>
          </div>

          <p className="ac-text ac-text--small ac-hero__note ac-hero-animate--cta">
            Un solo pago. Actualizaciones para siempre. Setup en 2 minutos.
          </p>

          <p
            className="ac-text ac-text--small ac-hero__note ac-hero-animate--cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--ac-space-2)",
              marginTop: "var(--ac-space-2)",
              color: "var(--ac-text-secondary)",
            }}
          >
            <span
              aria-hidden="true"
              className="ac-pulse-glow"
              style={{
                display: "inline-block",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "var(--ac-cyan)",
                boxShadow: "0 0 10px var(--ac-cyan)",
                flexShrink: 0,
              }}
            />
            Fase 1 de 3 &middot; Early Bird ${PRICE_EARLY_BIRD} &middot; v1.0 en{" "}
            <Countdown variant="compact" />
            &nbsp;(luego ${PRICE_TIER_0})
          </p>
        </div>

        {/* ── Right column: Interactive wizard ────────────────────────────── */}
        <div className="ac-hero__visual ac-hero-animate--visual">
          {/* Ambient breathing glow behind the wizard */}
          <div className="ac-hero-glow" aria-hidden="true" />
          <HeroWizard />
        </div>
      </div>
    </section>
  );
}
