"use client";

import { useState } from "react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type IncludedFeature = {
  title: string;
  subtitle: string;
  iconUrl: string;
  tags: string;
};

export function IncludedFeaturesRepeater({
  defaultValues,
  pathPrefix,
}: {
  defaultValues?: IncludedFeature[];
  pathPrefix: string;
}) {
  const [items, setItems] = useState<IncludedFeature[]>(
    defaultValues && defaultValues.length > 0
      ? defaultValues
      : [{ title: "", subtitle: "", iconUrl: "", tags: "" }],
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-black">
        What&rsquo;s Included
      </label>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-lg bg-brand-surface p-3"
          >
            <div className="flex items-end gap-3">
              <div className="flex flex-1 flex-col gap-1.5">
                <label className="text-xs text-brand-gray">Title</label>
                <input
                  name="included_feature_title"
                  defaultValue={item.title}
                  className="rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-brand-accent"
                />
              </div>
              <ImageUploadField
                name="included_feature_icon"
                label="Icon"
                defaultValue={item.iconUrl}
                pathPrefix={pathPrefix}
              />
              <button
                type="button"
                onClick={() =>
                  setItems((prev) => prev.filter((_, idx) => idx !== i))
                }
                className="mb-2 shrink-0 rounded-full px-2 py-1 text-sm text-brand-gray hover:text-red-600"
                aria-label="Remove"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-brand-gray">Subtitle</label>
              <input
                name="included_feature_subtitle"
                defaultValue={item.subtitle}
                className="rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-brand-accent"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-brand-gray">
                Tags (comma-separated)
              </label>
              <input
                name="included_feature_tags"
                defaultValue={item.tags}
                className="rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-brand-accent"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() =>
          setItems((prev) => [
            ...prev,
            { title: "", subtitle: "", iconUrl: "", tags: "" },
          ])
        }
        className="self-start text-sm font-medium text-brand-accent hover:underline"
      >
        + Add item
      </button>
    </div>
  );
}
