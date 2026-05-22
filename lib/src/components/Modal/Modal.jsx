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

export const Modal = ({
  open,
  defaultOpen = true,
  title = "Modal title",
  description = "This is a modal description.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm = () => {},
  onCancel = () => {}
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

    onCancel();
  };

  const handleConfirm = () => {
    onConfirm();

    if (!isControlled) {
      setInternalOpen(false);
    }
  };

  if (!currentOpen) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "220px"
      }}
    >
      <div
        onClick={handleClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(2,6,23,0.72)",
          borderRadius: "16px"
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "420px",
          margin: "40px auto",
          ...panel,
          borderRadius: "18px",
          padding: "20px"
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "18px"
          }}
        >
          {title}
        </h3>

        <p
          style={{
            color: "rgba(255,255,255,0.68)",
            fontSize: "14px",
            lineHeight: 1.6
          }}
        >
          {description}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "18px"
          }}
        >
          <button
            onClick={handleClose}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "transparent",
              color: "#fff"
            }}
          >
            {cancelText}
          </button>

          <button
            onClick={handleConfirm}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "none",
              background:
                "linear-gradient(135deg, #6366f1, #7c3aed)",
              color: "#fff"
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};