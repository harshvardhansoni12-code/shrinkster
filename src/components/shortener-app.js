"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ParticleField from "./particle-field";
import {
  ArrowRightIcon,
  BarChartIcon,
  CheckIcon,
  CopyIcon,
  LinkIcon,
  ShieldIcon,
  SparkleIcon,
  ZapIcon,
} from "./icons";

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

const stats = [
  { value: "10K+", label: "Links Created" },
  { value: "99.9%", label: "Uptime" },
  { value: "<50ms", label: "Response Time" },
];

function AnimatedStat({ value, label }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="stat-item">
      <div
        className="gradient-text stat-glow"
        style={{
          fontSize: "2rem",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          marginBottom: "0.375rem",
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          opacity: isVisible ? 1 : 0,
          transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "0.8125rem",
          color: "var(--text-muted)",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          transform: isVisible ? "translateY(0)" : "translateY(12px)",
          opacity: isVisible ? 1 : 0,
          transition: "all 0.8s 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((event) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    cardRef.current.style.setProperty("--mouse-x", `${x}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y}%`);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`feature-card animate-slide-up-delay-${index + 1}`}
      id={`feature-${title.toLowerCase().replace(/\s+/g, "-")}`}
      onMouseMove={handleMouseMove}
    >
      <div className="feature-icon">{icon}</div>
      <h3
        style={{
          fontSize: "1.125rem",
          fontWeight: 600,
          marginBottom: "0.5rem",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.875rem",
          lineHeight: 1.7,
        }}
      >
        {description}
      </p>
    </div>
  );
}

export default function ShortenerApp() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setError("");
      setShortUrl("");
      setCopied(false);

      if (!url.trim()) {
        setError("Please enter a URL");
        return;
      }

      setLoading(true);

      try {
        const response = await fetch("/api/create-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: url.trim() }),
        });

        const data = await response.json();

        if (!response.ok) {
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
    [url],
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
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
      <div className="bg-gradient-mesh">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <ParticleField />
      </div>

      <main className="relative z-10 flex flex-col flex-1">
        <nav className="nav-bar">
          <div className="nav-logo">
            <div className="nav-logo-icon">
              <LinkIcon />
            </div>
            <span
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
              className="gradient-text"
            >
              Shrinkster
            </span>
          </div>
        </nav>

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "6rem 1.5rem 3rem",
            textAlign: "center",
            maxWidth: "760px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div className="badge animate-fade-in">
            <span className="badge-dot" />
            <SparkleIcon />
            Free & Open Source
          </div>

          <h1
            className="animate-slide-up"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.045em",
              marginBottom: "1.5rem",
            }}
          >
            Make Your Links{" "}
            <span className="gradient-text">Ridiculously Short</span>
          </h1>

          <p
            className="animate-slide-up-delay-1"
            style={{
              fontSize: "1.15rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              maxWidth: "560px",
              marginBottom: "3rem",
            }}
          >
            Paste any long URL and get a clean, shareable link in seconds. Fast,
            reliable, and completely free.
          </p>

          <div
            className="glass-card hero-card animate-slide-up-delay-2"
            style={{ width: "100%", padding: "2rem" }}
          >
            <form
              onSubmit={handleSubmit}
              id="shorten-form"
              className="hero-form"
              style={{ display: "flex", gap: "0.75rem", width: "100%" }}
            >
              <input
                id="url-input"
                type="text"
                className="url-input"
                placeholder="https://example.com/your-very-long-url..."
                value={url}
                onChange={(event) => setUrl(event.target.value)}
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
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.color = "var(--accent-end)";
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.color = "var(--text-primary)";
                    }}
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

        <div
          style={{
            maxWidth: "760px",
            margin: "2.5rem auto",
            width: "100%",
            padding: "0 1.5rem",
          }}
        >
          <div className="shimmer-line" />
        </div>

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
              fontSize: "1.85rem",
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
              lineHeight: 1.7,
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
              gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </section>

        <section
          style={{
            padding: "3rem 1.5rem 5rem",
            maxWidth: "720px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div className="glass-card" style={{ padding: "2.5rem 2rem" }}>
            <div className="stats-grid">
              {stats.map((stat) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
        </section>

        <footer
          style={{
            borderTop: "1px solid var(--border-glass)",
            padding: "2rem 1.5rem",
            textAlign: "center",
            marginTop: "auto",
          }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>
            Built with <span style={{ color: "var(--accent-end)" }}>♥</span> by{" "}
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
