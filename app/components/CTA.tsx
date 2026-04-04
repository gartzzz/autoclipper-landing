"use client";

import {
  motion,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { useRef } from "react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/* ─── Animated aurora orb behind CTA text ───────────────────────────────── */
function AuroraOrb({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Primary orb — cyan tint, drifts slowly */}
      <motion.div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(157,140,255,0.07) 0%, rgba(0,210,255,0.04) 40%, transparent 70%)",
          filter: "blur(48px)",
          transformOrigin: "center center",
        }}
        animate={{
          scale: [1, 1.12, 1.04, 1.15, 1],
          x: [0, 30, -20, 15, 0],
          y: [0, -20, 15, -10, 0],
          opacity: [0.6, 0.9, 0.75, 1, 0.6],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      />
      {/* Secondary orb — magenta tint, counter-drift */}
      <motion.div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,60,180,0.05) 0%, rgba(157,140,255,0.03) 50%, transparent 70%)",
          filter: "blur(56px)",
          transformOrigin: "center center",
        }}
        animate={{
          scale: [1, 0.88, 1.08, 0.95, 1],
          x: [0, -25, 18, -12, 0],
          y: [0, 18, -15, 8, 0],
          opacity: [0.5, 0.8, 0.6, 0.9, 0.5],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.3, 0.55, 0.8, 1],
          delay: 2,
        }}
      />
    </motion.div>
  );
}

/* ─── Word-by-word animated headline ────────────────────────────────────── */
function AnimatedHeadline({
  isVisible,
  prefersReducedMotion,
}: {
  isVisible: boolean;
  prefersReducedMotion: boolean | null;
}) {
  const line1 = "Tus mejores momentos ya estan en el video.".split(" ");
  const line2 = "Solo necesitas quien los encuentre.".split(" ");

  const wordVariants = {
    hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.45,
        delay: i * 0.055,
        ease: EASE_OUT_EXPO,
      },
    }),
  };

  const renderWords = (words: string[], lineOffset: number) =>
    words.map((word, i) => (
      <motion.span
        key={`${lineOffset}-${i}`}
        custom={lineOffset + i}
        variants={wordVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        animate={isVisible ? "visible" : undefined}
        style={{ display: "inline-block", marginRight: "0.28em" }}
      >
        {word}
      </motion.span>
    ));

  return (
    <h2 className="ac-heading ac-heading--2">
      <span style={{ display: "block" }}>
        {renderWords(line1, 0)}
      </span>
      <span className="ac-highlight" style={{ display: "block" }}>
        {renderWords(line2, line1.length)}
      </span>
    </h2>
  );
}

/* ─── Primary button with continuous glow pulse ─────────────────────────── */
function GlowButton({
  href,
  children,
  prefersReducedMotion,
}: {
  href: string;
  children: React.ReactNode;
  prefersReducedMotion: boolean | null;
}) {
  return (
    <motion.a
      href={href}
      className="ac-button ac-button--primary ac-button--lg"
      animate={
        prefersReducedMotion
          ? undefined
          : {
              boxShadow: [
                "0 0 0px 0px rgba(157,140,255,0)",
                "0 0 18px 4px rgba(157,140,255,0.35)",
                "0 0 8px 1px rgba(157,140,255,0.15)",
                "0 0 22px 6px rgba(157,140,255,0.4)",
                "0 0 0px 0px rgba(157,140,255,0)",
              ],
            }
      }
      transition={
        prefersReducedMotion
          ? undefined
          : {
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1],
            }
      }
      whileHover={
        prefersReducedMotion
          ? undefined
          : { scale: 1.03, boxShadow: "0 0 28px 8px rgba(157,140,255,0.5)" }
      }
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      style={{ display: "inline-flex", alignItems: "center", gap: "0.5em" }}
    >
      {children}
    </motion.a>
  );
}

/* ─── Main section ────────────────────────────────────────────────────────── */
export default function CTA() {
  const prefersReducedMotion = useReducedMotion();

  const blockRef = useRef<HTMLDivElement>(null);
  const blockInView = useInView(blockRef, { once: true, margin: "-80px 0px" });

  return (
    <section className="ac-section ac-section--cta" id="descargar">
      <div className="ac-section__inner">
        {/* Scale-in container */}
        <motion.div
          ref={blockRef}
          className="ac-cta-block"
          data-reveal="scale"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={
            blockInView
              ? { opacity: 1, scale: 1 }
              : prefersReducedMotion
              ? false
              : { opacity: 0, scale: 0.9 }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  type: "spring",
                  stiffness: 200,
                  damping: 24,
                  mass: 0.8,
                }
          }
          style={{ position: "relative" }}
        >
          {/* Aurora orb — sits behind all content via z-index: 0 on the orb and z-index: 1 on content */}
          <AuroraOrb prefersReducedMotion={prefersReducedMotion} />

          {/* All text content lifted above the orb */}
          <div style={{ position: "relative", zIndex: 1, width: "100%", display: "contents" }}>
            <motion.span
              className="ac-heading--eyebrow"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={blockInView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.4,
                delay: 0.1,
                ease: EASE_OUT_EXPO,
              }}
            >
              Deja de perder el tiempo
            </motion.span>

            <AnimatedHeadline
              isVisible={blockInView}
              prefersReducedMotion={prefersReducedMotion}
            />

            <motion.p
              className="ac-text ac-text--lead"
              style={{ textAlign: "center" }}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={blockInView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.5,
                // Delay until after headline words finish: ~line1(10 words) + line2(6 words) ~= 16 words * 55ms + buffer
                delay: 0.95,
                ease: EASE_OUT_EXPO,
              }}
            >
              No es cuestion de talento. Tu contenido ya es bueno. El problema
              es que los mejores 30 segundos se te escapan enterrados en 40
              minutos de timeline. AutoClipper los encuentra, los separa en
              secuencias, les pone titulo y los deja listos para exportar. La pregunta no es si
              funciona. Es cuanto tiempo mas vas a seguir haciendolo a mano.
            </motion.p>

            <motion.div
              className="ac-cta-block__actions"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={blockInView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.45,
                delay: 1.1,
                ease: EASE_OUT_EXPO,
              }}
            >
              <GlowButton
                href="https://buy.stripe.com/test_eVqeVcev987M3JMcAwew800"
                prefersReducedMotion={prefersReducedMotion}
              >
                Comprar por $49
                <span className="ac-button__arrow" aria-hidden="true">
                  &rarr;
                </span>
              </GlowButton>

              <motion.a
                href="#como-funciona"
                className="ac-button ac-button--ghost"
                whileHover={
                  prefersReducedMotion ? undefined : { scale: 1.02 }
                }
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Ver como funciona
              </motion.a>
            </motion.div>

            <motion.p
              className="ac-cta-block__subtext"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={blockInView ? { opacity: 1 } : undefined}
              transition={{
                duration: 0.5,
                delay: 1.3,
                ease: "easeOut",
              }}
            >
              Un solo pago &middot; Actualizaciones para siempre &middot; Setup en 2 minutos
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
