"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { PluginCardData, PluginCategory } from "@/lib/plugins";

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

function formatPrice(monthly: number | null, oneTime: number | null) {
  if (oneTime !== null && monthly !== null)
    return `$${oneTime} once or $${monthly}/mo`;
  if (oneTime !== null) return `$${oneTime} once`;
  if (monthly !== null) return `$${monthly}/mo`;
  return null;
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-brand-accent bg-brand-accent text-white"
          : "border-black/15 bg-white text-black hover:border-black/40"
      }`}
    >
      {label}
    </button>
  );
}

function PluginCard({ plugin }: { plugin: PluginCardData }) {
  const [expanded, setExpanded] = useState(false);
  const price = formatPrice(plugin.priceMonthly, plugin.priceOneTime);

  return (
    <a
      href={plugin.demoUrl ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col gap-4 rounded-[25px] bg-white p-6 transition-shadow ${
        plugin.demoUrl ? "hover:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)]" : "cursor-default"
      }`}
      onClick={(e) => {
        if (!plugin.demoUrl) e.preventDefault();
      }}
    >
      <div className="flex items-center gap-4">
        {plugin.logoUrl ? (
          <Image
            src={plugin.logoUrl}
            alt={plugin.name}
            width={56}
            height={56}
            className="size-14 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="size-14 shrink-0 rounded-full bg-brand-surface" />
        )}
        <p className="text-lg font-bold text-black sm:text-xl">{plugin.name}</p>
      </div>

      {plugin.shortDescription && (
        <p className={`text-sm text-brand-gray ${expanded ? "" : "line-clamp-2"}`}>
          {plugin.shortDescription}{" "}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setExpanded((s) => !s);
            }}
            className="font-medium text-brand-accent hover:underline"
          >
            {expanded ? "view less" : "view more"}
          </button>
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-4 pt-2">
        {price && (
          <span className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">
            {price}
          </span>
        )}
        {plugin.demoUrl && (
          <span className="ml-auto flex items-center gap-1 text-sm font-medium text-black">
            Demo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>
    </a>
  );
}

export function PluginsBrowser({
  categories,
  plugins,
}: {
  categories: PluginCategory[];
  plugins: PluginCardData[];
}) {
  const [showFilters, setShowFilters] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);

  function reset() {
    setCategoryIds([]);
  }

  const activeFilterCount = categoryIds.length;

  const filtered = useMemo(() => {
    if (categoryIds.length === 0) return plugins;
    return plugins.filter((p) =>
      categoryIds.some((id) => p.categoryIds.includes(id)),
    );
  }, [plugins, categoryIds]);

  return (
    <div className="mx-auto flex w-full max-w-300 flex-col gap-8">
      <div className="flex justify-end lg:hidden">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen((s) => !s)}
          aria-pressed={mobileFiltersOpen}
          className="relative flex shrink-0 items-center justify-center rounded-full border border-black/15 bg-white p-3"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
          </svg>
          {activeFilterCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-black text-[11px] font-semibold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div
        className={`grid grid-cols-1 gap-8 ${showFilters ? "lg:grid-cols-[280px_1fr]" : ""}`}
      >
        {showFilters && (
          <aside
            className={`${mobileFiltersOpen ? "flex" : "hidden"} flex-col gap-6 rounded-[25px] bg-[#e9e9e9] p-6 lg:flex lg:self-start`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-black">Filters</p>
                {activeFilterCount > 0 && (
                  <span className="flex size-6 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm font-medium">
                <button type="button" onClick={reset} className="text-black/60 hover:text-black">
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowFilters(false);
                    setMobileFiltersOpen(false);
                  }}
                  className="hidden text-black/60 hover:text-black lg:inline"
                >
                  Hide
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-black/10 pt-4">
              <p className="text-sm font-semibold text-black">Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <FilterPill
                    key={c.id}
                    label={c.title}
                    active={categoryIds.includes(c.id)}
                    onClick={() => setCategoryIds((prev) => toggle(prev, c.id))}
                  />
                ))}
              </div>
            </div>
          </aside>
        )}

        <div className="flex flex-col gap-6">
          {!showFilters && (
            <button
              type="button"
              onClick={() => setShowFilters(true)}
              className="hidden self-start rounded-full border border-black/15 px-5 py-2 text-sm font-medium text-black hover:border-black/40 lg:inline-flex"
            >
              Show filters
            </button>
          )}

          {filtered.length === 0 ? (
            <p className="text-black/60">No plugins match these filters.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 min-[900px]:grid-cols-2">
              {filtered.map((plugin) => (
                <PluginCard key={plugin.id} plugin={plugin} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
