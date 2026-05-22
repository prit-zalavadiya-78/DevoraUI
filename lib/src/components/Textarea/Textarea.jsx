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

export const Textarea = ({
  label = "Message",
  placeholder = "Write your message...",
  value = "",
  rows = 5,
  helperText = "Share as much detail as you need.",
  error = "",
  onChange = () => {}
}) => {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", ...panel, padding: "16px", borderRadius: "16px" }}>
      <span style={{ fontSize: "13px", fontWeight: 700, color: "#e2e8f0" }}>{label}</span>
      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          boxSizing: "border-box",
          resize: "vertical",
          minHeight: "120px",
          background: "#020617",
          color: "#fff",
          border: "1px solid " + (error ? "#e11d48" : "rgba(255,255,255,0.08)"),
          outline: "none",
          borderRadius: "12px",
          padding: "12px 14px",
          fontSize: "14px",
          fontFamily: "inherit"
        }}
      />
      <span style={{ fontSize: "12px", color: error ? "#fda4af" : "rgba(255,255,255,0.55)" }}>
        {error || helperText}
      </span>
    </label>
  );
};