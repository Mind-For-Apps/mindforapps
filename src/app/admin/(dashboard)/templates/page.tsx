import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteTemplate } from "./actions";

export default async function TemplatesListPage() {
  const supabase = await createClient();
  const { data: templates } = await supabase
    .from("templates")
    .select("id, title, slug, is_public, new_images")
    .order("sort_order");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black">Templates</h1>
        <Link
          href="/admin/templates/new"
          className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          + New template
        </Link>
      </div>

      <ul className="flex flex-col gap-2">
        {(templates ?? []).map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white px-5 py-3"
          >
            <div className="flex items-center gap-3">
              {t.new_images?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={t.new_images[0]}
                  alt=""
                  className="size-10 shrink-0 rounded-lg object-cover"
                />
              ) : (
                <div className="size-10 shrink-0 rounded-lg bg-brand-surface" />
              )}
              <span className="text-sm font-medium text-black">{t.title}</span>
              <span className="text-xs text-brand-gray">/{t.slug}</span>
              {!t.is_public && (
                <span className="rounded-full bg-brand-surface px-2 py-0.5 text-xs text-brand-gray">
                  Draft
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/templates/${t.id}`}
                className="text-sm font-medium text-brand-accent hover:underline"
              >
                Edit
              </Link>
              <form action={deleteTemplate.bind(null, t.id)}>
                <button
                  type="submit"
                  className="text-sm text-brand-gray hover:text-red-600"
                >
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
        {(templates ?? []).length === 0 && (
          <p className="text-sm text-brand-gray">No templates yet.</p>
        )}
      </ul>
    </div>
  );
}
