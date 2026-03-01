import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoClipper — Encuentra los momentos virales en tu video con IA",
  description:
    "Plugin de Premiere Pro que analiza tus transcripciones y detecta automaticamente los clips con mayor potencial viral. Scoring con 7 factores de viralidad.",
  openGraph: {
    title: "AutoClipper — Momentos virales con IA",
    description:
      "Deja de buscar agujas en un pajar. AutoClipper analiza tu transcripcion y encuentra los clips que van a explotar.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ynt5sos.css" />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
