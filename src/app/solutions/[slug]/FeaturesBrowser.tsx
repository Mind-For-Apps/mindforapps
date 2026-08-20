"use client";

import { useState } from "react";
import Image from "next/image";
import type { SolutionFeatureCategory } from "@/lib/solutions";

export function FeaturesBrowser({
  categories,
  featuresImageUrl,
}: {
  categories: SolutionFeatureCategory[];
  featuresImageUrl: string | null;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = categories[activeIndex];

  return (
    <div className="grid w-full max-w-300 grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
      {active && (
        <div className="flex flex-col justify-between gap-6 rounded-2xl bg-white p-6 sm:p-8">
          <div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/icons/dashboard.svg"
                alt=""
                width={24}
                height={24}
                className="size-6 shrink-0"
              />
              <span className="text-xl font-bold text-brand-accent mb-3.5">
                {active.name}
              </span>
            </div>
            <span className="shrink-0 text-sm text-black/50">
              {active.labels.length} features
            </span>
          </div>
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
          </div>
          {featuresImageUrl && (
            <div className="relative aspect-19/15 w-full overflow-hidden rounded-xl bg-brand-surface">
              <Image
                src={featuresImageUrl}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {categories.map((category, i) => (
          <button
            key={category.name}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`flex items-center justify-between rounded-2xl border px-6 py-4 text-left transition-colors hover:border-brand-accent ${
              i === activeIndex
                ? "border-brand-accent bg-white"
                : "border-transparent bg-white/60 hover:bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/images/icons/dashboard.svg"
                alt=""
                width={20}
                height={20}
                className="size-5 shrink-0"
              />
              <span
                className={`font-semibold ${i === activeIndex ? "text-brand-accent" : "text-black"}`}
              >
                {category.name}
              </span>
            </div>
            <span className="shrink-0 text-sm text-black/50">
              {category.labels.length} features
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
