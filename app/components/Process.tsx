"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef } from "react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const steps = [
  {
    number: "01",
    title: "Pega la transcripcion",
    description:
      "Abre el panel de AutoClipper en Premiere. Pega el texto de tu video. Un campo, un boton. La IA analiza cada segundo de tu contenido y puntua los momentos del 0 al 100 en 7 factores virales.",
  },
  {
    number: "02",
    title: "Revisa y aprueba con el teclado",
    description:
      "Navega entre momentos virales con atajos de teclado. Flecha derecha aprueba, izquierda descarta, Espacio reproduce. Ves el score, el desglose de factores y decides en 2 segundos. Sin tocar el raton.",
  },
  {
    number: "03",
    title: "AutoClipper genera las secuencias",
    description:
      "Cada clip aprobado se convierte en una secuencia independiente dentro de Premiere, con sus puntos de entrada y salida exactos. Tu solo abres cada secuencia, anades los retoques que quieras y exportas con tu workflow habitual.",
  },
];

// ---------------------------------------------------------------------------
// Motion variants
// ---------------------------------------------------------------------------

// Spring used across all interactive elements
const springConfig = { type: "spring" as const, stiffness: 380, damping: 22 };

// Card: slides up from below on entrance, lifts on hover
const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      ...springConfig,
      delay: i * 0.2, // 200 ms stagger between each card
    },
  }),
};

// Step number node: scales in with a slight spring overshoot then settles
const numberVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 320,
      damping: 18,
      delay: i * 0.2 + 0.05, // slightly after the card starts
    },
  }),
};

// Connector: grows from left to right
const connectorVariants = {
  hidden: { scaleX: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // --ac-ease-out-expo
      delay: i * 0.2 + 0.25, // fires after the card and number are visible
    },
  }),
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface StepProps {
  step: (typeof steps)[number];
  index: number;
  isLast: boolean;
  isInView: boolean;
}

function Step({ step, index, isLast, isInView }: StepProps) {
  return (
    <motion.div
      className={`ac-process-step${index === 0 ? " ac-process-step--active" : ""}`}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 380, damping: 22 },
      }}
      style={{ cursor: "default" }}
    >
      {/* Step number node */}
      <motion.div
        className="ac-process-step__number"
        custom={index}
        variants={numberVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover={{
          scale: 1.08,
          transition: { type: "spring", stiffness: 400, damping: 17 },
        }}
        style={{
          // Extra glow pulse handled inline so it coexists with the CSS animation
          // already on .ac-process-step--active .ac-process-step__number
          willChange: "transform, box-shadow",
        }}
      >
        {step.number}
      </motion.div>

      {/* Connector line (not rendered for last step) */}
      {!isLast && (
        <motion.div
          className="ac-process-step__connector"
          custom={index}
          variants={connectorVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            // Override the CSS transform: scaleX(0) default so Framer Motion
            // owns the transform entirely for this element.
            transformOrigin: "left center",
          }}
        />
      )}

      {/* Text content */}
      <motion.div
        className="ac-process-step__content"
        initial={{ opacity: 0 }}
        animate={
          isInView
            ? {
                opacity: 1,
                transition: {
                  duration: 0.4,
                  delay: index * 0.2 + 0.18,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }
            : { opacity: 0 }
        }
      >
        <h3 className="ac-process-step__title">{step.title}</h3>
        <p className="ac-process-step__description">{step.description}</p>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Progress line: scroll-driven gradient that spans all 3 steps
// ---------------------------------------------------------------------------

function ProgressLine({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.4"],
  });

  // Smooth spring-eased scroll progress (prevents jitter on fast scrolls)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });

  // Map progress [0,1] → scaleX [0,1] (grows from left)
  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        // Sits on top of the connector lines at the 23px vertical centre of the
        // number nodes (48px tall → centre = 24px, minus 1px half-height = 23px)
        top: "23px",
        left: "48px",   // starts at the right edge of the first number node
        right: "0",
        height: "2px",
        pointerEvents: "none",
        zIndex: 2,
        // Don't render the container on mobile (connectors are vertical there)
        display: "var(--progress-line-display, flex)",
      }}
    >
      <motion.div
        style={{
          scaleX,
          transformOrigin: "left center",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(to right, #9D8CFF 0%, rgba(157,140,255,0.6) 60%, rgba(157,140,255,0.15) 100%)",
          boxShadow: "0 0 8px rgba(157,140,255,0.35)",
          borderRadius: "2px",
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Process() {
  // Trigger entrance animations when the steps container enters the viewport
  const stepsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(stepsRef, {
    once: true,
    margin: "0px 0px -80px 0px", // trigger slightly before the element is fully visible
  });

  return (
    <section className="ac-section" id="como-funciona" ref={sectionRef}>
      {/*
        Inline style hides the progress line on mobile where the layout is
        vertical and the line geometry would not align.
      */}
      <style>{`
        @media (max-width: 768px) {
          .ac-process-progress-wrapper {
            --progress-line-display: none !important;
          }
        }
      `}</style>

      <div className="ac-section__inner">
        {/* Section heading — kept as-is, using existing CSS reveal system */}
        <div data-reveal>
          <span className="ac-heading--eyebrow">Como funciona</span>
        </div>
        <h2 className="ac-heading ac-heading--2" data-reveal>
          3 pasos. Cero complicaciones.
          <br />
          Del video largo al clip viral en minutos.
        </h2>

        {/* Steps container: position:relative so the progress line can be absolute */}
        <div
          className="ac-process-steps ac-process-steps--horizontal ac-process-progress-wrapper"
          ref={stepsRef}
          style={{ position: "relative" }}
        >
          {/* Scroll-driven progress line (sits above the CSS connector lines) */}
          <ProgressLine sectionRef={sectionRef} />

          {steps.map((step, i) => (
            <Step
              key={step.number}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
