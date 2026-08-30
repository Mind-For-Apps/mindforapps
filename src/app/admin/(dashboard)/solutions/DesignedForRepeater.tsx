"use client";

import { useState } from "react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type DesignedForItem = {
  title: string;
  description: string;
  iconUrl: string;
};

export function DesignedForRepeater({
  defaultValues,
  pathPrefix,
}: {
  defaultValues?: DesignedForItem[];
  pathPrefix: string;
}) {
  const [items, setItems] = useState<DesignedForItem[]>(
    defaultValues && defaultValues.length > 0
      ? defaultValues
      : [{ title: "", description: "", iconUrl: "" }],
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-black">Designed For</label>
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
                  name="designed_for_title"
                  defaultValue={item.title}
                  className="rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-brand-accent"
                />
              </div>
              <ImageUploadField
                name="designed_for_icon"
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
              <label className="text-xs text-brand-gray">Description</label>
              <input
                name="designed_for_description"
                defaultValue={item.description}
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
            { title: "", description: "", iconUrl: "" },
          ])
        }
        className="self-start text-sm font-medium text-brand-accent hover:underline"
      >
        + Add item
      </button>
    </div>
  );
}
