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

export const Sidebar = ({
  brand = "Devora UI",
  items = ["Dashboard", "Projects", "Team", "Settings"],
  activeItem = "Dashboard",
  onItemClick = () => {}
}) => {
  const [active, setActive] = useState(activeItem);
  return (
    <aside style={{ ...panel, width: "100%", maxWidth: "280px", padding: "16px", borderRadius: "18px" }}>
      <div style={{ fontWeight: 800, fontSize: "16px", marginBottom: "16px" }}>{brand}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {items.map((item) => (
          <button
            key={item}
            onClick={() => { setActive(item); onItemClick(item); }}
            style={{
              textAlign: "left",
              padding: "10px 12px",
              borderRadius: "10px",
              border: "none",
              background: active === item ? alpha("#6366f1", 0.16) : "transparent",
              color: active === item ? "#fff" : "rgba(255,255,255,0.68)",
              cursor: "pointer"
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </aside>
  );
};