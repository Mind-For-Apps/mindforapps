"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CalendlyWidget } from "./CalendlyWidget";

export function CalendlyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-260">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-10 right-0 text-4xl leading-none text-black transition-opacity hover:opacity-70"
        >
          &times;
        </button>

        <div className="max-h-[90vh] overflow-auto">
          <CalendlyWidget height={900} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
