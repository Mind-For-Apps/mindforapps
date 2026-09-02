"use client";

import { useState } from "react";
import type { Faq } from "@/lib/faqs";

export function FAQAccordion({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <div className="flex w-full max-w-250 flex-col gap-4">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.id} className="rounded-2xl bg-white px-6 py-4">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 text-left text-lg"
            >
              <span className="font-medium text-black">{item.question}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
              >
                <path
                  d="m6 9 6 6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isOpen && (
              <p className="mt-3 border-l-4 border-brand-accent pl-4 text-lg leading-relaxed text-black/70">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
