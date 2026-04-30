export default function OfflinePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#F9FAFB",
        padding: "2rem",
        textAlign: "center",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <img
        src="/offlineimage.png"
        alt="No internet connection"
        style={{ width: "180px", marginBottom: "1.5rem", opacity: 0.85 }}
      />
      <h2
        style={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#111827",
          margin: "0 0 8px",
        }}
      >
        You&apos;re offline
      </h2>
      <p
        style={{
          fontSize: "15px",
          color: "#6B7280",
          maxWidth: "280px",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        Kamu sedang offline nih 😢 Jangan lupa pastikan koneksi internet kamu aktif ya!
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          marginTop: "1.5rem",
          background: "#F59E0B",
          color: "#111827",
          border: "none",
          borderRadius: "10px",
          padding: "10px 24px",
          fontWeight: 700,
          fontSize: "14px",
          cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Try Again
      </button>
    </div>
  );
}
