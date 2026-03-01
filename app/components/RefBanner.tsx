"use client";

import { useRefContext } from "./RefProvider";

export default function RefBanner() {
  const { affiliateName } = useRefContext();

  if (!affiliateName) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "var(--ac-space-2) var(--ac-space-4)",
        background: "var(--ac-cyan-dim)",
        borderBottom: "1px solid var(--ac-cyan-subtle)",
        textAlign: "center",
        fontSize: "var(--ac-text-sm)",
        color: "var(--ac-cyan-bright)",
      }}
    >
      Recomendado por <strong>{affiliateName}</strong>
    </div>
  );
}
