export default function Pricing() {
  return (
    <section className="ac-section ac-section--accent" id="precios">
      <div className="ac-section__inner">
        <div data-reveal>
          <span className="ac-heading--eyebrow">Planes</span>
        </div>
        <h2 className="ac-heading ac-heading--2" data-reveal>
          Empieza gratis.
          <br />
          Escala cuando lo necesites.
        </h2>
        <p
          className="ac-text ac-text--lead"
          data-reveal
          style={{ marginTop: "var(--ac-space-3)" }}
        >
          AutoClipper es gratis para siempre. Pro desbloquea clips ilimitados y
          soporte prioritario.
        </p>

        <div
          className="ac-feature-grid ac-feature-grid--2col"
          data-reveal-group="slow"
          style={{ marginTop: "var(--ac-space-10)" }}
        >
          {/* ── Free ──────────────────────────────────────────────── */}
          <div className="ac-card" data-reveal-child>
            <div className="ac-card__body--lg">
              <div className="ac-pricing-tier__header">
                <span className="ac-badge ac-badge--neutral">Gratis</span>
              </div>

              <div
                className="ac-pricing-tier__price"
                style={{ marginTop: "var(--ac-space-5)" }}
              >
                <span
                  className="ac-text--mono"
                  style={{
                    fontSize: "var(--ac-text-3xl)",
                    fontWeight: "var(--ac-weight-bold)",
                    color: "var(--ac-text-primary)",
                    letterSpacing: "var(--ac-tracking-tight)",
                  }}
                >
                  $0
                </span>
                <span className="ac-text ac-text--small">Para siempre</span>
              </div>

              <ul
                className="ac-pricing-features"
                style={{ marginTop: "var(--ac-space-6)" }}
              >
                <li data-included="true">3 clips por analisis</li>
                <li data-included="true">7 factores de viralidad</li>
                <li data-included="true">Marcado en timeline</li>
                <li data-included="true">Titulos automaticos</li>
                <li data-included="false">Clips ilimitados</li>
                <li data-included="false">Soporte prioritario</li>
              </ul>

              <div style={{ marginTop: "var(--ac-space-8)" }}>
                <a
                  href="https://github.com/gartzzz/autoclipper/releases/latest/download/AutoClipper.zip"
                  className="ac-button ac-button--secondary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Descargar gratis
                </a>
              </div>
            </div>
          </div>

          {/* ── Pro ───────────────────────────────────────────────── */}
          <div
            className="ac-card ac-card--glow-cyan"
            data-scanlines
            data-reveal-child
          >
            <div className="ac-card__body--lg">
              <div className="ac-pricing-tier__header">
                <span className="ac-badge ac-badge--cyan">Pro</span>
                <span className="ac-badge ac-badge--success">Mas popular</span>
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
                    $X
                  </span>
                  <span className="ac-text ac-text--small">/mes</span>
                </div>
                <p
                  className="ac-text ac-text--small"
                  style={{ marginTop: "var(--ac-space-2)" }}
                >
                  O{" "}
                  <strong
                    style={{
                      fontFamily: "var(--ac-font-mono)",
                      color: "var(--ac-text-primary)",
                    }}
                  >
                    $Y
                  </strong>{" "}
                  de por vida &mdash; un solo pago
                </p>
              </div>

              <ul
                className="ac-pricing-features"
                style={{ marginTop: "var(--ac-space-6)" }}
              >
                <li data-included="true">Todo lo de Gratis</li>
                <li data-included="true">Clips ilimitados</li>
                <li data-included="true">7 factores de viralidad</li>
                <li data-included="true">Marcado en timeline</li>
                <li data-included="true">Titulos automaticos</li>
                <li data-included="true">Soporte prioritario</li>
              </ul>

              <div style={{ marginTop: "var(--ac-space-8)" }}>
                <a
                  href="#"
                  className="ac-button ac-button--primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Empezar con Pro
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
          Sin tarjeta para el plan gratis &middot; Cancela cuando quieras
          &middot; Pago seguro con Stripe
        </p>
      </div>
    </section>
  );
}
