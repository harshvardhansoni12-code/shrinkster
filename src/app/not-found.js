import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="bg-gradient-mesh" />
      <main
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div
          className="gradient-text"
          style={{
            fontSize: "8rem",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.05em",
            marginBottom: "1rem",
          }}
        >
          404
        </div>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          Link Not Found
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1rem",
            marginBottom: "2rem",
            maxWidth: "400px",
          }}
        >
          This short URL doesn&apos;t exist or may have expired. Double-check
          the link or create a new one.
        </p>
        <Link
          href="/"
          className="btn-gradient"
          style={{
            padding: "0.875rem 2rem",
            fontSize: "0.9375rem",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          ← Back to Shrinkster
        </Link>
      </main>
    </>
  );
}
