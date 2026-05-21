function GlowButton({
  text = "Click Me",
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
}) {
  const variants = {
    primary: {
      background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
      color: "#fff",
    },
    dark: {
      background: "#111827",
      color: "#fff",
    },
    light: {
      background: "#f3f4f6",
      color: "#111827",
    },
  };

  const sizes = {
    sm: {
      padding: "10px 16px",
      fontSize: "13px",
    },
    md: {
      padding: "12px 22px",
      fontSize: "14px",
    },
    lg: {
      padding: "14px 28px",
      fontSize: "16px",
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variants[variant],
        ...sizes[size],
        border: "none",
        borderRadius: "14px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        fontWeight: 600,
        transition: "all 0.3s ease",
        boxShadow:
          variant === "primary"
            ? "0 0 24px rgba(124,58,237,0.35)"
            : "none",
      }}
    >
      {text}
    </button>
  );
}

render(
  <div style={{ display: "flex", gap: "16px" }}>
    <GlowButton text="Get Started" />

    <GlowButton
      text="Dark Button"
      variant="dark"
    />

    <GlowButton
      text="Disabled"
      disabled={true}
    />
  </div>
);