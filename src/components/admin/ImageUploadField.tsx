"use client";

import { useId, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ImageUploadFieldProps = {
  name: string;
  label: string;
  defaultValue?: string | null;
  pathPrefix: string;
};

export function ImageUploadField({
  name,
  label,
  defaultValue,
  pathPrefix,
}: ImageUploadFieldProps) {
  const inputId = useId();
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `${pathPrefix}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("case-study-media")
      .upload(path, file);

    if (uploadError) {
      setError("Upload failed. Try again.");
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("case-study-media").getPublicUrl(path);

    setUrl(publicUrl);
    setUploading(false);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-black">
        {label}
      </label>
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-3">
        {url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt=""
            className="size-14 rounded-lg border border-black/10 object-cover"
          />
        )}
        <input
          id={inputId}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-sm text-brand-gray file:mr-3 file:rounded-full file:border-0 file:bg-brand-surface file:px-3 file:py-1.5 file:text-sm file:font-medium"
        />
      </div>
      {uploading && <p className="text-xs text-brand-gray">Uploading…</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
