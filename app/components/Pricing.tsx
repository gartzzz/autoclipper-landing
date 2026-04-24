"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { STRIPE_PAYMENT_LINK } from "../lib/stripe";
import {
  trackViewContent,
  trackInitiateCheckout,
  withEventId,
} from "../lib/pixel";
import {
  EARLY_BIRD_LIMIT,
  PRICE_EARLY_BIRD,
  PRICE_POST_V1,
  PRICE_TIER_0,
  V1_RELEASE_LABEL,
} from "../lib/config";
import Countdown from "./Countdown";

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
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: "-1px",
        borderRadius: "calc(var(--ac-radius-lg) + 1px)",
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(157,140,255,0.55) 60deg, rgba(181,166,255,0.8) 90deg, rgba(157,140,255,0.55) 120deg, transparent 180deg)",
        }}
      />
    </div>
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

/* ─── Price ladder ──────────────────────────────────────────────────────── */
interface Tier {
  price: number;
  label: string;
  active?: boolean;
}

function PriceLadder() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const tiers: Tier[] = [
    {
      price: PRICE_EARLY_BIRD,
      label: `Early Bird · primeros ${EARLY_BIRD_LIMIT}`,
      active: true,
    },
    { price: PRICE_TIER_0, label: "hasta v1.0" },
    { price: PRICE_POST_V1, label: "post-v1.0" },
  ];

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: "var(--ac-space-1)",
        marginTop: "var(--ac-space-5)",
        fontSize: "var(--ac-text-xs)",
      }}
    >
      {tiers.map((tier, i) => (
        <div
          key={tier.price}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--ac-space-1)",
            flex: 1,
            minWidth: 0,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.12, ease: "easeOut" }}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "var(--ac-space-2)",
              padding: "var(--ac-space-2) var(--ac-space-3)",
              borderRadius: "var(--ac-radius-sm)",
              background: tier.active
                ? "rgba(157, 140, 255, 0.08)"
                : "transparent",
              border: tier.active
                ? "1px solid var(--ac-cyan-subtle)"
                : "1px dashed rgba(255, 255, 255, 0.08)",
              minWidth: 0,
            }}
          >
            <span
              aria-hidden="true"
              className={tier.active ? "ac-pulse-glow" : undefined}
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                flexShrink: 0,
                background: tier.active
                  ? "var(--ac-cyan)"
                  : "transparent",
                border: tier.active
                  ? "none"
                  : "1px solid var(--ac-text-tertiary)",
                boxShadow: tier.active
                  ? "0 0 10px var(--ac-cyan)"
                  : "none",
              }}
            />
            <span
              className="ac-text--mono"
              style={{
                fontWeight: tier.active
                  ? "var(--ac-weight-semibold)"
                  : "var(--ac-weight-medium)",
                color: tier.active
                  ? "var(--ac-text-primary)"
                  : "var(--ac-text-tertiary)",
                letterSpacing: "var(--ac-tracking-tight)",
                whiteSpace: "nowrap",
              }}
            >
              ${tier.price}
            </span>
            <span
              style={{
                color: tier.active
                  ? "var(--ac-text-secondary)"
                  : "var(--ac-text-tertiary)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {tier.label}
            </span>
          </motion.div>
          {i < tiers.length - 1 && (
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.35 + i * 0.12 }}
              style={{
                color: "var(--ac-text-tertiary)",
                fontSize: "var(--ac-text-sm)",
                flexShrink: 0,
              }}
            >
              &rarr;
            </motion.span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Features data ─────────────────────────────────────────────────────── */
const features = [
  "Clips ilimitados",
  "IA local con Gemma 4 — sin API keys, sin costes",
  "7 factores de viralidad",
  "Secuencias listas en Premiere",
  "Revision keyboard-first (← → espacio)",
  "Updates gratis",
  "Soporte directo",
];

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function Pricing() {

  /* Card entrance */
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-80px" });

  /* Fire ViewContent when the pricing card first enters the viewport.
     `once: true` garantiza que sólo se dispare una vez por sesión. */
  useEffect(() => {
    if (cardInView) {
      trackViewContent({ contentName: "AutoClipper v0.1", value: PRICE_EARLY_BIRD });
    }
  }, [cardInView]);

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
                <span
                  className="ac-badge ac-badge--cyan"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "var(--ac-space-2)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="ac-pulse-glow"
                    style={{
                      display: "inline-block",
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "var(--ac-cyan)",
                      boxShadow: "0 0 10px var(--ac-cyan)",
                    }}
                  />
                  Early Bird &middot; primeros {EARLY_BIRD_LIMIT}
                </span>
              </div>

              <div
                className="ac-pricing-tier__price"
                style={{ marginTop: "var(--ac-space-5)" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "var(--ac-space-3)",
                  }}
                >
                  <span
                    className="ac-text--mono"
                    style={{
                      fontSize: "var(--ac-text-lg)",
                      fontWeight: "var(--ac-weight-medium)",
                      color: "var(--ac-text-tertiary)",
                      textDecoration: "line-through",
                      letterSpacing: "var(--ac-tracking-tight)",
                    }}
                    aria-label="Precio regular"
                  >
                    ${PRICE_POST_V1}
                  </span>
                  <AnimatedPrice target={PRICE_EARLY_BIRD} />
                  <span className="ac-text ac-text--small">un solo pago</span>
                </div>
                <p
                  className="ac-text ac-text--small"
                  style={{ marginTop: "var(--ac-space-2)" }}
                >
                  Los primeros {EARLY_BIRD_LIMIT} en ${PRICE_EARLY_BIRD} &middot; luego ${PRICE_TIER_0} hasta v1.0 ({V1_RELEASE_LABEL}) &middot; despues ${PRICE_POST_V1} &middot; No vuelve a bajar
                </p>
              </div>

              <PriceLadder />

              <p
                className="ac-text ac-text--small"
                style={{
                  marginTop: "var(--ac-space-3)",
                  color: "var(--ac-text-tertiary)",
                  textAlign: "center",
                }}
              >
                v1.0 el {V1_RELEASE_LABEL} &middot; faltan <Countdown variant="full" />
              </p>

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
                  onClick={(e) => {
                    e.preventDefault();
                    const id = trackInitiateCheckout({ value: PRICE_EARLY_BIRD });
                    window.location.href = withEventId(
                      STRIPE_PAYMENT_LINK,
                      id
                    );
                  }}
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
          Pago seguro con Stripe &middot; Entrega por email &middot; Sin
          suscripcion
        </p>
      </div>
    </section>
  );
}
