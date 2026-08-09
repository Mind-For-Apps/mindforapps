"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

const CALENDLY_URL = "https://calendly.com/jdranicher/45min";

export function CalendlyWidget({ height = 700 }: { height?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const initWidget = () => {
    const container = containerRef.current;
    if (!container || !window.Calendly) return;
    container.innerHTML = "";
    window.Calendly.initInlineWidget({ url: CALENDLY_URL, parentElement: container });
  };

  useEffect(() => {
    if (window.Calendly) initWidget();
  }, []);

  return (
    <>
      <div ref={containerRef} className="w-full" style={{ minWidth: 320, height }} />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={initWidget}
      />
    </>
  );
}
