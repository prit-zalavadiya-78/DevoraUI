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

export const RadioGroup = ({
  label = "Choose one",
  options = ["Basic", "Standard", "Premium"],
  defaultValue = "Basic",
  onChange = () => {}
}) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (option) => {
    setSelected(option);
    onChange(option);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        ...panel,
        padding: "16px",
        borderRadius: "16px"
      }}
    >
      <div
        style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "#e2e8f0"
        }}
      >
        {label}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}
      >
        {options.map((option) => (
          <label
            key={option}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#cbd5e1"
            }}
          >
            <input
              type="radio"
              name={label}
              checked={selected === option}
              onChange={() => handleChange(option)}
              style={{
                accentColor: "#6366f1"
              }}
            />

            {option}
          </label>
        ))}
      </div>
    </div>
  );
};