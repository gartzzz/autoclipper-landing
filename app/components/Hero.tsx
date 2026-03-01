import HeroWizard from "./HeroWizard";

export default function Hero() {
  return (
    <section className="ac-section ac-section--hero">
      <div className="ac-hero">
        {/* ── Left column: Copy + CTAs ────────────────────────────────────── */}
        <div className="ac-hero__content">
          <span className="ac-badge ac-badge--cyan ac-hero-animate--badge">
            Plugin para Adobe Premiere Pro
          </span>

          <h1 className="ac-heading ac-heading--display ac-hero-animate--title">
            Tu video tiene momentos virales. AutoClipper los encuentra, los
            corta y los exporta.
          </h1>

          <p className="ac-hero__sub ac-hero-animate--subtitle">
            Pega tu transcripcion. La IA detecta los momentos con mayor carga
            viral, los puntua en 7 factores, marca los clips en tu timeline,
            les pone titulos y subtitulos, y los deja listos para TikTok, Reels
            y Shorts. Todo dentro de Premiere Pro.
          </p>

          <div className="ac-hero__actions ac-hero-animate--cta">
            <a
              href="https://github.com/gartzzz/autoclipper"
              className="ac-button ac-button--primary ac-button--lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargalo gratis
              <span className="ac-button__arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>
            <a href="#como-funciona" className="ac-button ac-button--ghost">
              Ver como funciona
            </a>
          </div>

          <p className="ac-text ac-text--small ac-hero__note ac-hero-animate--cta">
            Sin tarjeta. $0 para empezar. Setup en 2 minutos.
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
