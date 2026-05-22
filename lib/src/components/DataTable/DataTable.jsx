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

export const DataTable = ({
  columns = ["Name", "Role", "Status"],
  rows = [
    ["Asha", "Designer", "Active"],
    ["Rahul", "Engineer", "Invited"],
    ["Mira", "PM", "Active"]
  ]
}) => {
  return (
    <div style={{ ...panel, borderRadius: "18px", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", color: "#fff" }}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col} style={{ textAlign: "left", padding: "14px 16px", fontSize: "13px", color: "rgba(255,255,255,0.6)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: "14px", color: "rgba(255,255,255,0.82)" }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};