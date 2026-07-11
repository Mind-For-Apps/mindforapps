"use client";

import { useState } from "react";

type TextListRepeaterProps = {
  name: string;
  label: string;
  defaultValues?: string[];
  placeholder?: string;
};

export function TextListRepeater({
  name,
  label,
  defaultValues,
  placeholder,
}: TextListRepeaterProps) {
  const [items, setItems] = useState<string[]>(
    defaultValues && defaultValues.length > 0 ? defaultValues : [""],
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-black">{label}</label>
      <div className="flex flex-col gap-2">
        {items.map((value, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              name={name}
              defaultValue={value}
              placeholder={placeholder}
              className="flex-1 rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-brand-accent"
            />
            <button
              type="button"
              onClick={() =>
                setItems((prev) => prev.filter((_, idx) => idx !== i))
              }
              className="shrink-0 rounded-full px-2 py-1 text-sm text-brand-gray hover:text-red-600"
              aria-label="Remove"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setItems((prev) => [...prev, ""])}
        className="self-start text-sm font-medium text-brand-accent hover:underline"
      >
        + Add line
      </button>
    </div>
  );
}
