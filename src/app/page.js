"use client";

import { useState, useCallback } from "react";

// ===== Icon Components =====
function LinkIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function BarChartIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ===== Feature Data =====
const features = [
  {
    icon: <ZapIcon />,
    title: "Lightning Fast",
    description:
      "Generate short URLs in milliseconds. No delays, no waiting — just instant results.",
  },
  {
    icon: <ShieldIcon />,
    title: "Secure & Reliable",
    description:
      "All links are stored securely with enterprise-grade PostgreSQL. Your data is safe.",
  },
  {
    icon: <BarChartIcon />,
    title: "Analytics Ready",
    description:
      "Built with tracking in mind. Monitor clicks and engagement on your shortened links.",
  },
];

// ===== Stats Data =====
const stats = [
  { value: "10K+", label: "Links Created" },
  { value: "99.9%", label: "Uptime" },
  { value: "<50ms", label: "Response Time" },
];

// ===== Main Component =====
export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setShortUrl("");
      setCopied(false);

      if (!url.trim()) {
        setError("Please enter a URL");
        return;
      }

      setLoading(true);

      try {
        const res = await fetch("/api/create-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: url.trim() }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to create short URL");
          return;
        }

        setShortUrl(data.shortUrl);
      } catch {
        setError("Network error. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shortUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [shortUrl]);

  return (
    <>
      {/* Background gradient mesh */}
      <div className="bg-gradient-mesh" />

      <main className="relative z-10 flex flex-col flex-1">
        {/* ===== Navbar ===== */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 2rem",
            borderBottom: "1px solid var(--border-glass)",
            backdropFilter: "blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "rgba(3, 0, 20, 0.7)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                background:
                  "linear-gradient(135deg, var(--accent-start), var(--accent-end))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LinkIcon />
            </div>
            <span
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
              className="gradient-text"
            >
              Shrinkster
            </span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.875rem",
              textDecoration: "none",
              padding: "0.5rem 1rem",
              borderRadius: "0.625rem",
              border: "1px solid var(--border-glass)",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-glass-hover)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-glass)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            GitHub ↗
          </a>
        </nav>

        {/* ===== Hero Section ===== */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "5rem 1.5rem 3rem",
            textAlign: "center",
            maxWidth: "720px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* Badge */}
          <div
            className="animate-fade-in"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.375rem 1rem",
              borderRadius: "100px",
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              fontSize: "0.8125rem",
              color: "var(--accent-mid)",
              fontWeight: 500,
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--accent-mid)",
                animation: "fade-in 1.5s ease-in-out infinite alternate",
              }}
            />
            Free & Open Source
          </div>

          {/* Title */}
          <h1
            className="animate-slide-up"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              marginBottom: "1.25rem",
            }}
          >
            Make Your Links{" "}
            <span className="gradient-text">Ridiculously Short</span>
          </h1>

          {/* Subtitle */}
          <p
            className="animate-slide-up-delay-1"
            style={{
              fontSize: "1.125rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "540px",
              marginBottom: "2.5rem",
            }}
          >
            Paste any long URL and get a clean, shareable link in seconds. Fast,
            reliable, and completely free.
          </p>

          {/* ===== URL Input Card ===== */}
          <div
            className="glass-card animate-slide-up-delay-2"
            style={{
              width: "100%",
              padding: "2rem",
            }}
          >
            <form
              onSubmit={handleSubmit}
              id="shorten-form"
              style={{
                display: "flex",
                gap: "0.75rem",
                width: "100%",
              }}
            >
              <input
                id="url-input"
                type="text"
                className="url-input"
                placeholder="https://example.com/your-very-long-url..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                autoComplete="url"
                style={{ flex: 1 }}
              />
              <button
                id="shrink-button"
                type="submit"
                className="btn-gradient"
                disabled={loading}
                style={{
                  padding: "1rem 1.75rem",
                  fontSize: "0.9375rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  whiteSpace: "nowrap",
                  minWidth: "140px",
                  justifyContent: "center",
                }}
              >
                {loading ? (
                  <div className="spinner" />
                ) : (
                  <>
                    Shrink It <ArrowRightIcon />
                  </>
                )}
              </button>
            </form>

            {/* Error */}
            {error && (
              <div
                className="error-box"
                id="error-message"
                style={{
                  marginTop: "1rem",
                  padding: "0.875rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                  color: "var(--error)",
                }}
              >
                <span>⚠</span>
                {error}
              </div>
            )}

            {/* Result */}
            {shortUrl && (
              <div
                className="result-box"
                id="result-container"
                style={{
                  marginTop: "1rem",
                  padding: "1rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                    overflow: "hidden",
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--success)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    ✓ Your short URL is ready
                  </span>
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="short-url-link"
                    style={{
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9375rem",
                      fontWeight: 500,
                      textDecoration: "none",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent-mid)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-primary)")
                    }
                  >
                    {shortUrl}
                  </a>
                </div>
                <button
                  id="copy-button"
                  className="copy-btn"
                  onClick={handleCopy}
                  style={{
                    padding: "0.625rem 1rem",
                    gap: "0.375rem",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    fontFamily: "var(--font-sans)",
                    flexShrink: 0,
                  }}
                >
                  {copied ? (
                    <>
                      <CheckIcon />
                      <span style={{ color: "var(--success)" }}>Copied!</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon />
                      Copy
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ===== Divider ===== */}
        <div
          style={{ maxWidth: "720px", margin: "2rem auto", width: "100%", padding: "0 1.5rem" }}
        >
          <div className="shimmer-line" />
        </div>

        {/* ===== Features Section ===== */}
        <section
          style={{
            padding: "3rem 1.5rem 4rem",
            maxWidth: "960px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <h2
            className="animate-slide-up"
            style={{
              textAlign: "center",
              fontSize: "1.75rem",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: "0.75rem",
            }}
          >
            Why <span className="gradient-text">Shrinkster</span>?
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "var(--text-secondary)",
              fontSize: "1rem",
              marginBottom: "3rem",
              maxWidth: "480px",
              margin: "0 auto 3rem",
            }}
          >
            Built for speed and simplicity, with the features you actually need.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`feature-card animate-slide-up-delay-${index + 1}`}
                id={`feature-${feature.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(139, 92, 246, 0.1)",
                    border: "1px solid rgba(139, 92, 246, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-mid)",
                    marginBottom: "1.25rem",
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.875rem",
                    lineHeight: 1.65,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Stats Section ===== */}
        <section
          style={{
            padding: "3rem 1.5rem 5rem",
            maxWidth: "720px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div
            className="glass-card"
            style={{
              padding: "2.5rem 2rem",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
              textAlign: "center",
            }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className="gradient-text stat-glow"
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    marginBottom: "0.25rem",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-muted)",
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Footer ===== */}
        <footer
          style={{
            borderTop: "1px solid var(--border-glass)",
            padding: "2rem 1.5rem",
            textAlign: "center",
            marginTop: "auto",
          }}
        >
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.8125rem",
            }}
          >
            Built with{" "}
            <span style={{ color: "var(--accent-mid)" }}>♥</span> by{" "}
            <span className="gradient-text" style={{ fontWeight: 600 }}>
              Shrinkster
            </span>{" "}
            — Making the web a little shorter.
          </p>
        </footer>
      </main>
    </>
  );
}
