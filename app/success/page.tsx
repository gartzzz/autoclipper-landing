"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ─── Download URLs ────────────────────────────────────────────────────────── */

const RELEASE_BASE = "https://github.com/gartzzz/autoclipper/releases/download/v1.0.0";

const DOWNLOADS = {
  mac: { url: `${RELEASE_BASE}/AutoClipper-Installer.pkg`, label: "Descargar para macOS", ext: ".pkg" },
  win: { url: `${RELEASE_BASE}/AutoClipper-Installer-Win.exe`, label: "Descargar para Windows", ext: ".exe" },
} as const;

/* ─── Spring / easing config ───────────────────────────────────────────────── */

const springConfig = { type: "spring" as const, stiffness: 380, damping: 22 };

/* ─── Steps per OS ─────────────────────────────────────────────────────────── */

const macSteps = [
  {
    number: "01",
    title: "Ejecuta el instalador",
    description:
      "Abre el archivo .pkg que acabas de descargar. Sigue el asistente: siguiente, siguiente, contrasena, instalar. Listo.",
    detail:
      "El instalador copia la extension, activa los permisos de Premiere y configura Ollama automaticamente. Si macOS muestra una alerta de seguridad, haz click derecho > Abrir.",
  },
  {
    number: "02",
    title: "Abre Premiere Pro",
    description:
      "Cierra Premiere completamente si estaba abierto (Cmd+Q). Abrelo de nuevo y ve a:",
    code: "Window > Extensions > AutoClipper",
    detail:
      "El panel aparecera como cualquier otro panel de Premiere. Puedes anclarlo donde quieras.",
  },
];

const winSteps = [
  {
    number: "01",
    title: "Ejecuta el instalador",
    description:
      "Abre el archivo .exe que acabas de descargar. Sigue el asistente: siguiente, siguiente, instalar. No necesita permisos de administrador.",
    detail:
      "El instalador copia la extension, configura el registro de Windows para Premiere y establece la conexion con Ollama automaticamente.",
  },
  {
    number: "02",
    title: "Abre Premiere Pro",
    description:
      "Cierra Premiere completamente si estaba abierto. Abrelo de nuevo y ve a:",
    code: "Window > Extensions > AutoClipper",
    detail:
      "El panel aparecera como cualquier otro panel de Premiere. Puedes anclarlo donde quieras.",
  },
];

/* ─── Motion variants ──────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...springConfig, delay },
  }),
};

const stepCardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...springConfig, delay: i * 0.15 },
  }),
};

/* ─── Code block with copy ─────────────────────────────────────────────────── */

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "relative",
        marginTop: "var(--ac-space-2)",
        marginBottom: "var(--ac-space-2)",
        background: "var(--ac-bg-void)",
        border: "1px solid var(--ac-border-default)",
        borderRadius: "var(--ac-radius-md)",
        padding: "var(--ac-space-3)",
        paddingRight: "var(--ac-space-10)",
        overflow: "auto",
      }}
    >
      <pre
        className="ac-text--mono"
        style={{
          fontSize: "var(--ac-text-xs)",
          color: "var(--ac-cyan-bright)",
          lineHeight: "var(--ac-leading-relaxed)",
          margin: 0,
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
        }}
      >
        {code}
      </pre>
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: "var(--ac-space-2)",
          right: "var(--ac-space-2)",
          background: copied ? "var(--ac-success-dim)" : "var(--ac-bg-elevated)",
          border: `1px solid ${copied ? "var(--ac-success)" : "var(--ac-border-subtle)"}`,
          borderRadius: "var(--ac-radius-sm)",
          padding: "4px 10px",
          cursor: "pointer",
          fontSize: "var(--ac-text-xs)",
          fontFamily: "var(--ac-font-mono)",
          color: copied ? "var(--ac-success)" : "var(--ac-text-secondary)",
          transition: "var(--ac-transition-all)",
        }}
      >
        {copied ? "Copiado" : "Copiar"}
      </button>
    </div>
  );
}

/* ─── Step card ────────────────────────────────────────────────────────────── */

interface StepData {
  number: string;
  title: string;
  description: string;
  code?: string;
  detail?: string;
}

function StepCard({
  step,
  index,
  isInView,
}: {
  step: StepData;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      custom={index}
      variants={stepCardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{
        y: -3,
        transition: { type: "spring", stiffness: 380, damping: 22 },
      }}
      style={{
        position: "relative",
        background: "var(--ac-bg-surface)",
        border: "1px solid var(--ac-border-subtle)",
        borderRadius: "var(--ac-radius-lg)",
        padding: "var(--ac-space-6)",
        transition: "var(--ac-transition-shadow)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--ac-space-3)",
          marginBottom: "var(--ac-space-3)",
        }}
      >
        <div
          className="ac-text--mono"
          style={{
            width: 36,
            height: 36,
            borderRadius: "var(--ac-radius-md)",
            background: "var(--ac-cyan-dim)",
            border: "1px solid var(--ac-cyan-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "var(--ac-text-sm)",
            fontWeight: "var(--ac-weight-semibold)",
            color: "var(--ac-cyan)",
            flexShrink: 0,
          }}
        >
          {step.number}
        </div>
        <h3
          style={{
            fontFamily: "var(--ac-font-sans)",
            fontSize: "var(--ac-text-md)",
            fontWeight: "var(--ac-weight-semibold)",
            color: "var(--ac-text-primary)",
            lineHeight: "var(--ac-leading-snug)",
            margin: 0,
          }}
        >
          {step.title}
        </h3>
      </div>

      <p
        className="ac-text"
        style={{
          color: "var(--ac-text-secondary)",
          fontSize: "var(--ac-text-sm)",
          lineHeight: "var(--ac-leading-normal)",
          margin: 0,
        }}
      >
        {step.description}
      </p>

      {step.code && <CodeBlock code={step.code} />}

      {step.detail && (
        <p
          className="ac-text"
          style={{
            color: "var(--ac-text-secondary)",
            fontSize: "var(--ac-text-sm)",
            lineHeight: "var(--ac-leading-normal)",
            margin: 0,
            marginTop: "var(--ac-space-1)",
          }}
        >
          {step.detail}
        </p>
      )}
    </motion.div>
  );
}

/* ─── OS Tab Button ────────────────────────────────────────────────────────── */

function OsTab({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        flex: 1,
        padding: "var(--ac-space-2) var(--ac-space-4)",
        borderRadius: "var(--ac-radius-md)",
        border: `1px solid ${active ? "var(--ac-cyan-muted)" : "var(--ac-border-subtle)"}`,
        background: active ? "var(--ac-cyan-dim)" : "var(--ac-bg-surface)",
        color: active ? "var(--ac-cyan-bright)" : "var(--ac-text-secondary)",
        cursor: "pointer",
        fontFamily: "var(--ac-font-sans)",
        fontSize: "var(--ac-text-xs)",
        fontWeight: "var(--ac-weight-semibold)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--ac-space-1)",
        transition: "var(--ac-transition-all)",
      }}
    >
      <span style={{ fontSize: "14px" }}>{icon}</span>
      {label}
    </motion.button>
  );
}

/* ─── Main page ────────────────────────────────────────────────────────────── */

export default function SuccessPage() {
  const [countdown, setCountdown] = useState(5);
  const [os, setOs] = useState<"mac" | "win">("mac");

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-40px" });

  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" });

  const download = DOWNLOADS[os];
  const steps = os === "mac" ? macSteps : winSteps;

  /* Auto-detect OS */
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes("win")) setOs("win");
    }
  }, []);

  /* Countdown + auto-download of the correct installer */
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = DOWNLOADS[os].url;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* ─── Nav ───────────────────────────────────────────────────────── */}
      <nav
        className="ac-nav ac-nav--scrolled"
        aria-label="Navegacion"
        style={{ position: "sticky" }}
      >
        <a href="/" className="ac-nav__logo">
          <img
            src="/logo.png"
            alt=""
            className="ac-nav__logo-mark"
            aria-hidden="true"
          />
          AutoClipper
        </a>
      </nav>

      <main id="main">
        {/* ─── Hero ────────────────────────────────────────────────────── */}
        <section
          className="ac-section"
          style={{
            paddingTop: "var(--ac-space-20)",
            paddingBottom: "var(--ac-space-12)",
          }}
        >
          <div className="ac-section__inner" ref={heroRef}>
            {/* Success icon */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "var(--ac-space-6)",
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "var(--ac-success-dim)",
                  border: "2px solid var(--ac-success)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  color: "var(--ac-success)",
                }}
              >
                &#10003;
              </div>
            </motion.div>

            <motion.div
              custom={0.08}
              variants={fadeUp}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              style={{ textAlign: "center" }}
            >
              <span className="ac-heading--eyebrow">Pago confirmado</span>
            </motion.div>

            <motion.h1
              custom={0.15}
              variants={fadeUp}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="ac-heading ac-heading--2"
              style={{ textAlign: "center" }}
            >
              AutoClipper es tuyo.
              <br />
              <span className="ac-highlight">Vamos a instalarlo.</span>
            </motion.h1>

            <motion.p
              custom={0.22}
              variants={fadeUp}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="ac-text ac-text--lead"
              style={{
                textAlign: "center",
                marginTop: "var(--ac-space-3)",
                maxWidth: "540px",
                marginInline: "auto",
              }}
            >
              Tu instalador se descarga en{" "}
              <strong
                className="ac-text--mono"
                style={{ color: "var(--ac-cyan)" }}
              >
                {countdown > 0 ? `${countdown}s` : "..."}
              </strong>
            </motion.p>

            {/* Download button */}
            <motion.div
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--ac-space-3)",
                marginTop: "var(--ac-space-5)",
              }}
            >
              <motion.a
                href={download.url}
                className="ac-button ac-button--primary ac-button--lg"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 28px 8px rgba(157,140,255,0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5em",
                }}
              >
                {download.label}
                <span style={{ fontSize: "1.1em" }} aria-hidden="true">
                  &darr;
                </span>
              </motion.a>

              {/* OS switcher (small, below button) */}
              <div
                style={{
                  display: "flex",
                  gap: "var(--ac-space-2)",
                  maxWidth: 260,
                }}
              >
                <OsTab
                  label="macOS"
                  icon="&#63743;"
                  active={os === "mac"}
                  onClick={() => setOs("mac")}
                />
                <OsTab
                  label="Windows"
                  icon="&#8862;"
                  active={os === "win"}
                  onClick={() => setOs("win")}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Installation guide ───────────────────────────────────────── */}
        <section
          className="ac-section ac-section--alt"
          style={{ paddingTop: "var(--ac-space-16)" }}
        >
          <div className="ac-section__inner">
            <div data-reveal style={{ textAlign: "center" }}>
              <span className="ac-heading--eyebrow">Instalacion</span>
            </div>
            <h2
              className="ac-heading ac-heading--2"
              data-reveal
              style={{ textAlign: "center" }}
            >
              2 pasos. 1 minuto.
              <br />
              Instala, abre Premiere, listo.
            </h2>

            {/* Steps */}
            <div
              ref={stepsRef}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--ac-space-4)",
                maxWidth: "860px",
                margin: "var(--ac-space-8) auto 0",
              }}
            >
              {steps.map((step, i) => (
                <StepCard
                  key={`${os}-${step.number}`}
                  step={step}
                  index={i}
                  isInView={stepsInView}
                />
              ))}
            </div>

            <style>{`
              @media (max-width: 768px) {
                div[style*="grid-template-columns: 1fr 1fr"] {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>

            {/* Troubleshooting */}
            <motion.div
              custom={0.5}
              variants={fadeUp}
              initial="hidden"
              animate={stepsInView ? "visible" : "hidden"}
              style={{
                maxWidth: "860px",
                margin: "var(--ac-space-8) auto 0",
                background: "var(--ac-warning-dim)",
                border: "1px solid rgba(245, 166, 35, 0.25)",
                borderRadius: "var(--ac-radius-lg)",
                padding: "var(--ac-space-4) var(--ac-space-5)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "var(--ac-text-sm)",
                  color: "var(--ac-text-secondary)",
                  lineHeight: "var(--ac-leading-normal)",
                }}
              >
                <strong style={{ color: "var(--ac-warning)" }}>
                  No aparece en Extensions?
                </strong>{" "}
                Asegurate de haber reiniciado Premiere completamente (Cmd+Q en
                Mac, no solo cerrar el proyecto).{" "}
                {os === "mac"
                  ? "Si macOS bloquea el instalador, haz click derecho > Abrir."
                  : "Si Windows muestra SmartScreen, haz click en 'Mas informacion' > 'Ejecutar de todas formas'."}
              </p>
            </motion.div>

            <p
              className="ac-text ac-text--small"
              style={{
                textAlign: "center",
                marginTop: "var(--ac-space-8)",
                opacity: 0.5,
              }}
            >
              Problemas? Escribe a soporte@autoclipper.com
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
