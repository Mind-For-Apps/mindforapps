"use client";

import { useState } from "react";
import Script from "next/script";
import { CalendlyModal } from "./CalendlyModal";

export function BookConsultationButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`cursor-pointer ${className ?? ""}`}
      >
        {children}
      </button>
      <CalendlyModal open={open} onClose={() => setOpen(false)} />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
