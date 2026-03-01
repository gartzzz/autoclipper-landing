"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`ac-nav${scrolled ? " ac-nav--scrolled" : ""}`} aria-label="Navegacion principal">
      <a href="#" className="ac-nav__logo">
        <span className="ac-nav__logo-mark" aria-hidden="true" />
        AutoClipper
      </a>
      <ul className="ac-nav__links">
        <li>
          <a href="#como-funciona" className="ac-nav__link">
            Como funciona
          </a>
        </li>
        <li>
          <a href="#features" className="ac-nav__link">
            Features
          </a>
        </li>
        <li>
          <a href="#precios" className="ac-nav__link">
            Precios
          </a>
        </li>
        <li>
          <a
            href="https://github.com/gartzzz/autoclipper/releases/latest/download/AutoClipper.zip"
            className="ac-button ac-button--sm ac-button--primary"
          >
            Descargar
          </a>
        </li>
      </ul>
    </nav>
  );
}
