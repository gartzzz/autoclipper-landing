"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ─── Constants ────────────────────────────────────────────────────────────── */

const DOWNLOAD_URL = "/AutoClipper.zip";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const springConfig = { type: "spring" as const, stiffness: 380, damping: 22 };

/* ─── Mac steps ────────────────────────────────────────────────────────────── */
const macSteps = [
  {
    number: "01",
    title: "Descomprime el archivo",
    description:
      "Haz doble click en AutoClipper.zip. Se creara una carpeta AutoClipper con todo lo necesario.",
  },
  {
    number: "02",
    title: "Copia la carpeta de la extension",
    description: "Abre Finder y navega a esta ruta (puedes pegarla con Cmd+Shift+G):",
    code: "~/Library/Application Support/Adobe/CEP/extensions/",
    detail:
      "Si la carpeta 'extensions' no existe, creala. Luego arrastra la carpeta 'extension' (que esta dentro de AutoClipper) ahi dentro y renombrala a:",
    codeAlt: "com.gartzzz.autoclipper",
  },
  {
    number: "03",
    title: "Activa las extensiones sin firmar",
    description: "Abre Terminal (esta en Aplicaciones > Utilidades) y pega estos comandos:",
    code: "defaults write com.adobe.CSXS.9 PlayerDebugMode 1\ndefaults write com.adobe.CSXS.10 PlayerDebugMode 1\ndefaults write com.adobe.CSXS.11 PlayerDebugMode 1\ndefaults write com.adobe.CSXS.12 PlayerDebugMode 1\ndefaults write com.adobe.CSXS.13 PlayerDebugMode 1\nlaunchctl setenv OLLAMA_ORIGINS \"*\"",
    detail: "Los primeros 5 comandos permiten que Premiere cargue extensiones de terceros. El ultimo permite que Ollama (IA local) se conecte con el panel. Solo hay que hacerlo una vez.",
  },
  {
    number: "04",
    title: "Abre Premiere Pro",
    description:
      "Cierra Premiere completamente si estaba abierto (Cmd+Q). Abrelo de nuevo y ve a:",
    code: "Window > Extensions > AutoClipper",
    detail: "El panel aparecera como cualquier otro panel de Premiere. Puedes anclarlo donde quieras.",
  },
];

/* ─── Windows steps ────────────────────────────────────────────────────────── */
const winSteps = [
  {
    number: "01",
    title: "Descomprime el archivo",
    description:
      "Click derecho en AutoClipper.zip > Extraer todo. Se creara una carpeta AutoClipper.",
  },
  {
    number: "02",
    title: "Copia la carpeta de la extension",
    description:
      "Abre el Explorador de archivos y navega a esta ruta (pegala en la barra de direcciones):",
    code: "%APPDATA%\\Adobe\\CEP\\extensions\\",
    detail:
      "Si la carpeta 'extensions' no existe, creala. Luego copia la carpeta 'extension' (que esta dentro de AutoClipper) ahi dentro y renombrala a:",
    codeAlt: "com.gartzzz.autoclipper",
  },
  {
    number: "03",
    title: "Activa las extensiones sin firmar",
    description:
      "Abre el Editor del Registro: pulsa Win+R, escribe regedit y pulsa Enter. Navega a:",
    code: "HKEY_CURRENT_USER\\SOFTWARE\\Adobe\\CSXS.11",
    detail:
      'Click derecho en el panel derecho > Nuevo > Valor de cadena. Nombre: PlayerDebugMode, Valor: 1. Repite para CSXS.12 y CSXS.13 si existen.',
  },
  {
    number: "04",
    title: "Abre Premiere Pro",
    description:
      "Cierra Premiere completamente si estaba abierto. Abrelo de nuevo y ve a:",
    code: "Window > Extensions > AutoClipper",
    detail: "El panel aparecera como cualquier otro panel de Premiere. Puedes anclarlo donde quieras.",
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
  codeAlt?: string;
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
      {/* Number badge */}
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

      {step.codeAlt && <CodeBlock code={step.codeAlt} />}
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
        padding: "var(--ac-space-3) var(--ac-space-4)",
        borderRadius: "var(--ac-radius-md)",
        border: `1px solid ${active ? "var(--ac-cyan-muted)" : "var(--ac-border-subtle)"}`,
        background: active ? "var(--ac-cyan-dim)" : "var(--ac-bg-surface)",
        color: active ? "var(--ac-cyan-bright)" : "var(--ac-text-secondary)",
        cursor: "pointer",
        fontFamily: "var(--ac-font-sans)",
        fontSize: "var(--ac-text-sm)",
        fontWeight: "var(--ac-weight-semibold)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--ac-space-2)",
        transition: "var(--ac-transition-all)",
      }}
    >
      <span style={{ fontSize: "18px" }}>{icon}</span>
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

  /* Auto-detect OS */
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes("win")) setOs("win");
    }
  }, []);

  /* Countdown + auto-download */
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = DOWNLOAD_URL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const steps = os === "mac" ? macSteps : winSteps;

  return (
    <>
      {/* ─── Nav (simplified) ──────────────────────────────────────────── */}
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
        {/* ─── Hero: Payment confirmed ──────────────────────────────── */}
        <section
          className="ac-section"
          style={{
            paddingTop: "var(--ac-space-20)",
            paddingBottom: "var(--ac-space-12)",
          }}
        >
          <div className="ac-section__inner" ref={heroRef}>
            {/* Success badge */}
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
              La descarga empieza en{" "}
              <strong
                className="ac-text--mono"
                style={{ color: "var(--ac-cyan)" }}
              >
                {countdown > 0 ? `${countdown}s` : "..."}
              </strong>
              {" "}. Si no arranca automaticamente:
            </motion.p>

            <motion.div
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "var(--ac-space-5)",
              }}
            >
              <motion.a
                href={DOWNLOAD_URL}
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
                Descargar AutoClipper.zip
                <span style={{ fontSize: "1.1em" }} aria-hidden="true">
                  &darr;
                </span>
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* ─── Installation guide ───────────────────────────────────── */}
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
              4 pasos. 2 minutos.
              <br />
              Sin instaladores, sin terminal.
            </h2>

            {/* OS tabs */}
            <div
              style={{
                display: "flex",
                gap: "var(--ac-space-2)",
                maxWidth: 320,
                margin: "var(--ac-space-8) auto var(--ac-space-8)",
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

            {/* Steps grid */}
            <div
              ref={stepsRef}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--ac-space-4)",
                maxWidth: "860px",
                margin: "0 auto",
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

            {/* Responsive override */}
            <style>{`
              @media (max-width: 768px) {
                div[style*="grid-template-columns: 1fr 1fr"] {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>

            {/* Troubleshooting tip */}
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
                Asegurate de haber reiniciado Premiere completamente (no solo
                cerrar el proyecto). Si usas Premiere 2024+, verifica que los
                comandos del paso 3 se ejecutaron sin errores.
              </p>
            </motion.div>

            {/* Support */}
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
