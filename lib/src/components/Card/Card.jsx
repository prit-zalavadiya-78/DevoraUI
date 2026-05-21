import React, { useState } from "react";

export const Card = ({
  title = "Card Title",
  description = "This is a clean and reusable card component.",
  children,
  width = "320px",
  variant = "default",
}) => {
  const [hovered, setHovered] = useState(false);

  const variants = {
    default: {
      background: "#ffffff",
      border: "1px solid #e4e4e7",
    },
    dark: {
      background: "#18181b",
      border: "1px solid #27272a",
      color: "#ffffff",
    },
    outline: {
      background: "transparent",
      border: "1px solid #d4d4d8",
    },
  };

  const currentVariant = variants[variant];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width,
        padding: "20px",
        borderRadius: "16px",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0px)",
        boxShadow: hovered
          ? "0 10px 30px rgba(0,0,0,0.08)"
          : "0 2px 6px rgba(0,0,0,0.04)",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
        ...currentVariant,
      }}
    >
      <div
        style={{
          fontSize: "18px",
          fontWeight: 600,
          marginBottom: "8px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "14px",
          lineHeight: "1.6",
          opacity: 0.75,
          marginBottom: children ? "16px" : "0px",
        }}
      >
        {description}
      </div>

      {children && <div>{children}</div>}
    </div>
  );
};

// export default Card;