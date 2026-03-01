"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    // Observe all reveal targets: class-based and data-attribute-based
    const selectors = [
      ".ac-reveal",
      "[data-reveal]",
      "[data-reveal-group]",
    ];

    document.querySelectorAll(selectors.join(", ")).forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
