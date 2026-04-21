import type { Metadata } from "next";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Legal — AutoClipper",
  description:
    "Terminos, privacidad y politica de reembolso de AutoClipper.",
};

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav
        className="ac-nav ac-nav--scrolled"
        aria-label="Navegacion"
        style={{ position: "sticky" }}
      >
        <a href="/" className="ac-nav__logo">
          <img
            src="/logo.png"
            alt=""
            className="ac-nav__logo-mark"
            aria-hidden="true"
          />
          AutoClipper
        </a>
      </nav>

      <main
        id="main"
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding:
            "var(--ac-space-12) var(--ac-space-5) var(--ac-space-16)",
          lineHeight: "var(--ac-leading-relaxed)",
        }}
      >
        {children}
      </main>

      <Footer />
    </>
  );
}
