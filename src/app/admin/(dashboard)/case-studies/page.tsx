import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteCaseStudy } from "./actions";

export default async function CaseStudiesListPage() {
  const supabase = await createClient();
  const { data: caseStudies } = await supabase
    .from("case_studies")
    .select("id, title, slug, is_published, main_image_url")
    .order("sort_order");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black">Case Studies</h1>
        <Link
          href="/admin/case-studies/new"
          className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          + New case study
        </Link>
      </div>

      <ul className="flex flex-col gap-2">
        {(caseStudies ?? []).map((cs) => (
          <li
            key={cs.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white px-5 py-3"
          >
            <div className="flex items-center gap-3">
              {cs.main_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cs.main_image_url}
                  alt=""
                  className="size-10 shrink-0 rounded-lg object-cover"
                />
              ) : (
                <div className="size-10 shrink-0 rounded-lg bg-brand-surface" />
              )}
              <span className="text-sm font-medium text-black">{cs.title}</span>
              <span className="text-xs text-brand-gray">/{cs.slug}</span>
              {!cs.is_published && (
                <span className="rounded-full bg-brand-surface px-2 py-0.5 text-xs text-brand-gray">
                  Draft
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/case-studies/${cs.id}`}
                className="text-sm font-medium text-brand-accent hover:underline"
              >
                Edit
              </Link>
              <form action={deleteCaseStudy.bind(null, cs.id)}>
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
        {(caseStudies ?? []).length === 0 && (
          <p className="text-sm text-brand-gray">No case studies yet.</p>
        )}
      </ul>
    </div>
  );
}
