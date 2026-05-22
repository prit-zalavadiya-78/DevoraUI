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

export const Checkbox = ({
  label = "Accept terms",
  defaultChecked = false,
  disabled = false,
  onChange = () => {}
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (value) => {
    setChecked(value);
    onChange(value);
  };

  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        ...panel,
        padding: "14px 16px",
        borderRadius: "14px",
        cursor: disabled ? "not-allowed" : "pointer"
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => handleChange(e.target.checked)}
        style={{
          width: "16px",
          height: "16px",
          accentColor: "#6366f1"
        }}
      />

      <span
        style={{
          fontSize: "14px",
          color: disabled
            ? "rgba(255,255,255,0.4)"
            : "#e2e8f0"
        }}
      >
        {label}
      </span>
    </label>
  );
};