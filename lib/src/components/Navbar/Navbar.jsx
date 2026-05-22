import React, { useEffect, useMemo, useRef, useState } from "react";

const alpha = (hex, op) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return "rgba(" + r + "," + g + "," + b + "," + op + ")";
};

const panel = {
  background: "#0f172a",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
  color: "#fff",
  fontFamily: "system-ui, -apple-system, sans-serif"
};

export const Navbar = ({
  logo = "Devora UI",
  links = ["Home", "Features", "Pricing", "Docs"],
  ctaText = "Get Started",
  onLinkClick = () => {},
  onCtaClick = () => {}
}) => {
  const [active, setActive] = useState(links[0] || "Home");
  return (
    <nav style={{ ...panel, borderRadius: "16px", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
      <div style={{ fontWeight: 800, letterSpacing: "0.2px" }}>{logo}</div>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {links.map((link) => (
          <button
            key={link}
            onClick={() => { setActive(link); onLinkClick(link); }}
            style={{
              padding: "8px 12px",
              borderRadius: "10px",
              border: "none",
              background: active === link ? alpha("#6366f1", 0.18) : "transparent",
              color: active === link ? "#fff" : "rgba(255,255,255,0.65)",
              cursor: "pointer"
            }}
          >
            {link}
          </button>
        ))}
      </div>
      <button onClick={onCtaClick} style={{ padding: "9px 14px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #6366f1, #7c3aed)", color: "#fff", fontWeight: 700 }}>
        {ctaText}
      </button>
    </nav>
  );
};