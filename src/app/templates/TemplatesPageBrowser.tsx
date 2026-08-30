"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CategoryData } from "@/lib/categories";
import type { FeatureTag, TemplateCardData } from "@/lib/templates";
import { TemplateGalleryImage } from "@/components/sections/TemplateGalleryImage";

const PLATFORM_TYPES = [
  "Marketplace",
  "Booking System",
  "Directory",
  "Membership Platform",
  "SaaS Platform",
  "CRM-Based",
  "Internal Tool",
];

const USER_ROLES = [
  "Multi-Role System",
  "Admin + Users",
  "Single Role",
  "Two-Sided Marketplace",
];

const PRICE_RANGES = [
  { label: "Under $100", min: 0, max: 99 },
  { label: "$100–$200", min: 100, max: 200 },
  { label: "$200–$300", min: 200, max: 300 },
  { label: "$300+", min: 300, max: Infinity },
];

const SORT_OPTIONS = ["Most popular", "Newest", "Title A-Z", "Title Z-A"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
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
      className={`rounded-full border px-2.75 py-1 text-sm font-medium transition-colors ${
        active
          ? "border-brand-accent bg-brand-accent text-white"
          : "border-black/15 bg-white text-black hover:border-black/40"
      }`}
    >
      {label}
    </button>
  );
}

export function TemplatesPageBrowser({
  categories,
  featureTags,
  templates,
}: {
  categories: CategoryData[];
  featureTags: FeatureTag[];
  templates: TemplateCardData[];
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("Most popular");
  const [sortOpen, setSortOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);

  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [platformTypes, setPlatformTypes] = useState<string[]>([]);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [tagTitles, setTagTitles] = useState<string[]>([]);
  const [priceLabels, setPriceLabels] = useState<string[]>([]);

  function reset() {
    setSearch("");
    setSort("Most popular");
    setCategoryIds([]);
    setPlatformTypes([]);
    setUserRoles([]);
    setTagTitles([]);
    setPriceLabels([]);
  }

  const visibleTags = showAllTags ? featureTags : featureTags.slice(0, 2);
  const hiddenTagsCount = featureTags.length - 2;

  const activeFilterCount =
    categoryIds.length +
    platformTypes.length +
    userRoles.length +
    tagTitles.length +
    priceLabels.length;

  const filtered = useMemo(() => {
    let result = templates.filter((t) => {
      if (
        search &&
        !`${t.title} ${t.descriptionShort ?? ""}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
        return false;

      if (
        categoryIds.length > 0 &&
        !categoryIds.some((id) => t.categoryIds.includes(id))
      )
        return false;

      if (platformTypes.length > 0 && !platformTypes.includes(t.platformType ?? ""))
        return false;

      if (userRoles.length > 0 && !userRoles.includes(t.userRoles ?? ""))
        return false;

      if (
        tagTitles.length > 0 &&
        !tagTitles.some((tag) => t.featureTags.includes(tag))
      )
        return false;

      if (priceLabels.length > 0) {
        const ranges = PRICE_RANGES.filter((r) => priceLabels.includes(r.label));
        const price = t.price ?? -1;
        if (!ranges.some((r) => price >= r.min && price <= r.max)) return false;
      }

      return true;
    });

    result = [...result].sort((a, b) => {
      switch (sort) {
        case "Newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "Title A-Z":
          return a.title.localeCompare(b.title);
        case "Title Z-A":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [
    templates,
    search,
    categoryIds,
    platformTypes,
    userRoles,
    tagTitles,
    priceLabels,
    sort,
  ]);

  return (
    <div className="mx-auto flex w-full max-w-300 flex-col gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-full border border-black/15 bg-white px-6 py-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent text-base text-black outline-none placeholder:text-black/40"
          />
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setSortOpen((s) => !s)}
            className="flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3 text-base font-medium text-black"
          >
            {sort}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full z-100 mt-2 flex w-48 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSort(option);
                    setSortOpen(false);
                  }}
                  className={`px-4 py-3 text-left text-sm hover:bg-brand-surface ${
                    option === sort ? "font-semibold text-brand-accent" : "text-black"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileFiltersOpen((s) => !s)}
          aria-pressed={mobileFiltersOpen}
          className="relative flex shrink-0 items-center justify-center rounded-full border border-black/15 bg-white p-3 lg:hidden"
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

      <div className={`grid grid-cols-1 gap-8 ${showFilters ? "lg:grid-cols-[320px_1fr]" : ""}`}>
        {/* <aside className="flex flex-col gap-6 rounded-[25px] bg-brand-surface p-6 lg:sticky lg:top-24 lg:self-start"> */}
        <aside
          className={`${mobileFiltersOpen ? "flex" : "hidden"} flex-col gap-6 rounded-[15px] bg-[#e9e9e9] p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.12)] lg:top-24 lg:self-start ${
            showFilters ? "lg:flex" : "lg:hidden"
          }`}
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
              <p className="text-sm font-semibold text-black">Industry</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <FilterPill
                    key={c.id}
                    label={c.shortTitle}
                    active={categoryIds.includes(c.id)}
                    onClick={() => setCategoryIds((prev) => toggle(prev, c.id))}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-black/10 pt-4">
              <p className="text-sm font-semibold text-black">Platform Type</p>
              <div className="flex flex-wrap gap-2">
                {PLATFORM_TYPES.map((p) => (
                  <FilterPill
                    key={p}
                    label={p}
                    active={platformTypes.includes(p)}
                    onClick={() => setPlatformTypes((prev) => toggle(prev, p))}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-black/10 pt-4">
              <p className="text-sm font-semibold text-black">User Roles</p>
              <div className="flex flex-wrap gap-2">
                {USER_ROLES.map((r) => (
                  <FilterPill
                    key={r}
                    label={r}
                    active={userRoles.includes(r)}
                    onClick={() => setUserRoles((prev) => toggle(prev, r))}
                  />
                ))}
              </div>
            </div>

            {featureTags.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-black/10 pt-4">
                <p className="text-sm font-semibold text-black">
                  Features Included
                </p>
                <div className="flex flex-wrap gap-2">
                  {visibleTags.map((tag) => (
                    <FilterPill
                      key={tag.id}
                      label={tag.title}
                      active={tagTitles.includes(tag.title)}
                      onClick={() =>
                        setTagTitles((prev) => toggle(prev, tag.title))
                      }
                    />
                  ))}
                  {!showAllTags && hiddenTagsCount > 0 && (
                    <span className="flex items-center rounded-full bg-brand-accent px-2.75 py-1 text-sm font-medium text-white">
                      +{hiddenTagsCount}
                    </span>
                  )}
                </div>
                {featureTags.length > 2 && (
                  <button
                    type="button"
                    onClick={() => setShowAllTags((s) => !s)}
                    className="self-start text-sm font-medium text-brand-accent hover:underline"
                  >
                    {showAllTags ? "Hide" : "See all"}
                  </button>
                )}
              </div>
            )}

            <div className="flex flex-col gap-3 border-t border-black/10 pt-4">
              <p className="text-sm font-semibold text-black">Price Range</p>
              <div className="flex flex-wrap gap-2">
                {PRICE_RANGES.map((r) => (
                  <FilterPill
                    key={r.label}
                    label={r.label}
                    active={priceLabels.includes(r.label)}
                    onClick={() => setPriceLabels((prev) => toggle(prev, r.label))}
                  />
                ))}
              </div>
            </div>
          </aside>

        <div className="flex flex-col gap-6">
          {!showFilters && (
            <button
              type="button"
              onClick={() => setShowFilters(true)}
              className="hidden items-center gap-2.5 self-start rounded-full border border-black/15 bg-black px-5 py-2 text-sm font-medium text-white hover:border-black/40 lg:inline-flex"
            >
              Show filters
              {activeFilterCount > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-black">
                  {activeFilterCount}
                </span>
              )}
            </button>
          )}

          {filtered.length === 0 ? (
            <p className="text-black/60">No templates match these filters.</p>
          ) : (
            <div
              className={`grid grid-cols-1 gap-6 min-[900px]:grid-cols-2 ${
                !showFilters ? "min-[1025px]:grid-cols-3" : ""
              }`}
            >
              {filtered.map((template) => (
                <div
                  key={template.id}
                  // className="flex flex-col overflow-hidden rounded-[25px] bg-white"
                  className="flex flex-col overflow-hidden bg-white rounded-[15px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.12)]"
                >
                  <TemplateGalleryImage
                    images={template.images}
                    title={template.title}
                  />
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <p className="text-lg font-bold text-black sm:text-xl">
                      {template.title}
                    </p>
                    {template.descriptionShort && (
                      <p className="line-clamp-3 text-sm text-brand-gray">
                        {template.descriptionShort}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between gap-4 pt-2">
                      {template.price !== null && (
                        <span className="text-lg font-bold text-black">
                          ${template.price}
                        </span>
                      )}
                      <Link
                        href={template.shopUrl || template.demoPreviewUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white hover:opacity-90"
                      >
                        Preview
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
