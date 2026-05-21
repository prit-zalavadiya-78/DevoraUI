import React from "react";

export const LoadingCard = ({ width = "300px", height = "200px", bg = "#1e293b", accent = "#6366f1" }) => {
 const alpha = (hex, op) => {
 const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
 return "rgba(" + r + "," + g + "," + b + "," + op + ")";
 };
 return (
 <div style={{ width: width, height: height, background: bg, borderRadius: "16px", position: "relative", overflow: "hidden" }}>
 <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(90deg, transparent 40%, " + alpha(accent, 0.3) + " 50%, transparent 60%)", animation: "shimmer 1.5s infinite", transform: "translateX(-100%)" }} />
 <style>{
 `@keyframes shimmer {
 0% { transform: translateX(-100%); }
 100% { transform: translateX(100%); }
 }`
 }</style>
 </div>
 );
};