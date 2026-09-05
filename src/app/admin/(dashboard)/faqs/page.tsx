import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteFaq } from "./actions";

export default async function FaqsListPage() {
  const supabase = await createClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select(
      "id, question, show_on_index, real_estate_sort_order, service_booking_sort_order, free_seo_audit_sort_order",
    )
    .order("sort_order");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black">FAQs</h1>
        <Link
          href="/admin/faqs/new"
          className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          + New FAQ
        </Link>
      </div>

      <ul className="flex flex-col gap-2">
        {(faqs ?? []).map((f) => (
          <li
            key={f.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white px-5 py-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-black">
                {f.question}
              </span>
              {f.show_on_index && (
                <span className="rounded-full bg-brand-surface px-2 py-0.5 text-xs text-brand-gray">
                  Homepage
                </span>
              )}
              {f.real_estate_sort_order != null && (
                <span className="rounded-full bg-brand-surface px-2 py-0.5 text-xs text-brand-gray">
                  Real Estate #{f.real_estate_sort_order}
                </span>
              )}
              {f.service_booking_sort_order != null && (
                <span className="rounded-full bg-brand-surface px-2 py-0.5 text-xs text-brand-gray">
                  Service Booking #{f.service_booking_sort_order}
                </span>
              )}
              {f.free_seo_audit_sort_order != null && (
                <span className="rounded-full bg-brand-surface px-2 py-0.5 text-xs text-brand-gray">
                  Free SEO Audit #{f.free_seo_audit_sort_order}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/faqs/${f.id}`}
                className="text-sm font-medium text-brand-accent hover:underline"
              >
                Edit
              </Link>
              <form action={deleteFaq.bind(null, f.id)}>
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
        {(faqs ?? []).length === 0 && (
          <p className="text-sm text-brand-gray">No FAQs yet.</p>
        )}
      </ul>
    </div>
  );
}
