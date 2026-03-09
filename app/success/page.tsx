"use client";

import { useEffect, useState } from "react";

const DOWNLOAD_URL = "/AutoClipper.zip";

export default function SuccessPage() {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = DOWNLOAD_URL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--ac-space-6)",
      }}
    >
      <div
        style={{
          maxWidth: "560px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            margin: "0 auto var(--ac-space-6)",
            borderRadius: "50%",
            background: "rgba(52, 199, 89, 0.12)",
            border: "2px solid rgba(52, 199, 89, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
          }}
        >
          &#10003;
        </div>

        <h1
          className="ac-heading ac-heading--2"
          style={{ marginBottom: "var(--ac-space-3)" }}
        >
          Pago confirmado
        </h1>

        <p
          className="ac-text ac-text--lead"
          style={{ marginBottom: "var(--ac-space-8)" }}
        >
          AutoClipper es tuyo. La descarga empieza en{" "}
          <strong style={{ color: "var(--ac-cyan)" }}>
            {countdown > 0 ? `${countdown}s` : "..."}
          </strong>
        </p>

        <a
          href={DOWNLOAD_URL}
          className="ac-button ac-button--primary ac-button--lg"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5em",
          }}
        >
          Descargar AutoClipper
          <span aria-hidden="true">&darr;</span>
        </a>

        <div
          className="ac-card"
          style={{
            marginTop: "var(--ac-space-8)",
            textAlign: "left",
          }}
        >
          <div className="ac-card__body--lg">
            <p
              className="ac-text"
              style={{
                fontWeight: "var(--ac-weight-semibold)",
                marginBottom: "var(--ac-space-3)",
              }}
            >
              Instalacion rapida:
            </p>
            <ol
              style={{
                paddingLeft: "1.2em",
                display: "flex",
                flexDirection: "column",
                gap: "var(--ac-space-2)",
              }}
            >
              <li className="ac-text ac-text--small">
                Descomprime <code>AutoClipper.zip</code>
              </li>
              <li className="ac-text ac-text--small">
                <strong>Mac:</strong> doble click en{" "}
                <code>install-mac.command</code>
              </li>
              <li className="ac-text ac-text--small">
                <strong>Windows:</strong> doble click en{" "}
                <code>install-windows.bat</code>
              </li>
              <li className="ac-text ac-text--small">
                Abre Premiere Pro &rarr; <em>Window &gt; Extensions &gt; AutoClipper</em>
              </li>
            </ol>
          </div>
        </div>

        <p
          className="ac-text ac-text--small"
          style={{
            marginTop: "var(--ac-space-6)",
            opacity: 0.6,
          }}
        >
          Problemas? Escribe a soporte@autoclipper.com
        </p>
      </div>
    </main>
  );
}
