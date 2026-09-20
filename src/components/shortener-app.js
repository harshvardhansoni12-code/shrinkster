"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckIcon,
  CopyIcon,
  LinkIcon,
  SparkleIcon,
} from "./icons";

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
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = shortUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [shortUrl]);

  return (
    <main className="app-shell">
      <div className="paper-grid" aria-hidden="true" />

      <nav className="site-nav" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Shrinkster home">
          <span className="brand-mark">
            <LinkIcon />
          </span>
          <span>Shrinkster</span>
        </Link>
        <div className="nav-actions">
          <span className="nav-status">
            <span /> Ready to shorten
          </span>
          <a className="nav-explore" href="#how-it-works">
            How it works <ArrowRightIcon />
          </a>
        </div>
      </nav>

      <section className="hero-layout">
        <div className="hero-copy">
          <div className="eyebrow">
            <SparkleIcon /> Smart link utility
          </div>
          <h1>
            Meet your new
            <br />
            <em>URL shortcut.</em>
          </h1>
          <p className="hero-description">
            Turn long, unwieldy links into clean shortcuts that are easy to
            share, remember, and trust.
          </p>
          <div className="hero-note">
            <span className="note-line" />
            <span>Free to use. No account required.</span>
          </div>
        </div>

        <div className="shortener-panel" id="shorten">
          <div className="panel-topline">
            <span className="panel-label">Create a shortcut</span>
            <span className="panel-index">01 / 01</span>
          </div>

          <form onSubmit={handleSubmit} id="shorten-form">
            <label className="input-label" htmlFor="url-input">
              Paste your long link
            </label>
            <div className="input-wrap">
              <LinkIcon />
              <input
                id="url-input"
                type="url"
                className="url-input"
                placeholder="https://your-long-link.com/..."
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                autoComplete="url"
                required
              />
            </div>
            <button
              id="shrink-button"
              type="submit"
              className="shorten-button"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner" />
              ) : (
                <>
                  Shorten link <ArrowRightIcon />
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="error-box" id="error-message" role="alert">
              {error}
            </div>
          )}

          {shortUrl && (
            <div className="result-box" id="result-container">
              <div className="result-heading">
                <span className="result-dot" /> Your shortcut is ready
              </div>
              <div className="result-row">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="short-url-link"
                >
                  {shortUrl}
                </a>
                <button
                  id="copy-button"
                  className="copy-btn"
                  onClick={handleCopy}
                  type="button"
                  aria-label="Copy short URL"
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>
          )}

          <div className="panel-footnote">
            <span>↗</span> Your original link stays exactly as it is.
          </div>
        </div>
      </section>

      <section className="trust-strip" id="how-it-works">
        <div>
          <strong>01</strong>
          <span>Paste your link</span>
        </div>
        <div>
          <strong>02</strong>
          <span>We shrink it instantly</span>
        </div>
        <div>
          <strong>03</strong>
          <span>Share it everywhere</span>
        </div>
      </section>

      <footer className="site-footer">
        <span>SHRINKSTER / LINK UTILITY</span>
        <span>Built for the web, one short link at a time.</span>
      </footer>
    </main>
  );
}
