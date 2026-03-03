export default function Pricing() {
  const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_eVqeVcev987M3JMcAwew800";

  return (
    <section className="ac-section ac-section--accent" id="precios">
      <div className="ac-section__inner">
        <div data-reveal>
          <span className="ac-heading--eyebrow">Precio</span>
        </div>
        <h2 className="ac-heading ac-heading--2" data-reveal>
          Un pago. Tuyo para siempre.
        </h2>
        <p
          className="ac-text ac-text--lead"
          data-reveal
          style={{ marginTop: "var(--ac-space-3)" }}
        >
          Sin suscripciones, sin limites, sin cuentas. Compra, descarga,
          instala.
        </p>

        <div
          style={{
            maxWidth: "480px",
            margin: "var(--ac-space-10) auto 0",
          }}
          data-reveal
        >
          <div
            className="ac-card ac-card--glow-cyan"
            data-scanlines
          >
            <div className="ac-card__body--lg">
              <div className="ac-pricing-tier__header">
                <span className="ac-badge ac-badge--cyan">Early Bird</span>
              </div>

              <div
                className="ac-pricing-tier__price"
                style={{ marginTop: "var(--ac-space-5)" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "var(--ac-space-2)",
                  }}
                >
                  <span
                    className="ac-text--mono"
                    style={{
                      fontSize: "var(--ac-text-3xl)",
                      fontWeight: "var(--ac-weight-bold)",
                      color: "var(--ac-cyan)",
                      letterSpacing: "var(--ac-tracking-tight)",
                      lineHeight: 1,
                    }}
                  >
                    $49
                  </span>
                  <span className="ac-text ac-text--small">un solo pago</span>
                </div>
                <p
                  className="ac-text ac-text--small"
                  style={{ marginTop: "var(--ac-space-2)" }}
                >
                  Precio de lanzamiento &mdash; sube con cada update
                </p>
              </div>

              <ul
                className="ac-pricing-features"
                style={{ marginTop: "var(--ac-space-6)" }}
              >
                <li data-included="true">Clips ilimitados</li>
                <li data-included="true">7 factores de viralidad</li>
                <li data-included="true">OpenRouter + Ollama (offline)</li>
                <li data-included="true">Marcado en timeline + subtitulos</li>
                <li data-included="true">Updates gratis</li>
                <li data-included="true">Soporte directo</li>
              </ul>

              <div style={{ marginTop: "var(--ac-space-8)" }}>
                <a
                  href={STRIPE_PAYMENT_LINK}
                  className="ac-button ac-button--primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Comprar AutoClipper
                  <span className="ac-button__arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <p
          className="ac-cta-block__subtext"
          data-reveal
          style={{ textAlign: "center", marginTop: "var(--ac-space-6)" }}
        >
          Pago seguro con Stripe &middot; Descarga inmediata &middot; Sin
          suscripcion
        </p>
      </div>
    </section>
  );
}
