"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CategoryData } from "@/lib/categories";
import type { TemplateCardData } from "@/lib/templates";
import { TemplateGalleryImage } from "@/components/sections/TemplateGalleryImage";
import { isSvgSrc } from "@/lib/is-svg-src";

export function TemplatesBrowser({
  categories,
  templates,
  limit,
}: {
  categories: CategoryData[];
  templates: TemplateCardData[];
  limit?: number;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = activeId
    ? templates.filter((t) => t.categoryIds.includes(activeId))
    : templates;

  const visible = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className="flex w-full max-w-300 flex-col items-center gap-10 px-2.5">
      <div className="@container grid w-full grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
        {categories.map((category) => {
          const isActive = category.id === activeId;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveId(isActive ? null : category.id)}
              aria-pressed={isActive}
              className={`flex min-h-21.25 flex-row items-center gap-6 rounded-[25px] border-2 p-5 text-left transition-colors @min-[872px]:min-h-42.5 ${
                isActive
                  ? "border-transparent bg-black text-white"
                  : "border-transparent bg-white text-black hover:border-brand-accent"
              }`}
            >
              {category.iconUrl && (
                <Image
                  unoptimized={isSvgSrc(category.iconUrl)}
                  src={category.iconUrl}
                  alt=""
                  width={36}
                  height={36}
                  className={`size-9 shrink-0 object-contain ${isActive ? "invert" : ""}`}
                />
              )}
              <p className="min-w-0 text-lg font-bold tracking-[-0.35px] sm:text-xl">
                {category.title}
              </p>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-white/70">No templates in this category yet.</p>
      ) : (
        <div className="grid w-full grid-cols-1 gap-6 min-[900px]:grid-cols-2 px-5">
          {visible.map((template) => (
            <Link
              key={template.id}
              href={template.shopUrl || template.demoPreviewUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              // className="flex flex-col overflow-hidden rounded-[25px] bg-white"
              className="group flex flex-col overflow-hidden bg-white"
            >
              <TemplateGalleryImage
                images={template.images}
                title={template.title}
              />
              <div className="flex items-center justify-between gap-4 p-6">
                <p className="text-lg font-bold text-black sm:text-xl">
                  {template.title}
                </p>
                <div className="relative size-16 shrink-0">
                  <Image
                    unoptimized
                    src="/images/templates-browser/Group-1.1.svg"
                    alt=""
                    fill
                    sizes="64px"
                    className="object-contain transition-opacity group-hover:opacity-0"
                  />
                  <Image
                    unoptimized
                    src="/images/templates-browser/Group-1.2.svg"
                    alt=""
                    fill
                    sizes="64px"
                    className="object-contain opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {limit && filtered.length > limit && (
        <Link
          href="/templates"
          className="rounded-full border border-white px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
        >
          Show more
        </Link>
      )}
    </div>
  );
}
