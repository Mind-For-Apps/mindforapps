import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { TextField, FormSection } from "@/components/admin/FormField";

type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  cover_image_url: string | null;
  content_html: string;
  connected_templates: string[];
  sort_order: number;
  is_published: boolean;
};

export function BlogForm({
  action,
  post,
}: {
  action: (formData: FormData) => void;
  post?: BlogPostRow;
}) {
  const p = post;
  const idPrefix = p?.id ?? "new";

  return (
    <form action={action} className="flex flex-col gap-6">
      <FormSection title="Post">
        <TextField name="title" label="Title" defaultValue={p?.title} required />
        <TextField
          name="slug"
          label="Slug (leave blank to generate from title)"
          defaultValue={p?.slug}
        />
        <ImageUploadField
          name="cover_image_url"
          label="Cover image"
          defaultValue={p?.cover_image_url}
          pathPrefix={`blog/${idPrefix}`}
        />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="content_html" className="text-sm font-medium text-black">
            Content (HTML)
          </label>
          <textarea
            id="content_html"
            name="content_html"
            rows={16}
            defaultValue={p?.content_html}
            className="rounded-lg border border-black/15 px-3 py-2 font-mono text-xs outline-none focus:border-brand-accent"
          />
        </div>
        <TextField
          name="connected_templates"
          label="Connected templates (comma-separated, for reference only)"
          defaultValue={p?.connected_templates.join(", ")}
        />
      </FormSection>

      <FormSection title="Publishing">
        <div className="grid grid-cols-2 gap-4">
          <TextField
            name="sort_order"
            label="Sort order"
            type="number"
            defaultValue={p?.sort_order ?? 0}
          />
          <label className="flex items-center gap-2 self-end pb-2 text-sm font-medium text-black">
            <input
              type="checkbox"
              name="is_published"
              defaultChecked={p?.is_published ?? true}
            />
            Published
          </label>
        </div>
      </FormSection>

      <button
        type="submit"
        className="bg-brand-gradient self-start rounded-full px-8 py-3 text-sm font-medium text-white hover:opacity-90"
      >
        {p ? "Save changes" : "Create post"}
      </button>
    </form>
  );
}
