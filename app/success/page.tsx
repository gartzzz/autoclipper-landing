"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import TerminalTypewriter, { type TypeStep } from "./TerminalTypewriter";

/* ─── Spring / easing config ───────────────────────────────────────────────── */

const springConfig = { type: "spring" as const, stiffness: 380, damping: 22 };

/* ─── Next steps (manual install flow — zip con carpeta extension) ─────────── */

type NextStep = {
  number: string;
  title: string;
  description: string;
  codeMac?: string;
  codeWin?: string;
  detail?: string;
};

const nextSteps: NextStep[] = [
  {
    number: "01",
    title: "Abre el correo de confirmacion",
    description:
      "Tu descarga con AutoClipper esta en la bandeja del correo que usaste para pagar.",
    detail:
      "Llega en ~1 minuto. Si tarda, revisa 'Spam' o 'Promociones' — a veces cae ahi.",
  },
  {
    number: "02",
    title: "Descarga y descomprime el .zip",
    description:
      "Haz click en el link del email. El .zip contiene una carpeta llamada com.gartzzz.autoclipper.",
    detail:
      "En Mac a veces se descomprime solo; en Windows: click derecho > Extraer todo.",
  },
  {
    number: "03",
    title: "Mueve la carpeta a Extensions de CEP",
    description:
      "Copia la carpeta completa a la ruta de extensiones de Adobe segun tu sistema.",
    codeMac: "~/Library/Application Support/Adobe/CEP/extensions/",
    codeWin: "C:\\Users\\<tu-usuario>\\AppData\\Roaming\\Adobe\\CEP\\extensions\\",
    detail:
      "Si la carpeta extensions no existe, creala. En Mac la carpeta Library esta oculta: en Finder pulsa Cmd+Shift+G y pega la ruta.",
  },
  {
    number: "04",
    title: "Habilita PlayerDebugMode (solo una vez)",
    description:
      "Premiere bloquea extensiones no firmadas por defecto. Un comando en terminal lo activa.",
    codeMac:
      'for v in 9 10 11 12 13; do defaults write com.adobe.CSXS.$v PlayerDebugMode 1; done',
    codeWin:
      'reg add HKCU\\Software\\Adobe\\CSXS.11 /v PlayerDebugMode /t REG_SZ /d 1 /f',
    detail:
      "Solo la primera vez. A partir de ahi cualquier extension CEP en tu equipo funciona sin pedir firma.",
  },
  {
    number: "05",
    title: "Instala Ollama + Gemma 4 y reinicia Premiere",
    description:
      "Sigue la guia de abajo (3 comandos) y reinicia Premiere completamente (Cmd+Q en Mac, no solo cerrar el proyecto).",
    detail:
      "El panel aparece en Window > Extensions > AutoClipper. Puedes anclarlo donde te convenga.",
  },
];

/* ─── Quick-start terminal scenes (typed char-by-char, fake output in between) ── */

const macTerminalSteps: TypeStep[] = [
  { kind: "type", text: "$ brew install ollama" },
  { kind: "nl" },
  { kind: "pause", ms: 400 },
  { kind: "out", text: "==> Downloading https://ghcr.io/v2/homebrew/core/ollama/blobs/..." },
  { kind: "nl" },
  { kind: "pause", ms: 180 },
  { kind: "out", text: "==> Pouring ollama--0.4.0.arm64_sequoia.bottle.tar.gz" },
  { kind: "nl" },
  { kind: "pause", ms: 240 },
  { kind: "out", text: "🍺  /opt/homebrew/Cellar/ollama/0.4.0: 12 files, 24.8MB" },
  { kind: "nl" },
  { kind: "pause", ms: 700 },
  { kind: "nl" },
  { kind: "type", text: "$ ollama pull gemma4:12b" },
  { kind: "nl" },
  { kind: "pause", ms: 400 },
  { kind: "out", text: "pulling manifest" },
  { kind: "nl" },
  { kind: "pause", ms: 260 },
  { kind: "out", text: "pulling 8eeb52dfb3bb... 100% ▕████████████████▏ 7.2 GB" },
  { kind: "nl" },
  { kind: "pause", ms: 220 },
  { kind: "out", text: "pulling 621cdd7ced3b... 100% ▕████████████████▏ 7.0 KB" },
  { kind: "nl" },
  { kind: "pause", ms: 220 },
  { kind: "out", text: "verifying sha256 digest" },
  { kind: "nl" },
  { kind: "pause", ms: 160 },
  { kind: "out", text: "writing manifest" },
  { kind: "nl" },
  { kind: "pause", ms: 160 },
  { kind: "out", text: "success" },
  { kind: "nl" },
  { kind: "pause", ms: 700 },
  { kind: "nl" },
  { kind: "type", text: "$ ollama run gemma4:12b" },
  { kind: "nl" },
  { kind: "pause", ms: 500 },
  { kind: "out", text: ">>> " },
  { kind: "pause", ms: 1200 },
  { kind: "out", text: "listo para analizar transcripciones." },
  { kind: "pause", ms: 4500 },
];

const winTerminalSteps: TypeStep[] = [
  { kind: "type", text: "> winget install --id Ollama.Ollama" },
  { kind: "nl" },
  { kind: "pause", ms: 400 },
  { kind: "out", text: "Found Ollama [Ollama.Ollama] Version 0.4.0" },
  { kind: "nl" },
  { kind: "pause", ms: 220 },
  { kind: "out", text: "Downloading https://ollama.com/download/OllamaSetup.exe" },
  { kind: "nl" },
  { kind: "pause", ms: 240 },
  { kind: "out", text: "Successfully installed" },
  { kind: "nl" },
  { kind: "pause", ms: 700 },
  { kind: "nl" },
  { kind: "type", text: "> ollama pull gemma4:12b" },
  { kind: "nl" },
  { kind: "pause", ms: 400 },
  { kind: "out", text: "pulling manifest" },
  { kind: "nl" },
  { kind: "pause", ms: 260 },
  { kind: "out", text: "pulling 8eeb52dfb3bb... 100% ▕████████████████▏ 7.2 GB" },
  { kind: "nl" },
  { kind: "pause", ms: 220 },
  { kind: "out", text: "verifying sha256 digest" },
  { kind: "nl" },
  { kind: "pause", ms: 160 },
  { kind: "out", text: "success" },
  { kind: "nl" },
  { kind: "pause", ms: 700 },
  { kind: "nl" },
  { kind: "type", text: "> ollama run gemma4:12b" },
  { kind: "nl" },
  { kind: "pause", ms: 500 },
  { kind: "out", text: ">>> " },
  { kind: "pause", ms: 1200 },
  { kind: "out", text: "listo para analizar transcripciones." },
  { kind: "pause", ms: 4500 },
];

const macRawCommand = `brew install ollama
ollama pull gemma4:12b
ollama run gemma4:12b`;

const winRawCommand = `winget install --id Ollama.Ollama
ollama pull gemma4:12b
ollama run gemma4:12b`;

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

function StepCard({
  step,
  index,
  isInView,
  os,
}: {
  step: NextStep;
  index: number;
  isInView: boolean;
  os: "mac" | "win";
}) {
  const code = os === "mac" ? step.codeMac : step.codeWin;
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

      {code && <CodeBlock code={code} />}

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
  const [os, setOs] = useState<"mac" | "win">("mac");

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-40px" });

  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" });

  const quickstartRef = useRef<HTMLDivElement>(null);
  const quickstartInView = useInView(quickstartRef, { once: true, margin: "-60px" });

  const terminalSteps = os === "mac" ? macTerminalSteps : winTerminalSteps;
  const terminalRaw = os === "mac" ? macRawCommand : winRawCommand;
  const terminalTitle = os === "mac" ? "autoclipper — zsh" : "autoclipper — powershell";

  /* Auto-detect OS */
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes("win")) setOs("win");
    }
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
              Enhorabuena, ya eres parte de{" "}
              <span className="ac-highlight">AutoClipper</span>.
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
                maxWidth: "560px",
                marginInline: "auto",
              }}
            >
              Te hemos enviado el link de descarga al correo que usaste en el pago.
              <br />
              <span style={{ color: "var(--ac-text-secondary)" }}>
                Es lo unico que necesitas para empezar.
              </span>
            </motion.p>

            {/* Email callout box — primary CTA */}
            <motion.div
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              style={{
                maxWidth: "560px",
                marginInline: "auto",
                marginTop: "var(--ac-space-8)",
                background: "var(--ac-cyan-dim)",
                border: "1px solid var(--ac-cyan-muted)",
                borderRadius: "var(--ac-radius-lg)",
                padding: "var(--ac-space-5) var(--ac-space-6)",
                display: "flex",
                alignItems: "flex-start",
                gap: "var(--ac-space-4)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "var(--ac-radius-md)",
                  background: "var(--ac-cyan-subtle)",
                  border: "1px solid var(--ac-cyan-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                &#9993;
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  style={{
                    margin: 0,
                    marginBottom: "var(--ac-space-2)",
                    fontSize: "var(--ac-text-md)",
                    fontWeight: "var(--ac-weight-semibold)",
                    color: "var(--ac-cyan-bright)",
                    fontFamily: "var(--ac-font-sans)",
                  }}
                >
                  Revisa tu correo ahora
                </h3>
                <ul
                  className="ac-text"
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    fontSize: "var(--ac-text-sm)",
                    color: "var(--ac-text-secondary)",
                    lineHeight: "var(--ac-leading-relaxed)",
                  }}
                >
                  <li>
                    <strong style={{ color: "var(--ac-text-primary)" }}>
                      Asunto:
                    </strong>{" "}
                    Tu descarga de AutoClipper esta lista
                  </li>
                  <li>
                    <strong style={{ color: "var(--ac-text-primary)" }}>
                      De:
                    </strong>{" "}
                    hola@elestudioeme.com
                  </li>
                  <li>
                    Si no lo ves en 2 minutos, revisa{" "}
                    <strong style={{ color: "var(--ac-text-primary)" }}>
                      Spam
                    </strong>{" "}
                    o{" "}
                    <strong style={{ color: "var(--ac-text-primary)" }}>
                      Promociones
                    </strong>
                    .
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Next steps ──────────────────────────────────────────────── */}
        <section
          className="ac-section ac-section--alt"
          style={{ paddingTop: "var(--ac-space-16)" }}
        >
          <div className="ac-section__inner">
            <div data-reveal style={{ textAlign: "center" }}>
              <span className="ac-heading--eyebrow">Siguientes pasos</span>
            </div>
            <h2
              className="ac-heading ac-heading--2"
              data-reveal
              style={{ textAlign: "center" }}
            >
              5 pasos. 5 minutos.
              <br />
              Y estas editando como un estudio.
            </h2>

            {/* OS switcher (compartido con el quickstart de abajo) */}
            <div
              data-reveal
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "var(--ac-space-2)",
                marginTop: "var(--ac-space-6)",
                maxWidth: 260,
                marginInline: "auto",
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

            {/* Steps grid — auto-fit para que 5 pasos se acomoden bien */}
            <div
              ref={stepsRef}
              className="success-steps-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "var(--ac-space-4)",
                maxWidth: "860px",
                margin: "var(--ac-space-8) auto 0",
              }}
            >
              {nextSteps.map((step, i) => (
                <StepCard
                  key={step.number}
                  step={step}
                  index={i}
                  isInView={stepsInView}
                  os={os}
                />
              ))}
            </div>

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
                Mac, no solo cerrar el proyecto) y de haber ejecutado el comando
                de PlayerDebugMode del paso 04. Si sigue sin aparecer, verifica
                que la carpeta <code className="ac-text--mono">com.gartzzz.autoclipper</code>
                esta dentro de <code className="ac-text--mono">extensions/</code> y
                no anidada en otra subcarpeta.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── Quick-start guide (terminal) ─────────────────────────────── */}
        <section
          className="ac-section"
          style={{
            paddingTop: "var(--ac-space-16)",
            paddingBottom: "var(--ac-space-20)",
          }}
        >
          <div className="ac-section__inner" ref={quickstartRef}>
            <div style={{ textAlign: "center" }}>
              <motion.span
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate={quickstartInView ? "visible" : "hidden"}
                className="ac-heading--eyebrow"
              >
                Prefieres ir directo?
              </motion.span>
            </div>
            <motion.h2
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate={quickstartInView ? "visible" : "hidden"}
              className="ac-heading ac-heading--2"
              style={{ textAlign: "center" }}
            >
              Instala Ollama + Gemma 4 en{" "}
              <span className="ac-highlight">3 comandos</span>.
            </motion.h2>

            {/* OS switcher for quickstart commands */}
            <motion.div
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate={quickstartInView ? "visible" : "hidden"}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "var(--ac-space-2)",
                marginTop: "var(--ac-space-6)",
                maxWidth: 260,
                marginInline: "auto",
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
            </motion.div>

            {/* Terminal commands — animated typewriter */}
            <motion.div
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate={quickstartInView ? "visible" : "hidden"}
              style={{
                maxWidth: "680px",
                marginInline: "auto",
                marginTop: "var(--ac-space-5)",
              }}
            >
              <TerminalTypewriter
                steps={terminalSteps}
                rawCommand={terminalRaw}
                title={terminalTitle}
                play={quickstartInView}
                resetKey={os}
              />
            </motion.div>

            {/* Details: other hardware tiers */}
            <motion.div
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate={quickstartInView ? "visible" : "hidden"}
              style={{
                maxWidth: "680px",
                marginInline: "auto",
                marginTop: "var(--ac-space-4)",
              }}
            >
              <details
                style={{
                  background: "var(--ac-bg-surface)",
                  border: "1px solid var(--ac-border-subtle)",
                  borderRadius: "var(--ac-radius-lg)",
                  padding: "var(--ac-space-4) var(--ac-space-5)",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontSize: "var(--ac-text-sm)",
                    fontWeight: "var(--ac-weight-semibold)",
                    color: "var(--ac-text-primary)",
                    fontFamily: "var(--ac-font-sans)",
                    listStyle: "none",
                  }}
                >
                  Otro modelo segun tu hardware
                </summary>
                <div
                  style={{
                    marginTop: "var(--ac-space-3)",
                    fontSize: "var(--ac-text-sm)",
                    color: "var(--ac-text-secondary)",
                    lineHeight: "var(--ac-leading-relaxed)",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "var(--ac-text-sm)",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          borderBottom: "1px solid var(--ac-border-subtle)",
                        }}
                      >
                        <th
                          style={{
                            textAlign: "left",
                            padding: "var(--ac-space-2) 0",
                            color: "var(--ac-text-primary)",
                            fontWeight: "var(--ac-weight-semibold)",
                          }}
                        >
                          Hardware
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "var(--ac-space-2) 0",
                            color: "var(--ac-text-primary)",
                            fontWeight: "var(--ac-weight-semibold)",
                          }}
                        >
                          Modelo recomendado
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        style={{
                          borderBottom: "1px solid var(--ac-border-faint)",
                        }}
                      >
                        <td style={{ padding: "var(--ac-space-2) 0" }}>
                          8 GB RAM / VRAM
                        </td>
                        <td style={{ padding: "var(--ac-space-2) 0" }}>
                          <code
                            className="ac-text--mono"
                            style={{ color: "var(--ac-cyan-bright)" }}
                          >
                            gemma4:4b
                          </code>
                        </td>
                      </tr>
                      <tr
                        style={{
                          borderBottom: "1px solid var(--ac-border-faint)",
                        }}
                      >
                        <td style={{ padding: "var(--ac-space-2) 0" }}>
                          16–32 GB (recomendado)
                        </td>
                        <td style={{ padding: "var(--ac-space-2) 0" }}>
                          <code
                            className="ac-text--mono"
                            style={{ color: "var(--ac-cyan-bright)" }}
                          >
                            gemma4:12b
                          </code>
                        </td>
                      </tr>
                      <tr
                        style={{
                          borderBottom: "1px solid var(--ac-border-faint)",
                        }}
                      >
                        <td style={{ padding: "var(--ac-space-2) 0" }}>
                          48+ GB (Pro / Max)
                        </td>
                        <td style={{ padding: "var(--ac-space-2) 0" }}>
                          <code
                            className="ac-text--mono"
                            style={{ color: "var(--ac-cyan-bright)" }}
                          >
                            gemma4:27b
                          </code>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "var(--ac-space-2) 0" }}>
                          CPU modesto
                        </td>
                        <td style={{ padding: "var(--ac-space-2) 0" }}>
                          <code
                            className="ac-text--mono"
                            style={{ color: "var(--ac-cyan-bright)" }}
                          >
                            gemma4:1b
                          </code>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </details>
            </motion.div>

            <p
              className="ac-text ac-text--small"
              style={{
                textAlign: "center",
                marginTop: "var(--ac-space-10)",
                opacity: 0.5,
              }}
            >
              Problemas? Escribe a hola@elestudioeme.com
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
