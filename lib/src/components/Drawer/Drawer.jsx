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

export const Drawer = ({
  open,
  defaultOpen = true,
  title = "Drawer",
  children = "Drawer content",
  onClose = () => {}
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isControlled = open !== undefined;

  const currentOpen = isControlled
    ? open
    : internalOpen;

  const handleClose = () => {
    if (!isControlled) {
      setInternalOpen(false);
    }

    onClose();
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "260px",
        overflow: "hidden"
      }}
    >
      <div
        onClick={handleClose}
        style={{
          position: "absolute",
          inset: 0,
          background: currentOpen
            ? "rgba(2,6,23,0.72)"
            : "transparent",
          pointerEvents: currentOpen ? "auto" : "none",
          transition: "background 0.2s ease"
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          right: currentOpen ? 0 : "-340px",
          width: "320px",
          height: "100%",
          transition: "right 0.25s ease",
          ...panel,
          borderRadius: "18px 0 0 18px",
          padding: "18px"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px"
          }}
        >
          <strong>{title}</strong>

          <button
            onClick={handleClose}
            style={{
              background: "transparent",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "14px",
            lineHeight: 1.6
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};