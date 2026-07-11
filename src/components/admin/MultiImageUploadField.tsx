"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type MultiImageUploadFieldProps = {
  name: string;
  label: string;
  defaultValues?: string[];
  pathPrefix: string;
};

export function MultiImageUploadField({
  name,
  label,
  defaultValues,
  pathPrefix,
}: MultiImageUploadFieldProps) {
  const [urls, setUrls] = useState<string[]>(defaultValues ?? []);
  const [uploading, setUploading] = useState(false);

  async function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    const supabase = createClient();

    const uploaded: string[] = [];
    for (const file of files) {
      const ext = file.name.split(".").pop();
      const path = `${pathPrefix}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("case-study-media")
        .upload(path, file);
      if (!error) {
        const {
          data: { publicUrl },
        } = supabase.storage.from("case-study-media").getPublicUrl(path);
        uploaded.push(publicUrl);
      }
    }

    setUrls((prev) => [...prev, ...uploaded]);
    setUploading(false);
    e.target.value = "";
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-black">{label}</label>
      {urls.map((url) => (
        <input key={url} type="hidden" name={name} value={url} />
      ))}
      {urls.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {urls.map((url) => (
            <div key={url} className="group relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt=""
                className="size-16 rounded-lg border border-black/10 object-cover"
              />
              <button
                type="button"
                onClick={() => setUrls((prev) => prev.filter((u) => u !== url))}
                className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-black text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesChange}
        className="text-sm text-brand-gray file:mr-3 file:rounded-full file:border-0 file:bg-brand-surface file:px-3 file:py-1.5 file:text-sm file:font-medium"
      />
      {uploading && <p className="text-xs text-brand-gray">Uploading…</p>}
    </div>
  );
}
