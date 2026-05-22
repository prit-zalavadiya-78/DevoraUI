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

export const Card = ({
  title = "Card title",
  description = "Card description goes here.",
  footer = "Footer text",
  accent = "#6366f1"
}) => {
  return (
    <div style={{ ...panel, borderRadius: "18px", padding: "18px", width: "100%", maxWidth: "420px" }}>
      <div style={{ width: "52px", height: "6px", borderRadius: "999px", background: accent, marginBottom: "14px" }} />
      <h3 style={{ margin: "0 0 8px", fontSize: "18px" }}>{title}</h3>
      <p style={{ margin: 0, color: "rgba(255,255,255,0.72)", fontSize: "14px", lineHeight: 1.6 }}>{description}</p>
      <div style={{ marginTop: "18px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>{footer}</div>
    </div>
  );
};