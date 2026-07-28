"use client";

import { useState } from "react";
import Image from "next/image";
import type { SolutionFeatureCategory } from "@/lib/solutions";

export function FeaturesBrowser({
  categories,
}: {
  categories: SolutionFeatureCategory[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = categories[activeIndex];

  return (
    <div className="grid w-full max-w-[1200px] grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr]">
      <div className="flex flex-col gap-3">
        {categories.map((category, i) => (
          <button
            key={category.name}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`flex items-center justify-between rounded-2xl border px-6 py-4 text-left transition-colors ${
              i === activeIndex
                ? "border-brand-accent bg-white"
                : "border-transparent bg-white/60 hover:bg-white"
            }`}
          >
            <span
              className={`font-semibold ${i === activeIndex ? "text-brand-accent" : "text-black"}`}
            >
              {category.name}
            </span>
            <span className="shrink-0 text-sm text-black/50">
              {category.labels.length} features
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {active.labels.map((label) => (
              <span
                key={label.title}
                className="rounded-full px-4 py-2 text-sm font-medium"
                style={{
                  color: label.color ?? undefined,
                  backgroundColor: label.bgColor ?? "#f4f4f4",
                }}
              >
                {label.title}
              </span>
            ))}
          </div>
          {active.images[0] && (
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-brand-surface">
              <Image
                src={active.images[0]}
                alt={active.name}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
