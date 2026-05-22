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

export const Pagination = ({
  currentPage,
  defaultPage = 1,
  totalPages = 5,
  onPageChange = () => {}
}) => {
  const [internalPage, setInternalPage] = useState(defaultPage);

  const isControlled = currentPage !== undefined;

  const activePage = isControlled
    ? currentPage
    : internalPage;

  const pages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  const goToPage = (page) => {
    const nextPage = Math.max(
      1,
      Math.min(totalPages, page)
    );

    if (!isControlled) {
      setInternalPage(nextPage);
    }

    onPageChange(nextPage);
  };

  return (
    <div
      style={{
        ...panel,
        padding: "14px",
        borderRadius: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        flexWrap: "wrap"
      }}
    >
      <button
        onClick={() => goToPage(activePage - 1)}
        disabled={activePage === 1}
        style={{
          padding: "8px 12px",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "transparent",
          color: "#fff",
          opacity: activePage === 1 ? 0.5 : 1,
          cursor:
            activePage === 1
              ? "not-allowed"
              : "pointer"
        }}
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            background:
              page === activePage
                ? "linear-gradient(135deg,#6366f1,#7c3aed)"
                : "rgba(255,255,255,0.04)",
            color: "#fff"
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(activePage + 1)}
        disabled={activePage === totalPages}
        style={{
          padding: "8px 12px",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "transparent",
          color: "#fff",
          opacity:
            activePage === totalPages ? 0.5 : 1,
          cursor:
            activePage === totalPages
              ? "not-allowed"
              : "pointer"
        }}
      >
        Next
      </button>
    </div>
  );
};