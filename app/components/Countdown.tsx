"use client";

import { useEffect, useState } from "react";
import { V1_RELEASE_DATE } from "../lib/config";

type Variant = "compact" | "full";

interface CountdownProps {
  variant?: Variant;
  target?: Date;
  className?: string;
  style?: React.CSSProperties;
}

interface Parts {
  d: number;
  h: number;
  m: number;
}

function diffParts(target: Date, now: Date): Parts | null {
  const ms = target.getTime() - now.getTime();
  if (ms <= 0) return null;
  const totalMinutes = Math.floor(ms / 60_000);
  const d = Math.floor(totalMinutes / (60 * 24));
  const h = Math.floor((totalMinutes % (60 * 24)) / 60);
  const m = totalMinutes % 60;
  return { d, h, m };
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

function format(parts: Parts, variant: Variant): string {
  if (variant === "compact") {
    return `${parts.d}d ${pad(parts.h)}h`;
  }
  return `${parts.d}d ${pad(parts.h)}h ${pad(parts.m)}m`;
}

export default function Countdown({
  variant = "full",
  target = V1_RELEASE_DATE,
  className,
  style,
}: CountdownProps) {
  const [parts, setParts] = useState<Parts | null>(() =>
    diffParts(target, new Date())
  );

  useEffect(() => {
    // Respect reduce-motion: tick every 60s instead of every minute change
    // to minimize repaints. The minute-resolution format means 1-second
    // updates are wasted anyway.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const intervalMs = prefersReduced ? 60_000 : 30_000;

    const tick = () => setParts(diffParts(target, new Date()));
    tick();
    const id = window.setInterval(tick, intervalMs);
    return () => window.clearInterval(id);
  }, [target]);

  if (!parts) return null;

  return (
    <span
      className={`ac-text--mono${className ? ` ${className}` : ""}`}
      style={{
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "var(--ac-tracking-tight)",
        ...style,
      }}
      aria-label={`Faltan ${parts.d} dias, ${parts.h} horas y ${parts.m} minutos`}
    >
      {format(parts, variant)}
    </span>
  );
}
