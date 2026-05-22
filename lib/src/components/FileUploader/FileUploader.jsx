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

export const FileUploader = ({
  title = "Upload files",
  description = "Drag and drop or click to browse.",
  files = [],
  onFilesChange = () => {}
}) => {
  const inputRef = useRef(null);
  const handleFiles = (incoming) => {
    const next = Array.from(incoming || []);
    onFilesChange(next);
  };
  return (
    <div
      onClick={() => inputRef.current && inputRef.current.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
      style={{ ...panel, padding: "18px", borderRadius: "18px", border: "1px dashed rgba(255,255,255,0.18)", cursor: "pointer" }}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div style={{ fontWeight: 800, marginBottom: "6px" }}>{title}</div>
      <div style={{ color: "rgba(255,255,255,0.68)", fontSize: "14px" }}>{description}</div>
      <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {files.map((file) => (
          <div key={file.name || file} style={{ padding: "10px 12px", borderRadius: "10px", background: "rgba(255,255,255,0.04)", fontSize: "13px", color: "#fff" }}>
            {file.name || file}
          </div>
        ))}
      </div>
    </div>
  );
};