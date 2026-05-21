import React, { useState } from "react";

export const Button = ({
  children = "Button",
  variant = "default",
  size = "md",
  disabled = false,
  onClick = () => {},
}) => {
  const [hovered, setHovered] = useState(false);

  const variants = {
    default: {
      background: hovered ? "#111827" : "#18181b",
      color: "#ffffff",
      border: "1px solid #27272a",
    },
    outline: {
      background: hovered ? "#f4f4f5" : "transparent",
      color: "#18181b",
      border: "1px solid #d4d4d8",
    },
    ghost: {
      background: hovered ? "#f4f4f5" : "transparent",
      color: "#18181b",
      border: "1px solid transparent",
    },
    destructive: {
      background: hovered ? "#b91c1c" : "#dc2626",
      color: "#ffffff",
      border: "1px solid #dc2626",
    },
  };

  const sizes = {
    sm: {
      padding: "8px 14px",
      fontSize: "13px",
    },
    md: {
      padding: "10px 18px",
      fontSize: "14px",
    },
    lg: {
      padding: "12px 24px",
      fontSize: "15px",
    },
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...currentVariant,
        ...currentSize,
        borderRadius: "10px",
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        outline: "none",
        transition: "all 0.2s ease",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
        boxShadow:
          variant === "default"
            ? "0 1px 2px rgba(0,0,0,0.15)"
            : "none",
      }}
    >
      {children}
    </button>
  );
};

// export default Button;