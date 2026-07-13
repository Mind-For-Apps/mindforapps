"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CategoryData } from "@/lib/categories";
import type { TemplateCardData } from "@/lib/templates";

export function TemplatesBrowser({
  categories,
  templates,
}: {
  categories: CategoryData[];
  templates: TemplateCardData[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = activeId
    ? templates.filter((t) => t.categoryIds.includes(activeId))
    : templates;

  return (
    <div className="flex w-full max-w-[1200px] flex-col items-center gap-10">
      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((category) => {
          const isActive = category.id === activeId;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveId(isActive ? null : category.id)}
              aria-pressed={isActive}
              className={`flex flex-col items-start gap-6 rounded-[25px] border-2 px-6 py-7 text-left transition-colors sm:px-8 sm:py-9 ${
                isActive
                  ? "border-transparent bg-black text-white"
                  : "border-transparent bg-white text-black hover:border-brand-accent"
              }`}
            >
              {category.iconUrl && (
                <Image
                  src={category.iconUrl}
                  alt=""
                  width={36}
                  height={36}
                  className={`size-9 object-contain ${isActive ? "invert" : ""}`}
                />
              )}
              <p className="text-lg font-bold tracking-[-0.35px] sm:text-xl">
                {category.title}
              </p>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-white/70">No templates in this category yet.</p>
      ) : (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {filtered.map((template) => (
            <Link
              key={template.id}
              href={template.shopUrl || template.demoPreviewUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col overflow-hidden rounded-[25px] bg-white"
            >
              {template.imageUrl && (
                <div className="relative aspect-video w-full bg-brand-surface">
                  <Image
                    src={template.imageUrl}
                    alt={template.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex items-center justify-between gap-4 p-6">
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-bold text-black sm:text-xl">
                    {template.title}
                  </p>
                  {template.descriptionShort && (
                    <p className="line-clamp-2 text-sm text-brand-gray">
                      {template.descriptionShort}
                    </p>
                  )}
                </div>
                {template.price !== null && (
                  <span className="shrink-0 rounded-full bg-brand-surface px-4 py-2 text-sm font-semibold text-black">
                    ${template.price}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
