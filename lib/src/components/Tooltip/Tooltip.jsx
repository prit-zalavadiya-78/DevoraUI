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

export const Tooltip = ({
  label = "Hover me",
  content = "Tooltip content",
  placement = "top"
}) => {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <button style={{ padding: "10px 14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "#fff", cursor: "pointer" }}>
        {label}
      </button>
      {show && (
        <div style={{
          position: "absolute",
          bottom: placement === "top" ? "calc(100% + 10px)" : "auto",
          top: placement === "bottom" ? "calc(100% + 10px)" : "auto",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#020617",
          color: "#fff",
          padding: "8px 10px",
          borderRadius: "10px",
          fontSize: "12px",
          whiteSpace: "nowrap",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)"
        }}>
          {content}
        </div>
      )}
    </div>
  );
};