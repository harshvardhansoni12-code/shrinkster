"use client";

import { useState, useCallback, useEffect, useRef } from "react";

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

function SparkleIcon() {
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
      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
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

// ===== Particle Background =====
function ParticleField() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Seeded pseudo-random to avoid hydration mismatch
    const generated = Array.from({ length: 30 }, (_, i) => {
      const seed = (i + 1) * 137.508;
      const r1 = ((Math.sin(seed) * 10000) % 1 + 1) % 1;
      const r2 = ((Math.sin(seed * 2) * 10000) % 1 + 1) % 1;
      const r3 = ((Math.sin(seed * 3) * 10000) % 1 + 1) % 1;
      const r4 = ((Math.sin(seed * 4) * 10000) % 1 + 1) % 1;
      return {
        id: i,
        left: `${r1 * 100}%`,
        delay: `${r2 * 15}s`,
        duration: `${12 + r3 * 18}s`,
        size: r4 > 0.7 ? 3 : 2,
        opacity: 0.3 + r4 * 0.4,
      };
    });
    setParticles(generated);
  }, []);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: "-5%",
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </>
  );
}

// ===== Animated Counter =====
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
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
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

// ===== Feature Card with mouse tracking =====
function FeatureCard({ icon, title, description, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
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
      {/* ===== Animated Background ===== */}
      <div className="bg-gradient-mesh">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <ParticleField />
      </div>

      <main className="relative z-10 flex flex-col flex-1">
        {/* ===== Navbar ===== */}
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
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            <span style={{ position: "relative", zIndex: 1 }}>GitHub ↗</span>
          </a>
        </nav>

        {/* ===== Hero Section ===== */}
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
          {/* Badge */}
          <div className="badge animate-fade-in">
            <span className="badge-dot" />
            <SparkleIcon />
            Free & Open Source
          </div>

          {/* Title */}
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

          {/* Subtitle */}
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

          {/* ===== URL Input Card ===== */}
          <div
            className="glass-card hero-card animate-slide-up-delay-2"
            style={{
              width: "100%",
              padding: "2rem",
            }}
          >
            <form
              onSubmit={handleSubmit}
              id="shorten-form"
              className="hero-form"
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
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent-end)")
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
          style={{
            maxWidth: "760px",
            margin: "2.5rem auto",
            width: "100%",
            padding: "0 1.5rem",
          }}
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
            }}
          >
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
            <span style={{ color: "var(--accent-end)" }}>♥</span> by{" "}
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
