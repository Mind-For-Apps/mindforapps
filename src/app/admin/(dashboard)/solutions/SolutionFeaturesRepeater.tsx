"use client";

import { useState } from "react";

type Label = { title: string; color: string; bgColor: string };
type Category = { name: string; labels: Label[] };

const emptyLabel: Label = { title: "", color: "", bgColor: "" };
const emptyCategory: Category = { name: "", labels: [{ ...emptyLabel }] };

export function SolutionFeaturesRepeater({
  defaultValues,
}: {
  defaultValues?: Category[];
}) {
  const [categories, setCategories] = useState<Category[]>(
    defaultValues && defaultValues.length > 0 ? defaultValues : [emptyCategory],
  );

  function updateCategory(i: number, patch: Partial<Category>) {
    setCategories((prev) =>
      prev.map((c, idx) => (idx === i ? { ...c, ...patch } : c)),
    );
  }

  function updateLabel(catIdx: number, labelIdx: number, patch: Partial<Label>) {
    setCategories((prev) =>
      prev.map((c, idx) =>
        idx === catIdx
          ? {
              ...c,
              labels: c.labels.map((l, li) =>
                li === labelIdx ? { ...l, ...patch } : l,
              ),
            }
          : c,
      ),
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        type="hidden"
        name="feature_categories_json"
        value={JSON.stringify(categories)}
      />
      {categories.map((category, catIdx) => (
        <div
          key={catIdx}
          className="flex flex-col gap-3 rounded-lg bg-brand-surface p-4"
        >
          <div className="flex items-center gap-2">
            <input
              value={category.name}
              onChange={(e) => updateCategory(catIdx, { name: e.target.value })}
              placeholder="Category name"
              className="flex-1 rounded-lg border border-black/15 px-3 py-2 text-sm font-medium outline-none focus:border-brand-accent"
            />
            <button
              type="button"
              onClick={() =>
                setCategories((prev) => prev.filter((_, i) => i !== catIdx))
              }
              className="shrink-0 rounded-full px-2 py-1 text-sm text-brand-gray hover:text-red-600"
              aria-label="Remove category"
            >
              ✕ Remove category
            </button>
          </div>

          <div className="flex flex-col gap-2 pl-4">
            {category.labels.map((label, labelIdx) => (
              <div key={labelIdx} className="flex items-center gap-2">
                <input
                  value={label.title}
                  onChange={(e) =>
                    updateLabel(catIdx, labelIdx, { title: e.target.value })
                  }
                  placeholder="Feature label"
                  className="flex-1 rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-brand-accent"
                />
                <input
                  value={label.color}
                  onChange={(e) =>
                    updateLabel(catIdx, labelIdx, { color: e.target.value })
                  }
                  placeholder="Text color (#3635CF)"
                  className="w-40 rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-brand-accent"
                />
                <input
                  value={label.bgColor}
                  onChange={(e) =>
                    updateLabel(catIdx, labelIdx, { bgColor: e.target.value })
                  }
                  placeholder="Background (#CBCAFF)"
                  className="w-40 rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-brand-accent"
                />
                <span
                  className="size-6 shrink-0 rounded-full border border-black/10"
                  style={{ backgroundColor: label.bgColor || undefined }}
                />
                <button
                  type="button"
                  onClick={() =>
                    setCategories((prev) =>
                      prev.map((c, idx) =>
                        idx === catIdx
                          ? {
                              ...c,
                              labels: c.labels.filter((_, li) => li !== labelIdx),
                            }
                          : c,
                      ),
                    )
                  }
                  className="shrink-0 rounded-full px-2 py-1 text-sm text-brand-gray hover:text-red-600"
                  aria-label="Remove label"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                updateCategory(catIdx, {
                  labels: [...category.labels, { ...emptyLabel }],
                })
              }
              className="self-start text-sm font-medium text-brand-accent hover:underline"
            >
              + Add feature label
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setCategories((prev) => [...prev, { ...emptyCategory, labels: [{ ...emptyLabel }] }])
        }
        className="self-start text-sm font-medium text-brand-accent hover:underline"
      >
        + Add category
      </button>
    </div>
  );
}
