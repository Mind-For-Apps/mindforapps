"use client";

import Script from "next/script";

export function CalendlyWidget() {
  return (
    <>
      <div
        className="calendly-inline-widget w-full"
        data-url="https://calendly.com/jdranicher/45min"
        style={{ minWidth: 320, height: 700 }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
