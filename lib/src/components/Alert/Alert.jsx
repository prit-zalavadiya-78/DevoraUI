import React from "react";

export const Alert = ({ title = "Important Update", message = "We've updated our privacy policy. Please review the changes.", type = "info", accent = "#6366f1", bg = "#0f172a", onClose = () => {} }) => {
 const alpha = (hex, op) => {
 const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
 return "rgba(" + r + "," + g + "," + b + "," + op + ")";
 };
 const colors = {
 info: "#6366f1",
 success: "#059669",
 warning: "#e11d48",
 error: "#ef4444"
 };
 const accentColor = colors[type] || accent;
 return (
 <div style={{
 background: bg,
 border: "1px solid " + alpha(accentColor, 0.15),
 borderRadius: "16px",
 padding: "16px",
 width: "400px",
 fontFamily: "system-ui, sans-serif",
 boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
 position: "relative"
 }}>
 <div style={{
 display: "flex",
 alignItems: "center",
 gap: "12px",
 marginBottom: "12px"
 }}>
 <div style={{
 width: "28px",
 height: "28px",
 borderRadius: "50%",
 background: alpha(accentColor, 0.1),
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 flexShrink: 0
 }}>
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><circle cx="12" cy="12" r="3" /></svg>
 </div>
 <h3 style={{
 fontSize: "15px",
 fontWeight: "700",
 color: "#fff",
 margin: 0
 }}>{title}</h3>
 </div>
 <p style={{
 fontSize: "13px",
 color: "rgba(255,255,255,0.65)",
 lineHeight: 1.5,
 margin: 0
 }}>{message}</p>
 <button
 onClick={onClose}
 style={{
 position: "absolute",
 top: "12px",
 right: "12px",
 background: "transparent",
 border: "none",
 cursor: "pointer",
 padding: "4px",
 borderRadius: "8px",
 color: "rgba(255,255,255,0.4)",
 transition: "color 0.2s"
 }}
 >
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
 </button>
 </div>
 );
};