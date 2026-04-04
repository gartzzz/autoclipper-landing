"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ─── Spring price counter ──────────────────────────────────────────────── */
function AnimatedPrice({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18, mass: 1 });
  const rounded = useTransform(spring, (v) => `$${Math.round(v)}`);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (isInView) {
      motionVal.set(target);
    }
  }, [isInView, motionVal, target]);

  return (
    <motion.span
      ref={ref}
      className="ac-text--mono"
      style={{
        fontSize: "var(--ac-text-3xl)",
        fontWeight: "var(--ac-weight-bold)",
        color: "var(--ac-cyan)",
        letterSpacing: "var(--ac-tracking-tight)",
        lineHeight: 1,
      }}
    >
      {rounded}
    </motion.span>
  );
}

/* ─── Rotating gradient border overlay ─────────────────────────────────── */
/*
  We render a pseudo-layer via a motion.div placed behind the card using
  negative z-index so it never bleeds through card content.
  The gradient border technique: the wrapper is 1px larger on each side,
  the rotating gradient sits on it, and the card itself sits on top.
  We can't use ::before on the motion wrapper from JS, so instead we
  overlay a spinning conic-gradient absolutely positioned behind the card,
  masked to only show the border region via a radial mask.
*/
function RotatingBorder() {
  return (
    <motion.div
      aria-hidden="true"
      animate={{ rotate: 360 }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      style={{
        position: "absolute",
        inset: "-1px",
        borderRadius: "calc(var(--ac-radius-lg) + 1px)",
        background:
          "conic-gradient(from 0deg, transparent 0deg, rgba(157,140,255,0.55) 60deg, rgba(181,166,255,0.8) 90deg, rgba(157,140,255,0.55) 120deg, transparent 180deg)",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

/* ─── Feature list item animation variants ──────────────────────────────── */
const featureContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const featureItem = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 280,
      damping: 24,
    },
  },
};

/* ─── Card hover spring config ──────────────────────────────────────────── */
const cardSpring = { type: "spring" as const, stiffness: 260, damping: 22 };

/* ─── Breathe animation for CTA button ─────────────────────────────────── */
const breathe: import("framer-motion").TargetAndTransition = {
  scale: [1, 1.025, 1],
  transition: {
    duration: 2.8,
    ease: "easeInOut" as const,
    repeat: Infinity,
    repeatType: "loop" as const,
  },
};

/* ─── Features data ─────────────────────────────────────────────────────── */
const features = [
  "Clips ilimitados",
  "7 factores de viralidad",
  "OpenRouter + Ollama (offline)",
  "Secuencias + subtitulos + export en lote",
  "Updates gratis",
  "Soporte directo",
];

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function Pricing() {
  const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_eVqeVcev987M3JMcAwew800";

  /* Card entrance */
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-80px" });

  /* Hover state — controls lifted glow shadow */
  const [hovered, setHovered] = useState(false);

  /* Features in-view trigger */
  const featuresRef = useRef<HTMLUListElement>(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: "-40px" });

  return (
    <section className="ac-section ac-section--accent" id="precios">
      <div className="ac-section__inner">
        <div data-reveal>
          <span className="ac-heading--eyebrow">Precio</span>
        </div>
        <h2 className="ac-heading ac-heading--2" data-reveal>
          Un pago. Tuyo para siempre.
        </h2>
        <p
          className="ac-text ac-text--lead"
          data-reveal
          style={{ marginTop: "var(--ac-space-3)" }}
        >
          Sin suscripciones, sin limites, sin cuentas. Compra, descarga,
          instala.
        </p>

        <motion.div
          ref={cardRef}
          style={{
            maxWidth: "480px",
            margin: "var(--ac-space-10) auto 0",
            position: "relative",
            overflow: "hidden",
            borderRadius: "calc(var(--ac-radius-lg) + 1px)",
          }}
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={
            cardInView
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.95, y: 24 }
          }
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 22,
            mass: 0.9,
          }}
        >
          {/* Rotating gradient border — sits behind the card */}
          <RotatingBorder />

          {/* Card surface — lifts on hover, glow intensifies */}
          <motion.div
            className="ac-card ac-card--glow-cyan"
            data-scanlines
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            animate={
              hovered
                ? {
                    y: -8,
                    boxShadow:
                      "0 0 0 1px rgba(157,140,255,0.45), 0 0 48px rgba(157,140,255,0.30), 0 0 96px rgba(157,140,255,0.12), 0 16px 48px rgba(0,0,0,0.65)",
                  }
                : {
                    y: 0,
                    boxShadow:
                      "0 0 0 1px rgba(157,140,255,0.20), 0 0 24px rgba(157,140,255,0.12), 0 8px 32px rgba(0,0,0,0.50)",
                  }
            }
            transition={cardSpring}
            style={{
              position: "relative",
              zIndex: 1,
              /* Override CSS hover transform so Framer owns it exclusively */
              willChange: "transform, box-shadow",
            }}
          >
            <div className="ac-card__body--lg">
              <div className="ac-pricing-tier__header">
                <span className="ac-badge ac-badge--cyan">Early Bird</span>
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
                  <AnimatedPrice target={49} />
                  <span className="ac-text ac-text--small">un solo pago</span>
                </div>
                <p
                  className="ac-text ac-text--small"
                  style={{ marginTop: "var(--ac-space-2)" }}
                >
                  Precio de lanzamiento &mdash; sube con cada update
                </p>
              </div>

              <motion.ul
                ref={featuresRef}
                className="ac-pricing-features"
                style={{ marginTop: "var(--ac-space-6)" }}
                variants={featureContainer}
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
              >
                {features.map((feature) => (
                  <motion.li
                    key={feature}
                    data-included="true"
                    variants={featureItem}
                  >
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>

              <div style={{ marginTop: "var(--ac-space-8)" }}>
                <motion.a
                  href={STRIPE_PAYMENT_LINK}
                  className="ac-button ac-button--primary"
                  style={{ width: "100%", justifyContent: "center" }}
                  animate={breathe}
                  whileHover={{
                    scale: 1.035,
                    transition: { type: "spring", stiffness: 380, damping: 18 },
                  }}
                  whileTap={{
                    scale: 0.97,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  }}
                >
                  Comprar AutoClipper
                  <span className="ac-button__arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <p
          className="ac-cta-block__subtext"
          data-reveal
          style={{ textAlign: "center", marginTop: "var(--ac-space-6)" }}
        >
          Pago seguro con Stripe &middot; Descarga inmediata &middot; Sin
          suscripcion
        </p>
      </div>
    </section>
  );
}
