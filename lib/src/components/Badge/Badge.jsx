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

export const Badge = ({
  text = "New",
  tone = "primary"
}) => {
  const tones = {
    primary: "rgba(99,102,241,0.16)",
    success: "rgba(5,150,105,0.16)",
    danger: "rgba(225,29,72,0.16)",
    warning: "rgba(245,158,11,0.16)"
  };
  const bg = tones[tone] || tones.primary;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "6px 10px", borderRadius: "999px", background: bg, border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: "12px", fontWeight: 700 }}>
      {text}
    </span>
  );
};