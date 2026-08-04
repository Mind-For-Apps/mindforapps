"use client";

import { useState } from "react";
import Image from "next/image";
import type { Testimonial } from "@/lib/testimonials";

export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const [start, setStart] = useState(0);
  const visible = 3;

  if (items.length === 0) return null;

  const shown = Array.from(
    { length: Math.min(visible, items.length) },
    (_, i) => items[(start + i) % items.length],
  );

  return (
    <div className="flex w-full max-w-300 flex-col gap-8">
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous"
          onClick={() =>
            setStart((s) => (s - 1 + items.length) % items.length)
          }
          className="text-white/70 transition-colors hover:text-white"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => setStart((s) => (s + 1) % items.length)}
          className="text-white/70 transition-colors hover:text-white"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {shown.map((t) => (
          <div
            key={t.id}
            className="flex flex-col gap-4 rounded-2xl bg-white p-6"
          >
            <div className="flex items-center gap-4">
              {t.photoUrl ? (
                <Image
                  src={t.photoUrl}
                  alt={t.name}
                  width={56}
                  height={56}
                  className="size-14 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="size-14 shrink-0 rounded-full bg-brand-surface" />
              )}
              <div>
                <p className="font-semibold text-black">{t.name}</p>
                {t.role && (
                  <p className="text-sm text-black/50">{t.role}</p>
                )}
                {t.company && (
                  <p className="text-sm text-black/50">{t.company}</p>
                )}
              </div>
            </div>
            <p className="text-sm leading-relaxed text-black/80">
              {t.quote}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
