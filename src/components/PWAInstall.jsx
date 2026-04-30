import { useEffect, useState } from "react";

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS Safari (no beforeinstallprompt support)
    const ios = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    const standalone = window.navigator.standalone;
    if (ios && !standalone) setIsIOS(true);

    // Chrome / Edge / Opera install prompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShow(false);
  };

  const handleDismiss = () => setShow(false);

  const bannerStyle = {
    position: "fixed",
    bottom: "1.5rem",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fff",
    border: "1.5px solid #F59E0B",
    borderRadius: "12px",
    padding: "12px 20px",
    zIndex: 9999,
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    maxWidth: "340px",
    width: "calc(100vw - 3rem)",
    fontFamily: "'Inter', sans-serif",
  };

  const dismissBtn = {
    background: "none",
    border: "none",
    color: "#9CA3AF",
    cursor: "pointer",
    fontSize: "18px",
    lineHeight: 1,
    padding: "0 2px",
    marginLeft: "auto",
    flexShrink: 0,
  };

  // iOS manual instruction banner
  if (isIOS) {
    return (
      <div style={bannerStyle}>
        <img src="/icon-192x192.png" alt="" style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "13px", color: "#111827", margin: "0 0 2px", fontWeight: 700 }}>
            Install RoastMyCV
          </p>
          <p style={{ fontSize: "11px", color: "#6B7280", margin: 0, lineHeight: 1.4 }}>
            Tap <strong>Share</strong> → <strong>"Add to Home Screen"</strong>
          </p>
        </div>
        <button onClick={handleDismiss} style={dismissBtn} aria-label="Dismiss">✕</button>
      </div>
    );
  }

  if (!show) return null;

  // Chrome / Edge install banner
  return (
    <div style={bannerStyle}>
      <img src="/logo192.png" alt="" style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "13px", color: "#111827", margin: "0 0 2px", fontWeight: 700 }}>
          Install RoastMyCV
        </p>
        <p style={{ fontSize: "11px", color: "#6B7280", margin: 0 }}>
          Add to your home screen for quick access
        </p>
      </div>
      <button
        onClick={handleInstall}
        style={{
          background: "#F59E0B",
          color: "#111827",
          border: "none",
          borderRadius: "8px",
          padding: "7px 14px",
          fontWeight: 700,
          cursor: "pointer",
          fontSize: "13px",
          flexShrink: 0,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Install
      </button>
      <button onClick={handleDismiss} style={dismissBtn} aria-label="Dismiss">✕</button>
    </div>
  );
}
