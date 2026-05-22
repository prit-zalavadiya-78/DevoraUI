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

export const Button = ({
  text = "Get Started",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick = () => {}
}) => {
  const presets = {
    sm: "8px 14px",
    md: "11px 18px",
    lg: "14px 24px"
  };
  const styles = {
    primary: { background: "linear-gradient(135deg, #6366f1, #7c3aed)", color: "#fff" },
    secondary: { background: "rgba(255,255,255,0.06)", color: "#fff" },
    ghost: { background: "transparent", color: "#fff" },
    danger: { background: "linear-gradient(135deg, #e11d48, #fb7185)", color: "#fff" }
  };
  const picked = styles[variant] || styles.primary;
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        ...picked,
        padding: presets[size] || presets.md,
        border: "1px solid " + (variant === "ghost" ? "rgba(255,255,255,0.08)" : "transparent"),
        borderRadius: "10px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: 700,
        fontSize: "14px",
        opacity: disabled ? 0.6 : 1,
        transition: "transform 0.2s, opacity 0.2s",
        fontFamily: "inherit"
      }}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};