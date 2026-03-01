const viralFactors = [
  { name: "Hook", score: 95 },
  { name: "Emocion", score: 92 },
  { name: "Controversia", score: 45 },
  { name: "Insight", score: 78 },
  { name: "Storytelling", score: 88 },
  { name: "Cliffhanger", score: 85 },
  { name: "Humor", score: 32 },
];

export default function Features() {
  return (
    <section className="ac-section ac-section--accent" id="features">
      <div className="ac-section__inner">
        <div data-reveal>
          <span className="ac-heading--eyebrow">Por que funciona</span>
        </div>
        <h2 className="ac-heading ac-heading--2" data-reveal>
          No es magia. Es un sistema que entiende
          <br />
          que hace viral un clip.
        </h2>

        {/* Feature 1: 7 Viral Factors — full width, score bars */}
        <div
          className="ac-card ac-card--glow-magenta"
          data-scanlines
          data-reveal
          style={{ marginTop: "var(--ac-space-10)" }}
        >
          <div className="ac-card__body--lg">
            <div className="ac-icon-slot ac-icon-slot--magenta" style={{ marginBottom: "var(--ac-space-4)" }}>
              <span className="ac-text--mono">7x</span>
            </div>
            <h3 className="ac-heading ac-heading--3" style={{ marginBottom: "var(--ac-space-2)" }}>
              7 factores virales. Cero opinion.
            </h3>
            <p className="ac-text ac-text--body" style={{ maxWidth: "52ch", marginBottom: "var(--ac-space-6)" }}>
              Cada momento de tu video puntuado del 0 al 100 en cada factor.
              No eliges clips porque &quot;suenan bien&quot;. Los eliges porque los
              datos te dicen que tienen carga viral.
            </p>
            <div className="stack stack--3 ac-viral-factors" data-reveal-group>
              {viralFactors.map((factor, i) => (
                <div key={factor.name} className="cluster cluster--3 ac-viral-factor-row" data-reveal-child style={{ alignItems: "center", "--factor-i": i } as React.CSSProperties}>
                  <span className="ac-text--mono" style={{ width: "100px", flexShrink: 0 }}>
                    {factor.name}
                  </span>
                  <div className="ac-score-bar" style={{ flex: 1 }}>
                    <div
                      className="ac-score-bar__fill"
                      data-score={factor.score}
                      style={{ "--score-width": `${factor.score}%` } as React.CSSProperties}
                    />
                  </div>
                  <span className="ac-text--mono" style={{ width: "32px", textAlign: "right" }}>
                    {factor.score}
                  </span>
                </div>
              ))}
            </div>
            <div className="ac-tag-row" style={{ marginTop: "var(--ac-space-4)" }}>
              {viralFactors.map((f, i) => (
                <span key={f.name} className="ac-tag ac-tag--stagger" style={{ "--tag-i": i } as React.CSSProperties}>{f.name.toLowerCase()}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Features 2 & 3: side by side */}
        <div
          className="ac-feature-grid ac-feature-grid--2col"
          style={{ marginTop: "var(--ac-space-4)" }}
          data-reveal-group="slow"
        >
          {/* Feature 2: Lives in Premiere */}
          <div className="ac-card ac-card--glow-cyan" data-reveal-child>
            <div className="ac-card__body--lg">
              <div className="ac-icon-slot ac-icon-slot--cyan" style={{ marginBottom: "var(--ac-space-4)" }}>
                <span className="ac-text--mono">Pr</span>
              </div>
              <h3 className="ac-heading ac-heading--4" style={{ marginBottom: "var(--ac-space-2)" }}>
                Vive dentro de Premiere. No es otra app.
              </h3>
              <p className="ac-text ac-text--body">
                No es otra pestana. No es otro login. No es un SaaS que te
                obliga a subir tu video a la nube. Es un panel dentro de tu
                Premiere de siempre. Analizas, seleccionas, marcas clips,
                agregas titulos y exportas. Todo sin cambiar de ventana.
              </p>
              {/* Mini mockup of Premiere panel */}
              <div style={{ marginTop: "var(--ac-space-4)" }}>
                <div className="ac-mockup__header">
                  <span className="ac-mockup__dot" />
                  <span className="ac-mockup__dot" />
                  <span className="ac-mockup__dot" />
                  <span className="ac-mockup__title">AutoClipper Panel</span>
                </div>
                <div style={{
                  background: "var(--ac-bg-elevated)",
                  padding: "var(--ac-space-3)",
                  borderRadius: "0 0 var(--ac-radius-md) var(--ac-radius-md)",
                  border: "var(--ac-border-width-thin) solid var(--ac-border-faint)",
                  borderTop: "none",
                }}>
                  <div className="ac-mockup__clip" style={{ opacity: 0.8 }}>
                    <div className="ac-mockup__score">92</div>
                    <div className="ac-mockup__clip-info">
                      <span className="ac-mockup__clip-title">&quot;El momento clave&quot;</span>
                      <span className="ac-mockup__clip-time">01:23 — 02:05</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Keyboard-first */}
          <div className="ac-card ac-card--glow-cyan" data-reveal-child>
            <div className="ac-card__body--lg">
              <div className="ac-icon-slot ac-icon-slot--cyan" style={{ marginBottom: "var(--ac-space-4)" }}>
                <span className="ac-text--mono">kb</span>
              </div>
              <h3 className="ac-heading ac-heading--4" style={{ marginBottom: "var(--ac-space-2)" }}>
                Keyboard-first. Editas al ritmo que piensas.
              </h3>
              <p className="ac-text ac-text--body" style={{ marginBottom: "var(--ac-space-4)" }}>
                Saltas entre momentos virales sin soltar el teclado. En 5
                minutos revisas 30 momentos y apruebas 12 clips.
              </p>
              {/* Keyboard shortcuts visual */}
              <div className="ac-keyboard">
                <div className="ac-keyboard__row ac-keyboard__row--stagger" style={{ "--kb-i": 0 } as React.CSSProperties}>
                  <kbd className="ac-keyboard__key">&rarr;</kbd>
                  <span className="ac-keyboard__label">Aprobar clip</span>
                </div>
                <div className="ac-keyboard__row ac-keyboard__row--stagger" style={{ "--kb-i": 1 } as React.CSSProperties}>
                  <kbd className="ac-keyboard__key">&larr;</kbd>
                  <span className="ac-keyboard__label">Descartar</span>
                </div>
                <div className="ac-keyboard__row ac-keyboard__row--stagger" style={{ "--kb-i": 2 } as React.CSSProperties}>
                  <kbd className="ac-keyboard__key ac-keyboard__key--wide">Space</kbd>
                  <span className="ac-keyboard__label">Reproducir momento</span>
                </div>
                <div className="ac-keyboard__row ac-keyboard__row--stagger" style={{ "--kb-i": 3 } as React.CSSProperties}>
                  <kbd className="ac-keyboard__key">E</kbd>
                  <span className="ac-keyboard__label">Exportar seleccion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
