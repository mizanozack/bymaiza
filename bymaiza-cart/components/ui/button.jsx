import React from "react";

export function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-khaki text-white font-bold py-2 px-4 rounded disabled:opacity-50"
    >
      {children}
    </button>
  );
}
