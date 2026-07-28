import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteTestimonial } from "./actions";

export default async function TestimonialsListPage() {
  const supabase = await createClient();
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("id, name, company, quote, is_published, photo_url")
    .order("sort_order");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          + New testimonial
        </Link>
      </div>

      <ul className="flex flex-col gap-2">
        {(testimonials ?? []).map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white px-5 py-3"
          >
            <div className="flex items-center gap-3">
              {t.photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={t.photo_url}
                  alt=""
                  className="size-10 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="size-10 shrink-0 rounded-full bg-brand-surface" />
              )}
              <div>
                <span className="text-sm font-medium text-black">
                  {t.name}
                  {t.company ? ` — ${t.company}` : ""}
                </span>
                <p className="line-clamp-1 text-xs text-brand-gray">
                  {t.quote}
                </p>
              </div>
              {!t.is_published && (
                <span className="rounded-full bg-brand-surface px-2 py-0.5 text-xs text-brand-gray">
                  Draft
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/testimonials/${t.id}`}
                className="text-sm font-medium text-brand-accent hover:underline"
              >
                Edit
              </Link>
              <form action={deleteTestimonial.bind(null, t.id)}>
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
        {(testimonials ?? []).length === 0 && (
          <p className="text-sm text-brand-gray">No testimonials yet.</p>
        )}
      </ul>
    </div>
  );
}
