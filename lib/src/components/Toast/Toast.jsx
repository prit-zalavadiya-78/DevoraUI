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

export const Toast = ({
  title = "Success",
  message = "Action completed successfully.",
  tone = "success"
}) => {
  const tones = {
    success: { border: "#059669", bg: alpha("#059669", 0.12) },
    error: { border: "#e11d48", bg: alpha("#e11d48", 0.12) },
    info: { border: "#0ea5e9", bg: alpha("#0ea5e9", 0.12) },
    warning: { border: "#f59e0b", bg: alpha("#f59e0b", 0.12) }
  };
  const picked = tones[tone] || tones.success;
  return (
    <div style={{ ...panel, padding: "16px", borderRadius: "16px", border: "1px solid " + picked.border, background: picked.bg, width: "100%", maxWidth: "360px" }}>
      <strong style={{ display: "block", marginBottom: "6px" }}>{title}</strong>
      <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px" }}>{message}</span>
    </div>
  );
};