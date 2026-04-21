"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";

/* ─── Shared spring config ────────────────────────────────────────────────── */
const SPRING = { stiffness: 60, damping: 18, mass: 1 } as const;

/* ─── Hook: animated integer that counts from `from` to `to` on trigger ──── */
function useCountUp(from: number, to: number, trigger: boolean): string {
  const raw = useMotionValue(from);
  const spring = useSpring(raw, SPRING);
  const mapped = useTransform(spring, [0, 1], [from, to]);
  const [display, setDisplay] = useState(String(from));

  useEffect(() => {
    if (trigger) raw.set(1);
  }, [trigger, raw]);

  useMotionValueEvent(mapped, "change", (v) => {
    setDisplay(String(Math.round(v)));
  });

  return display;
}

/* ─── Bar entrance variant ────────────────────────────────────────────────── */
const barVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const dividerVariants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

const priceVariants = {
  hidden: { opacity: 0, scale: 0.72 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 220, damping: 18 },
  },
};

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function StatBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true, margin: "-80px 0px" });

  // Stat 1: time 45 → 5  (counts down)
  const timeFrom = useCountUp(45, 5, isInView);
  // Stat 2: clips 0 → 12 (counts up)
  const clipsTo = useCountUp(0, 12, isInView);

  return (
    <motion.div
      ref={barRef}
      className="ac-stat-bar"
      data-reveal-group
      variants={barVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* ── Stat 1: Time savings ── */}
      <motion.div
        className="ac-stat-bar__item"
        data-reveal-child
        variants={itemVariants}
      >
        <div className="ac-stat">
          <span className="ac-stat__value">
            <span className="ac-text--accent-cyan">{timeFrom} min</span>
            {" → "}
            <span className="ac-stat__value--cyan">5 min</span>
          </span>
          <span className="ac-stat__label">Tiempo de clipeo</span>
        </div>
      </motion.div>

      <motion.div
        className="ac-stat-bar__divider"
        data-reveal-child
        variants={dividerVariants}
        style={{ transformOrigin: "center" }}
      />

      {/* ── Stat 2: Clips per video ── */}
      <motion.div
        className="ac-stat-bar__item"
        data-reveal-child
        variants={itemVariants}
      >
        <div className="ac-stat">
          <span className="ac-stat__value">
            <span className="ac-text--accent-cyan">2 clips</span>
            {" → "}
            <span className="ac-stat__value--magenta">{clipsTo} clips</span>
          </span>
          <span className="ac-stat__label">Clips por video</span>
        </div>
      </motion.div>

      <motion.div
        className="ac-stat-bar__divider"
        data-reveal-child
        variants={dividerVariants}
        style={{ transformOrigin: "center" }}
      />

      {/* ── Stat 3: Price ── */}
      <motion.div
        className="ac-stat-bar__item"
        data-reveal-child
        variants={itemVariants}
      >
        <div className="ac-stat">
          <motion.span
            className="ac-stat__value ac-stat__value--cyan"
            variants={priceVariants}
            style={{ display: "inline-block" }}
          >
            $67
          </motion.span>
          <span className="ac-stat__label">Un solo pago</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
