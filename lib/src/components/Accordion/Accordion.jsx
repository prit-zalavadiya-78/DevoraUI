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

export const Accordion = ({
  items = [
    { title: "What is Devora UI?", content: "A premium UI component library." },
    { title: "Is it reusable?", content: "Yes, every component is designed for reuse." }
  ]
}) => {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ ...panel, padding: "16px", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
      {items.map((item, index) => (
        <div key={item.title} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", overflow: "hidden" }}>
          <button
            onClick={() => setOpen(open === index ? -1 : index)}
            style={{
              width: "100%",
              padding: "14px 16px",
              background: "rgba(255,255,255,0.03)",
              color: "#fff",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              fontWeight: 700
            }}
          >
            {item.title}
          </button>
          {open === index && (
            <div style={{ padding: "14px 16px", color: "rgba(255,255,255,0.72)", fontSize: "14px", lineHeight: 1.6 }}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};