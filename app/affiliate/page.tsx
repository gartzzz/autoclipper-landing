"use client";

import { useState } from "react";

interface AffiliateStats {
  referral_code: string;
  affiliate_name: string;
  total_referrals: number;
  total_conversions: number;
  total_earnings_cents: number;
  pending_cents: number;
  paid_cents: number;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function AffiliateDashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const authRes = await fetch(
        `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const authData = await authRes.json();
      if (!authRes.ok) {
        setError(authData.error_description || "Credenciales incorrectas");
        return;
      }

      const statsRes = await fetch(
        `${SUPABASE_URL}/functions/v1/affiliate-stats`,
        {
          headers: {
            Authorization: `Bearer ${authData.access_token}`,
            apikey: SUPABASE_ANON_KEY,
          },
        }
      );

      const statsData = await statsRes.json();
      if (!statsRes.ok) {
        setError("No eres afiliado o no tienes estadisticas disponibles");
        return;
      }

      setStats(statsData);
    } catch {
      setError("Error de conexion");
    } finally {
      setLoading(false);
    }
  }

  function copyLink() {
    if (!stats) return;
    const link = `https://autoclipper.tv/?ref=${stats.referral_code}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Login form
  if (!stats) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--ac-space-6)",
          background: "var(--ac-bg-primary)",
        }}
      >
        <div className="ac-card" style={{ maxWidth: 400, width: "100%" }}>
          <div className="ac-card__body--lg">
            <h1
              className="ac-heading ac-heading--h3"
              style={{ marginBottom: "var(--ac-space-2)" }}
            >
              Panel de Afiliado
            </h1>
            <p
              className="ac-text"
              style={{ marginBottom: "var(--ac-space-6)" }}
            >
              Inicia sesion con tu cuenta de afiliado
            </p>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                style={{
                  width: "100%",
                  padding: "var(--ac-space-3)",
                  background: "var(--ac-bg-secondary)",
                  border: "1px solid var(--ac-border-subtle)",
                  borderRadius: "var(--ac-radius-md)",
                  color: "var(--ac-text-primary)",
                  fontSize: "var(--ac-text-sm)",
                }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contrasena"
                required
                style={{
                  width: "100%",
                  padding: "var(--ac-space-3)",
                  marginTop: "var(--ac-space-3)",
                  background: "var(--ac-bg-secondary)",
                  border: "1px solid var(--ac-border-subtle)",
                  borderRadius: "var(--ac-radius-md)",
                  color: "var(--ac-text-primary)",
                  fontSize: "var(--ac-text-sm)",
                }}
              />

              {error && (
                <p
                  style={{
                    marginTop: "var(--ac-space-3)",
                    color: "var(--ac-red)",
                    fontSize: "var(--ac-text-sm)",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="ac-button ac-button--primary"
                disabled={loading}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: "var(--ac-space-4)",
                }}
              >
                {loading ? "Cargando..." : "Entrar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Stats dashboard
  const refLink = `https://autoclipper.tv/?ref=${stats.referral_code}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "var(--ac-space-8) var(--ac-space-6)",
        background: "var(--ac-bg-primary)",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1
          className="ac-heading ac-heading--h2"
          style={{ marginBottom: "var(--ac-space-2)" }}
        >
          Hola, {stats.affiliate_name}
        </h1>
        <p
          className="ac-text"
          style={{ marginBottom: "var(--ac-space-8)" }}
        >
          Panel de afiliado de AutoClipper
        </p>

        {/* Referral link */}
        <div
          className="ac-card"
          style={{ marginBottom: "var(--ac-space-6)" }}
        >
          <div className="ac-card__body--lg">
            <p
              className="ac-text ac-text--small"
              style={{
                marginBottom: "var(--ac-space-2)",
                color: "var(--ac-text-secondary)",
              }}
            >
              Tu link de referido
            </p>
            <div
              style={{
                display: "flex",
                gap: "var(--ac-space-3)",
                alignItems: "center",
              }}
            >
              <code
                className="ac-text--mono"
                style={{
                  flex: 1,
                  padding: "var(--ac-space-3)",
                  background: "var(--ac-bg-secondary)",
                  borderRadius: "var(--ac-radius-md)",
                  border: "1px solid var(--ac-border-subtle)",
                  fontSize: "var(--ac-text-sm)",
                  color: "var(--ac-cyan)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {refLink}
              </code>
              <button
                className="ac-button ac-button--secondary ac-button--sm"
                onClick={copyLink}
              >
                {copied ? "Copiado" : "Copiar"}
              </button>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div
          className="ac-feature-grid ac-feature-grid--2col"
          style={{ gap: "var(--ac-space-4)" }}
        >
          <div className="ac-card">
            <div className="ac-card__body--lg">
              <p
                className="ac-text ac-text--small"
                style={{ color: "var(--ac-text-secondary)" }}
              >
                Referidos totales
              </p>
              <p
                className="ac-text--mono"
                style={{
                  fontSize: "var(--ac-text-3xl)",
                  fontWeight: "var(--ac-weight-bold)",
                  color: "var(--ac-text-primary)",
                  marginTop: "var(--ac-space-2)",
                }}
              >
                {stats.total_referrals}
              </p>
            </div>
          </div>

          <div className="ac-card">
            <div className="ac-card__body--lg">
              <p
                className="ac-text ac-text--small"
                style={{ color: "var(--ac-text-secondary)" }}
              >
                Conversiones a Pro
              </p>
              <p
                className="ac-text--mono"
                style={{
                  fontSize: "var(--ac-text-3xl)",
                  fontWeight: "var(--ac-weight-bold)",
                  color: "var(--ac-cyan)",
                  marginTop: "var(--ac-space-2)",
                }}
              >
                {stats.total_conversions}
              </p>
            </div>
          </div>

          <div className="ac-card">
            <div className="ac-card__body--lg">
              <p
                className="ac-text ac-text--small"
                style={{ color: "var(--ac-text-secondary)" }}
              >
                Ganancias pendientes
              </p>
              <p
                className="ac-text--mono"
                style={{
                  fontSize: "var(--ac-text-3xl)",
                  fontWeight: "var(--ac-weight-bold)",
                  color: "var(--ac-text-primary)",
                  marginTop: "var(--ac-space-2)",
                }}
              >
                {formatCents(stats.pending_cents)}
              </p>
            </div>
          </div>

          <div className="ac-card">
            <div className="ac-card__body--lg">
              <p
                className="ac-text ac-text--small"
                style={{ color: "var(--ac-text-secondary)" }}
              >
                Total cobrado
              </p>
              <p
                className="ac-text--mono"
                style={{
                  fontSize: "var(--ac-text-3xl)",
                  fontWeight: "var(--ac-weight-bold)",
                  color: "var(--ac-green)",
                  marginTop: "var(--ac-space-2)",
                }}
              >
                {formatCents(stats.paid_cents)}
              </p>
            </div>
          </div>
        </div>

        <p
          className="ac-text ac-text--small"
          style={{
            marginTop: "var(--ac-space-6)",
            color: "var(--ac-text-tertiary)",
            textAlign: "center",
          }}
        >
          Comision del 20% por cada venta Pro referida. Los pagos se procesan
          manualmente.
        </p>
      </div>
    </div>
  );
}
