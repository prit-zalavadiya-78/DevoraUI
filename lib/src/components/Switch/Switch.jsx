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

export const Switch = ({
  label = "Enable notifications",
  checked,
  defaultChecked = false,
  disabled = false,
  onChange = () => {}
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = checked !== undefined;

  const currentChecked = isControlled
    ? checked
    : internalChecked;

  const handleToggle = () => {
    if (disabled) return;

    const nextValue = !currentChecked;

    if (!isControlled) {
      setInternalChecked(nextValue);
    }

    onChange(nextValue);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      style={{
        ...panel,
        width: "100%",
        padding: "14px 16px",
        borderRadius: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: disabled ? "not-allowed" : "pointer",
        border: "1px solid rgba(255,255,255,0.08)"
      }}
    >
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

      <span
        style={{
          width: "46px",
          height: "26px",
          borderRadius: "999px",
          background: currentChecked
            ? "linear-gradient(135deg, #6366f1, #7c3aed)"
            : "rgba(255,255,255,0.08)",
          position: "relative",
          flexShrink: 0,
          transition: "background 0.2s ease"
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "3px",
            left: currentChecked ? "23px" : "3px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.2s ease"
          }}
        />
      </span>
    </button>
  );
};