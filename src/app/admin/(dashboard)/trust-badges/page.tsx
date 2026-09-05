import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteTrustBadge } from "./actions";

export default async function TrustBadgesPage() {
  const supabase = await createClient();
  const { data: badges } = await supabase
    .from("trust_badges")
    .select("*")
    .order("sort_order");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black">Trust Badges</h1>
        <Link
          href="/admin/trust-badges/new"
          className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          + New Trust Badge
        </Link>
      </div>

      <ul className="flex flex-col gap-2">
        {(badges ?? []).map((b) => (
          <li
            key={b.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white px-5 py-3"
          >
            <div className="flex items-center gap-3">
              {b.icon_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={b.icon_url} alt="" className="size-6 object-contain" />
              )}
              <span className="text-sm font-medium text-black">{b.text}</span>
              {b.description && (
                <span className="text-sm text-brand-gray">{b.description}</span>
              )}
              <span className="rounded-full bg-brand-surface px-2 py-0.5 text-xs text-brand-gray">
                {b.type}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/trust-badges/${b.id}`}
                className="text-sm font-medium text-brand-accent hover:underline"
              >
                Edit
              </Link>
              <form action={deleteTrustBadge.bind(null, b.id)}>
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
        {(badges ?? []).length === 0 && (
          <p className="text-sm text-brand-gray">No trust badges yet.</p>
        )}
      </ul>
    </div>
  );
}
