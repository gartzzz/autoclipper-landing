"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRefContext } from "./RefProvider";
import Countdown from "./Countdown";
import { PRICE_EARLY_BIRD, PRICE_TIER_0 } from "../lib/config";

const DISMISS_KEY = "ac_urgency_dismissed";

export default function UrgencyBar() {
  const { affiliateName } = useRefContext();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Restore dismiss state from sessionStorage on mount.
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(DISMISS_KEY) === "1") {
        setDismissed(true);
      }
    } catch {
      // sessionStorage bloqueado (incógnito estricto) — seguimos sin persistir.
    }
  }, []);

  // Show after Hero leaves viewport, hide when Pricing section enters viewport
  // (avoid redundancy with the Pricing card already on screen).
  useEffect(() => {
    if (dismissed) return;

    const hero = document.querySelector("#main > section:first-child");
    const pricing = document.querySelector("#precios");
    if (!hero || !pricing) return;

    let heroVisible = true;
    let pricingVisible = false;

    const update = () => {
      setVisible(!heroVisible && !pricingVisible);
    };

    const heroObs = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );
    const pricingObs = new IntersectionObserver(
      ([entry]) => {
        pricingVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0.15 }
    );

    heroObs.observe(hero);
    pricingObs.observe(pricing);
    return () => {
      heroObs.disconnect();
      pricingObs.disconnect();
    };
  }, [dismissed]);

  const onDismiss = () => {
    setDismissed(true);
    setVisible(false);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* no-op */
    }
  };

  const onCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#precios");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Nav is fixed at top:0 with ~60px height (padding 18px + logo 24px + padding 18px).
  // RefBanner, when present, sits above Nav with ~40px height.
  // UrgencyBar anchors below the Nav to avoid overlap.
  const NAV_HEIGHT = 60;
  const REFBANNER_HEIGHT = 40;
  const topOffset = NAV_HEIGHT + (affiliateName ? REFBANNER_HEIGHT : 0);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="urgency-bar"
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          role="complementary"
          aria-label="Oferta Early Bird"
          style={{
            position: "fixed",
            top: `${topOffset}px`,
            left: 0,
            right: 0,
            zIndex: 175,
            background: "rgba(10, 10, 14, 0.92)",
            backdropFilter: "blur(14px) saturate(1.2)",
            WebkitBackdropFilter: "blur(14px) saturate(1.2)",
            borderBottom: "1px solid var(--ac-cyan-subtle)",
            boxShadow: "0 2px 24px rgba(0, 0, 0, 0.5)",
            padding: "var(--ac-space-2) var(--ac-space-4)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--ac-space-3)",
              maxWidth: "1200px",
              margin: "0 auto",
              fontSize: "var(--ac-text-sm)",
              color: "var(--ac-text-primary)",
              flexWrap: "nowrap",
            }}
          >
            <span
              aria-hidden="true"
              className="ac-pulse-glow"
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--ac-success)",
                boxShadow: "0 0 12px var(--ac-success)",
                flexShrink: 0,
              }}
            />

            {/* Desktop: full message. Mobile: compact. */}
            <span className="ac-urgency-bar__desktop" style={{ whiteSpace: "nowrap" }}>
              Early Bird ${PRICE_EARLY_BIRD} &middot; Sube a ${PRICE_TIER_0} en{" "}
              <Countdown variant="full" />
            </span>
            <span className="ac-urgency-bar__mobile" style={{ whiteSpace: "nowrap" }}>
              ${PRICE_EARLY_BIRD} &middot; <Countdown variant="compact" />
            </span>

            <a
              href="#precios"
              onClick={onCta}
              className="ac-button ac-button--sm ac-button--primary"
              style={{ flexShrink: 0 }}
            >
              <span className="ac-urgency-bar__cta-desktop">Asegurar plaza</span>
              <span className="ac-urgency-bar__cta-mobile">Comprar</span>
              <span className="ac-button__arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>

            <button
              type="button"
              onClick={onDismiss}
              aria-label="Cerrar aviso"
              style={{
                background: "transparent",
                border: "none",
                color: "var(--ac-text-tertiary)",
                cursor: "pointer",
                fontSize: "18px",
                lineHeight: 1,
                padding: "4px 8px",
                flexShrink: 0,
              }}
            >
              &times;
            </button>
          </div>

          <style jsx>{`
            .ac-urgency-bar__mobile,
            .ac-urgency-bar__cta-mobile {
              display: none;
            }
            @media (max-width: 640px) {
              .ac-urgency-bar__desktop,
              .ac-urgency-bar__cta-desktop {
                display: none;
              }
              .ac-urgency-bar__mobile,
              .ac-urgency-bar__cta-mobile {
                display: inline;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
