"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   Step types — a flat list drives the terminal animation
   ───────────────────────────────────────────────────────────────────────────── */

export type TypeStep =
  | { kind: "type"; text: string }    // typed character by character
  | { kind: "out"; text: string }     // printed instantly (fake output)
  | { kind: "nl" }                    // newline
  | { kind: "pause"; ms: number };    // idle delay

/* ─────────────────────────────────────────────────────────────────────────────
   Props
   ───────────────────────────────────────────────────────────────────────────── */

interface TerminalTypewriterProps {
  steps: TypeStep[];
  /** Raw text copied when the user hits the Copy button (not the fake output). */
  rawCommand: string;
  /** Text shown on the terminal chrome's title bar. */
  title?: string;
  /** When false, the animation is frozen. Flip to true via useInView on the parent. */
  play: boolean;
  /** Key to force a full restart — useful when the OS switcher swaps steps. */
  resetKey?: string | number;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Timing constants (ms)
   ───────────────────────────────────────────────────────────────────────────── */

const CHAR_DELAY_MIN = 28;
const CHAR_DELAY_JITTER = 32;
const OUT_LINE_DELAY = 60;
const NEWLINE_DELAY = 30;
const LOOP_DELAY = 6000;

/* ─────────────────────────────────────────────────────────────────────────────
   TerminalTypewriter
   ───────────────────────────────────────────────────────────────────────────── */

export default function TerminalTypewriter({
  steps,
  rawCommand,
  title = "autoclipper — zsh",
  play,
  resetKey,
}: TerminalTypewriterProps) {
  const [display, setDisplay] = useState("");
  const [cycle, setCycle] = useState(0);
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  /* ── Run the animation as a scheduled chain of setTimeouts ─────────────── */
  useEffect(() => {
    if (!play) {
      setDisplay("");
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    let buffer = "";
    let cumulative = 0;

    setDisplay("");

    const schedule = (delay: number, snapshot: string) => {
      const t = setTimeout(() => setDisplay(snapshot), delay);
      timers.push(t);
    };

    for (const step of steps) {
      if (step.kind === "type") {
        for (let i = 0; i < step.text.length; i++) {
          cumulative += CHAR_DELAY_MIN + Math.random() * CHAR_DELAY_JITTER;
          buffer = buffer + step.text.charAt(i);
          schedule(cumulative, buffer);
        }
      } else if (step.kind === "out") {
        cumulative += OUT_LINE_DELAY;
        buffer = buffer + step.text;
        schedule(cumulative, buffer);
      } else if (step.kind === "nl") {
        cumulative += NEWLINE_DELAY;
        buffer = buffer + "\n";
        schedule(cumulative, buffer);
      } else if (step.kind === "pause") {
        cumulative += step.ms;
      }
    }

    // Restart the loop after a final pause
    const restart = setTimeout(() => {
      setCycle((c) => c + 1);
    }, cumulative + LOOP_DELAY);
    timers.push(restart);

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
    // Intentionally re-running on cycle / resetKey / play / steps changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, cycle, resetKey, steps]);

  /* ── Auto-scroll to bottom as content grows ────────────────────────────── */
  useEffect(() => {
    const el = preRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [display]);

  /* ── Reset when the parent swaps scenes (OS switch) ────────────────────── */
  useEffect(() => {
    setCycle(0);
    setDisplay("");
  }, [resetKey]);

  /* ── Copy handler ──────────────────────────────────────────────────────── */
  const handleCopy = () => {
    navigator.clipboard.writeText(rawCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── Render ────────────────────────────────────────────────────────────── */
  return (
    <div
      role="img"
      aria-label="Terminal demostrando la instalacion de Ollama y Gemma 4"
      style={{
        background: "var(--ac-bg-void)",
        border: "1px solid var(--ac-border-default)",
        borderRadius: "var(--ac-radius-lg)",
        overflow: "hidden",
        boxShadow:
          "0 20px 60px -20px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(157, 140, 255, 0.05)",
      }}
    >
      {/* Chrome — mac window header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--ac-space-2)",
          padding: "10px var(--ac-space-3)",
          background: "var(--ac-bg-elevated)",
          borderBottom: "1px solid var(--ac-border-subtle)",
        }}
      >
        <div style={{ display: "flex", gap: 6 }} aria-hidden="true">
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ff5f57",
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#febc2e",
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#28c840",
              display: "inline-block",
            }}
          />
        </div>
        <span
          className="ac-text--mono"
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: "var(--ac-text-xs)",
            color: "var(--ac-text-tertiary)",
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            background: copied ? "var(--ac-success-dim)" : "transparent",
            border: `1px solid ${copied ? "var(--ac-success)" : "var(--ac-border-subtle)"}`,
            borderRadius: "var(--ac-radius-sm)",
            padding: "3px 10px",
            cursor: "pointer",
            fontSize: "var(--ac-text-xs)",
            fontFamily: "var(--ac-font-mono)",
            color: copied ? "var(--ac-success)" : "var(--ac-text-secondary)",
            transition: "var(--ac-transition-all)",
          }}
          aria-label="Copiar comandos"
        >
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>

      {/* Content — scrolling terminal body */}
      <pre
        ref={preRef}
        className="ac-text--mono"
        style={{
          margin: 0,
          padding: "var(--ac-space-5) var(--ac-space-5) var(--ac-space-6)",
          fontSize: "var(--ac-text-xs)",
          lineHeight: 1.65,
          color: "var(--ac-text-primary)",
          minHeight: 320,
          maxHeight: 420,
          overflowY: "auto",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {display}
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: 8,
            height: "1em",
            marginLeft: 2,
            background: "var(--ac-cyan-bright)",
            verticalAlign: "text-bottom",
            animation: "ac-terminal-blink 1s steps(1) infinite",
          }}
        />
      </pre>

      <style>{`
        @keyframes ac-terminal-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
