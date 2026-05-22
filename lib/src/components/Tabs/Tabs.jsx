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

export const Tabs = ({
  tabs = [
    { label: "Overview", content: "Overview content" },
    { label: "Activity", content: "Activity content" },
    { label: "Settings", content: "Settings content" }
  ],
  defaultIndex = 0
}) => {
  const [active, setActive] = useState(defaultIndex);
  return (
    <div style={{ ...panel, padding: "16px", borderRadius: "16px" }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActive(index)}
            style={{
              padding: "9px 14px",
              borderRadius: "10px",
              border: "1px solid " + (active === index ? "#6366f1" : "rgba(255,255,255,0.08)"),
              background: active === index ? alpha("#6366f1", 0.15) : "rgba(255,255,255,0.03)",
              color: active === index ? "#fff" : "rgba(255,255,255,0.7)",
              cursor: "pointer",
              fontWeight: 700
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", lineHeight: 1.6 }}>
        {tabs[active] ? tabs[active].content : ""}
      </div>
    </div>
  );
};