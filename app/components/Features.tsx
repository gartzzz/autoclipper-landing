"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

const viralFactors = [
  { name: "Hook", score: 95 },
  { name: "Emocion", score: 92 },
  { name: "Controversia", score: 45 },
  { name: "Insight", score: 78 },
  { name: "Storytelling", score: 88 },
  { name: "Cliffhanger", score: 85 },
  { name: "Humor", score: 32 },
];

// Easing curve that matches the design system's --ac-ease-out-expo feel
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/* ─── Score bar row: animated fill + count-up number ─────────────────────── */
function ScoreRow({
  factor,
  index,
  isVisible,
  prefersReducedMotion,
}: {
  factor: { name: string; score: number };
  index: number;
  isVisible: boolean;
  prefersReducedMotion: boolean | null;
}) {
  const motionWidth = useMotionValue(0);
  const widthPct = useTransform(motionWidth, (v) => `${v}%`);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    if (prefersReducedMotion) {
      // Jump straight to target — no animation
      setDisplayScore(factor.score);
      return;
    }

    const delay = 400 + index * 100;
    const duration = 1.1;

    const timeout = setTimeout(() => {
      // Animate the fill bar via framer-motion's animate utility
      animate(motionWidth, factor.score, {
        duration,
        ease: EASE_OUT_EXPO,
      });

      // Count-up the score number using the same exponential-out easing
      const start = Date.now();
      const tick = () => {
        const elapsed = (Date.now() - start) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setDisplayScore(Math.round(eased * factor.score));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, factor.score, index, motionWidth, prefersReducedMotion]);

  return (
    <div
      className="cluster cluster--3 ac-viral-factor-row"
      style={{ alignItems: "center", "--factor-i": index } as React.CSSProperties}
    >
      <span className="ac-text--mono" style={{ width: "100px", flexShrink: 0 }}>
        {factor.name}
      </span>
      <div className="ac-score-bar" style={{ flex: 1 }}>
        {/* Override the CSS-driven fill entirely with a motion div */}
        <motion.div
          className="ac-score-bar__fill"
          style={{
            // prefersReducedMotion: static width; otherwise driven by motion value
            width: prefersReducedMotion ? `${factor.score}%` : widthPct,
            // Disable the CSS transition so framer-motion owns the animation
            transition: "none",
          }}
        />
      </div>
      <span
        className="ac-text--mono"
        style={{ width: "32px", textAlign: "right" }}
      >
        {displayScore}
      </span>
    </div>
  );
}

/* ─── Tag wave: each tag pulses scale in sequence, looping ───────────────── */
function WaveTag({
  name,
  index,
  total,
  isVisible,
  prefersReducedMotion,
}: {
  name: string;
  index: number;
  total: number;
  isVisible: boolean;
  prefersReducedMotion: boolean | null;
}) {
  const [waveScale, setWaveScale] = useState(1);

  useEffect(() => {
    if (!isVisible || prefersReducedMotion) return;

    // Each tag cycles through a pulse wave with a fixed offset
    const PERIOD = 1400; // ms for one full wave cycle
    const PULSE_DURATION = 320; // ms of the scale-up pulse
    const TAG_OFFSET = (PERIOD / total) * index;

    let animFrame: number;
    const start = Date.now();

    const tick = () => {
      const elapsed = (Date.now() - start + TAG_OFFSET) % PERIOD;
      if (elapsed < PULSE_DURATION) {
        // Simple sine-based ease: 0 -> peak -> 0
        const t = elapsed / PULSE_DURATION;
        const pulse = Math.sin(t * Math.PI); // 0..1..0
        setWaveScale(1 + pulse * 0.1);
      } else {
        setWaveScale(1);
      }
      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [isVisible, index, total, prefersReducedMotion]);

  return (
    <motion.span
      className="ac-tag ac-tag--stagger"
      style={{
        "--tag-i": index,
        scale: waveScale,
        // Disable CSS stagger opacity so framer-motion controls reveal
        opacity: undefined,
        transform: undefined,
      } as React.CSSProperties}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
      animate={
        isVisible
          ? { opacity: 1, y: 0 }
          : undefined
      }
      transition={{
        duration: 0.35,
        delay: prefersReducedMotion ? 0 : 0.8 + index * 0.04,
        ease: EASE_OUT_EXPO,
      }}
    >
      {name.toLowerCase()}
    </motion.span>
  );
}

/* ─── Keyboard row: slide in from right on scroll ────────────────────────── */
function KeyboardRow({
  children,
  index,
  isVisible,
  prefersReducedMotion,
}: {
  children: React.ReactNode;
  index: number;
  isVisible: boolean;
  prefersReducedMotion: boolean | null;
}) {
  return (
    <motion.div
      className="ac-keyboard__row"
      // No ac-keyboard__row--stagger — we own the animation in framer-motion
      initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
      animate={
        isVisible
          ? { opacity: 1, x: 0 }
          : prefersReducedMotion
          ? false
          : { opacity: 0, x: 24 }
      }
      transition={{
        duration: 0.4,
        delay: prefersReducedMotion ? 0 : 0.2 + index * 0.15,
        ease: EASE_OUT_EXPO,
      }}
      style={{ "--kb-i": index } as React.CSSProperties}
    >
      {children}
    </motion.div>
  );
}

/* ─── Side-by-side feature card with hover lift + glow ───────────────────── */
function FeatureCard({
  glowClass,
  shadowVar,
  children,
  prefersReducedMotion,
}: {
  glowClass: string;
  shadowVar: string;
  children: React.ReactNode;
  prefersReducedMotion: boolean | null;
}) {
  return (
    <motion.div
      className={`ac-card ${glowClass}`}
      data-reveal-child
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -6,
              boxShadow: `var(${shadowVar}), 0 0 32px rgba(157,140,255,0.18)`,
            }
      }
      transition={
        prefersReducedMotion
          ? undefined
          : { type: "spring", stiffness: 380, damping: 22 }
      }
    >
      {children}
    </motion.div>
  );
}

/* ─── Main section ────────────────────────────────────────────────────────── */
export default function Features() {
  const prefersReducedMotion = useReducedMotion();

  // Ref + inView for the viral factors card
  const viralRef = useRef<HTMLDivElement>(null);
  const viralInView = useInView(viralRef, { once: true, margin: "-80px 0px" });

  // Ref + inView for the keyboard card
  const keyboardRef = useRef<HTMLDivElement>(null);
  const keyboardInView = useInView(keyboardRef, {
    once: true,
    margin: "-80px 0px",
  });

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

        {/* Feature 1: 7 Viral Factors — full width, animated score bars */}
        <div
          ref={viralRef}
          className="ac-card ac-card--glow-magenta"
          data-scanlines
          data-reveal
          style={{ marginTop: "var(--ac-space-10)" }}
        >
          <div className="ac-card__body--lg">
            <div
              className="ac-icon-slot ac-icon-slot--magenta"
              style={{ marginBottom: "var(--ac-space-4)" }}
            >
              <span className="ac-text--mono">7x</span>
            </div>
            <h3
              className="ac-heading ac-heading--3"
              style={{ marginBottom: "var(--ac-space-2)" }}
            >
              7 factores virales. Cero opinion.
            </h3>
            <p
              className="ac-text ac-text--body"
              style={{
                maxWidth: "52ch",
                marginBottom: "var(--ac-space-6)",
              }}
            >
              Cada momento de tu video puntuado del 0 al 100 en cada factor.
              No eliges clips porque &quot;suenan bien&quot;. Los eliges porque
              los datos te dicen que tienen carga viral.
            </p>

            <div className="stack stack--3 ac-viral-factors">
              {viralFactors.map((factor, i) => (
                <ScoreRow
                  key={factor.name}
                  factor={factor}
                  index={i}
                  isVisible={viralInView}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>

            <div className="ac-tag-row" style={{ marginTop: "var(--ac-space-4)" }}>
              {viralFactors.map((f, i) => (
                <WaveTag
                  key={f.name}
                  name={f.name}
                  index={i}
                  total={viralFactors.length}
                  isVisible={viralInView}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Features 2 & 3: side by side with hover lift */}
        <div
          className="ac-feature-grid ac-feature-grid--2col"
          style={{ marginTop: "var(--ac-space-4)" }}
          data-reveal-group="slow"
        >
          {/* Feature 2: Lives in Premiere */}
          <FeatureCard
            glowClass="ac-card--glow-cyan"
            shadowVar="--ac-shadow-cyan-md"
            prefersReducedMotion={prefersReducedMotion}
          >
            <div className="ac-card__body--lg">
              <div
                className="ac-icon-slot ac-icon-slot--cyan"
                style={{ marginBottom: "var(--ac-space-4)" }}
              >
                <span className="ac-text--mono">Pr</span>
              </div>
              <h3
                className="ac-heading ac-heading--4"
                style={{ marginBottom: "var(--ac-space-2)" }}
              >
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
                <div
                  style={{
                    background: "var(--ac-bg-elevated)",
                    padding: "var(--ac-space-3)",
                    borderRadius:
                      "0 0 var(--ac-radius-md) var(--ac-radius-md)",
                    border:
                      "var(--ac-border-width-thin) solid var(--ac-border-faint)",
                    borderTop: "none",
                  }}
                >
                  <div className="ac-mockup__clip" style={{ opacity: 0.8 }}>
                    <div className="ac-mockup__score">92</div>
                    <div className="ac-mockup__clip-info">
                      <span className="ac-mockup__clip-title">
                        &quot;El momento clave&quot;
                      </span>
                      <span className="ac-mockup__clip-time">
                        01:23 — 02:05
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FeatureCard>

          {/* Feature 3: Keyboard-first */}
          <FeatureCard
            glowClass="ac-card--glow-cyan"
            shadowVar="--ac-shadow-cyan-md"
            prefersReducedMotion={prefersReducedMotion}
          >
            <div ref={keyboardRef} className="ac-card__body--lg">
              <div
                className="ac-icon-slot ac-icon-slot--cyan"
                style={{ marginBottom: "var(--ac-space-4)" }}
              >
                <span className="ac-text--mono">kb</span>
              </div>
              <h3
                className="ac-heading ac-heading--4"
                style={{ marginBottom: "var(--ac-space-2)" }}
              >
                Keyboard-first. Editas al ritmo que piensas.
              </h3>
              <p
                className="ac-text ac-text--body"
                style={{ marginBottom: "var(--ac-space-4)" }}
              >
                Saltas entre momentos virales sin soltar el teclado. En 5
                minutos revisas 30 momentos y apruebas 12 clips.
              </p>

              {/* Keyboard shortcuts — framer-motion slide from right */}
              <div className="ac-keyboard">
                <KeyboardRow
                  index={0}
                  isVisible={keyboardInView}
                  prefersReducedMotion={prefersReducedMotion}
                >
                  <kbd className="ac-keyboard__key">&rarr;</kbd>
                  <span className="ac-keyboard__label">Aprobar clip</span>
                </KeyboardRow>

                <KeyboardRow
                  index={1}
                  isVisible={keyboardInView}
                  prefersReducedMotion={prefersReducedMotion}
                >
                  <kbd className="ac-keyboard__key">&larr;</kbd>
                  <span className="ac-keyboard__label">Descartar</span>
                </KeyboardRow>

                <KeyboardRow
                  index={2}
                  isVisible={keyboardInView}
                  prefersReducedMotion={prefersReducedMotion}
                >
                  <kbd className="ac-keyboard__key ac-keyboard__key--wide">
                    Space
                  </kbd>
                  <span className="ac-keyboard__label">
                    Reproducir momento
                  </span>
                </KeyboardRow>

                <KeyboardRow
                  index={3}
                  isVisible={keyboardInView}
                  prefersReducedMotion={prefersReducedMotion}
                >
                  <kbd className="ac-keyboard__key">E</kbd>
                  <span className="ac-keyboard__label">Exportar seleccion</span>
                </KeyboardRow>
              </div>
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
