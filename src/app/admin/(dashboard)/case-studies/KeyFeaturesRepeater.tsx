"use client";

import { useState } from "react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type KeyFeature = { label: string; iconUrl: string };

export function KeyFeaturesRepeater({
  defaultValues,
  pathPrefix,
}: {
  defaultValues?: KeyFeature[];
  pathPrefix: string;
}) {
  const [items, setItems] = useState<KeyFeature[]>(
    defaultValues && defaultValues.length > 0
      ? defaultValues
      : [{ label: "", iconUrl: "" }],
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-black">Key Features Delivered</label>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-end gap-3 rounded-lg bg-brand-surface p-3"
          >
            <div className="flex flex-1 flex-col gap-1.5">
              <label className="text-xs text-brand-gray">Label</label>
              <input
                name="key_feature_label"
                defaultValue={item.label}
                className="rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-brand-accent"
              />
            </div>
            <ImageUploadField
              name="key_feature_icon"
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
        ))}
      </div>
      <button
        type="button"
        onClick={() => setItems((prev) => [...prev, { label: "", iconUrl: "" }])}
        className="self-start text-sm font-medium text-brand-accent hover:underline"
      >
        + Add feature
      </button>
    </div>
  );
}
