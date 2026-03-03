"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   Step definitions — each step owns its title, completed summary,
   and the content that renders when active.
   ───────────────────────────────────────────────────────────────────────────── */

interface WizardStep {
  title: string;
  summary: string;
}

const STEPS: WizardStep[] = [
  {
    title: "Consigue tu API key",
    summary: "sk-or-v1\u2022\u2022\u2022\u2022\u2022\u2022\u2022dk2m",
  },
  {
    title: "Instala el plugin",
    summary: "autoclipper-v1.0.zxp instalado",
  },
  {
    title: "Pega la transcripcion",
    summary: "3,842 palabras detectadas",
  },
  {
    title: "Ve los scores virales",
    summary: "3 clips encontrados",
  },
];

const ADVANCE_MS = 3000;
const FINAL_PAUSE_MS = 5000;

/* ─────────────────────────────────────────────────────────────────────────────
   HeroWizard
   ───────────────────────────────────────────────────────────────────────────── */

export default function HeroWizard() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPausedRef = useRef(false);

  /* ── Auto-advance logic ──────────────────────────────────────────────────── */
  const scheduleNext = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const delay = current === STEPS.length - 1 ? FINAL_PAUSE_MS : ADVANCE_MS;

    timerRef.current = setTimeout(() => {
      if (!isPausedRef.current) {
        setCurrent((prev) => (prev + 1) % STEPS.length);
      }
    }, delay);
  }, [current]);

  useEffect(() => {
    scheduleNext();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, scheduleNext]);

  /* ── Manual step click ───────────────────────────────────────────────────── */
  const goToStep = (index: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrent(index);
  };

  /* ── Step state resolver ─────────────────────────────────────────────────── */
  const stepState = (index: number): "completed" | "active" | "pending" => {
    if (index < current) return "completed";
    if (index === current) return "active";
    return "pending";
  };

  /* ── Rendered step content per index ─────────────────────────────────────── */
  const renderStepContent = (index: number) => {
    switch (index) {
      /* Step 1 — API Key */
      case 0:
        return (
          <>
            <input
              type="text"
              className="ac-wizard__input"
              placeholder="sk-or-..."
              readOnly
              tabIndex={-1}
              aria-label="API key"
            />
            <p className="ac-wizard__step-hint">
              Crea una cuenta en{" "}
              <a
                href="https://openrouter.ai"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--ac-cyan)", textDecoration: "underline" }}
              >
                OpenRouter
              </a>
              . Copia tu clave. 30 segundos.
            </p>
          </>
        );

      /* Step 2 — Install */
      case 1:
        return (
          <>
            <p className="ac-wizard__step-hint">
              Arrastra el archivo a Premiere Pro. Sin instaladores. Sin
              reinicios.
            </p>
            <button
              type="button"
              className="ac-button ac-button--sm ac-button--secondary"
              tabIndex={-1}
              aria-label="Instalar plugin"
            >
              Instalar plugin
            </button>
          </>
        );

      /* Step 3 — Transcription */
      case 2:
        return (
          <>
            <div
              className="ac-wizard__input"
              style={{
                minHeight: "72px",
                whiteSpace: "pre-wrap",
                lineHeight: "var(--ac-leading-relaxed)",
                fontSize: "var(--ac-text-xs)",
                color: "var(--ac-text-tertiary)",
                cursor: "default",
              }}
              aria-label="Transcripcion de ejemplo"
            >
              00:01:23 y en ese momento me di cuenta{"\n"}
              00:01:28 de que nadie te cuenta esto{"\n"}
              00:01:35 la verdad es que el algoritmo...{"\n"}
              00:01:42 cambie mi estrategia por completo
            </div>
            <p className="ac-wizard__step-hint">
              Copia el texto de tu video largo al panel. Un campo. Un click.
            </p>
          </>
        );

      /* Step 4 — Results */
      case 3:
        return (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--ac-space-2)",
              }}
            >
              {/* Mini clip cards — staggered entry */}
              <div className="ac-mockup__clip ac-wizard__clip-stagger" style={{ "--clip-i": 0 } as React.CSSProperties}>
                <div className="ac-mockup__score">92</div>
                <div className="ac-mockup__clip-info">
                  <span className="ac-mockup__clip-title">
                    &quot;El momento que lo cambio todo&quot;
                  </span>
                  <span className="ac-mockup__clip-time">
                    01:23 &mdash; 02:05
                  </span>
                </div>
              </div>
              <div className="ac-mockup__clip ac-mockup__clip--secondary ac-wizard__clip-stagger" style={{ "--clip-i": 1 } as React.CSSProperties}>
                <div className="ac-mockup__score">78</div>
                <div className="ac-mockup__clip-info">
                  <span className="ac-mockup__clip-title">
                    &quot;Nadie te cuenta esto&quot;
                  </span>
                  <span className="ac-mockup__clip-time">
                    05:42 &mdash; 06:18
                  </span>
                </div>
              </div>
              <div className="ac-mockup__clip ac-mockup__clip--tertiary ac-wizard__clip-stagger" style={{ "--clip-i": 2 } as React.CSSProperties}>
                <div className="ac-mockup__score">64</div>
                <div className="ac-mockup__clip-info">
                  <span className="ac-mockup__clip-title">
                    &quot;La verdad incomoda&quot;
                  </span>
                  <span className="ac-mockup__clip-time">
                    12:10 &mdash; 12:55
                  </span>
                </div>
              </div>
            </div>
            <p className="ac-wizard__step-hint">
              Cada momento puntuado del 0 al 100. Los mejores clips, marcados y
              listos.
            </p>
          </>
        );

      default:
        return null;
    }
  };

  /* ── Progress percentage for the auto-advance bar ────────────────────────── */
  const progressPct = ((current + 1) / STEPS.length) * 100;

  /* ── Render ──────────────────────────────────────────────────────────────── */
  return (
    <div className="ac-wizard" role="group" aria-label="Wizard de configuracion">
      {/* Header — macOS-style chrome */}
      <div className="ac-wizard__header">
        <span className="ac-wizard__header-title">Configura AutoClipper</span>
        <span
          className="ac-wizard__progress"
          style={{ marginLeft: "auto" }}
          aria-live="polite"
        >
          <span className="ac-wizard__progress-accent">{current + 1}</span>/
          {STEPS.length}
        </span>
      </div>

      {/* Steps */}
      <div className="ac-wizard__steps">
        {STEPS.map((step, index) => {
          const state = stepState(index);

          return (
            <div
              key={index}
              className={`ac-wizard__step ac-wizard__step--${state}`}
              onClick={() => goToStep(index)}
              role="button"
              tabIndex={0}
              aria-current={state === "active" ? "step" : undefined}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  goToStep(index);
                }
              }}
              style={{ cursor: "pointer" }}
            >
              {/* Step header: number + title (+ summary when completed) */}
              <div className="ac-wizard__step-header">
                <span className="ac-wizard__step-number" aria-hidden="true">
                  {state !== "completed" ? index + 1 : ""}
                </span>
                <span className="ac-wizard__step-title">
                  {step.title}
                  {state === "completed" && (
                    <span
                      className="ac-text--mono"
                      style={{
                        display: "block",
                        fontSize: "var(--ac-text-xs)",
                        color: "var(--ac-text-tertiary)",
                        fontWeight: "var(--ac-weight-regular)" as string,
                        textDecoration: "none",
                        marginTop: "2px",
                      }}
                    >
                      {step.summary}
                    </span>
                  )}
                </span>
              </div>

              {/* Expandable content — animated via CSS grid rows */}
              <div className="ac-wizard__step-expand">
                <div className="ac-wizard__step-content">
                  {renderStepContent(index)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer with progress */}
      <div className="ac-wizard__footer">
        <span className="ac-wizard__progress">
          Paso{" "}
          <span className="ac-wizard__progress-accent">{current + 1}</span> de{" "}
          {STEPS.length}
        </span>
        {current < STEPS.length - 1 && (
          <button
            type="button"
            className="ac-button ac-button--sm ac-button--secondary"
            onClick={(e) => {
              e.stopPropagation();
              goToStep(current + 1);
            }}
          >
            Siguiente
          </button>
        )}
        {current === STEPS.length - 1 && (
          <button
            type="button"
            className="ac-button ac-button--sm ac-button--secondary"
            onClick={(e) => {
              e.stopPropagation();
              goToStep(0);
            }}
          >
            Reiniciar
          </button>
        )}
      </div>

      {/* Progress bar — auto-advance indicator */}
      <div className="ac-wizard__progress-bar">
        <div
          className="ac-wizard__progress-fill"
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
}
