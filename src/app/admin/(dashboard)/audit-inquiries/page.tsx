import { createClient } from "@/lib/supabase/server";
import { toggleAuditInquiryRead, deleteAuditInquiry } from "./actions";

export default async function AuditInquiriesPage() {
  const supabase = await createClient();
  const { data: inquiries } = await supabase
    .from("audit_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  const rows = inquiries ?? [];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-black">Audit Inquiries</h1>

      <ul className="flex flex-col gap-3">
        {rows.map((row) => (
          <li
            key={row.id}
            className={`flex flex-col gap-3 rounded-xl border px-5 py-4 ${
              row.is_read
                ? "border-black/10 bg-white"
                : "border-brand-accent/30 bg-brand-accent/5"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-black">
                  {row.name}
                </span>
                <span className="text-sm text-brand-gray">{row.email}</span>
                <a
                  href={row.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-brand-surface px-2 py-0.5 text-xs text-brand-accent hover:underline"
                >
                  {row.website_url}
                </a>
                {row.company_size && (
                  <span className="rounded-full bg-brand-surface px-2 py-0.5 text-xs text-brand-gray">
                    {row.company_size}
                  </span>
                )}
                {!row.is_read && (
                  <span className="rounded-full bg-brand-accent px-2 py-0.5 text-xs font-medium text-white">
                    New
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-brand-gray">
                  {new Date(row.created_at).toLocaleString()}
                </span>
                <form
                  action={toggleAuditInquiryRead.bind(null, row.id, row.is_read)}
                >
                  <button
                    type="submit"
                    className="text-sm font-medium text-brand-accent hover:underline"
                  >
                    {row.is_read ? "Mark unread" : "Mark read"}
                  </button>
                </form>
                <form action={deleteAuditInquiry.bind(null, row.id)}>
                  <button
                    type="submit"
                    className="text-sm text-brand-gray hover:text-red-600"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>

            <p className="text-sm font-medium text-black">{row.goal}</p>
            {row.win && (
              <p className="text-sm text-black/70">
                <span className="font-medium text-black">Win: </span>
                {row.win}
              </p>
            )}
            {(row.markets || row.competitors) && (
              <div className="flex flex-wrap gap-4 text-sm text-black/70">
                {row.markets && (
                  <p>
                    <span className="font-medium text-black">Markets: </span>
                    {row.markets}
                  </p>
                )}
                {row.competitors && (
                  <p>
                    <span className="font-medium text-black">
                      Competitors:{" "}
                    </span>
                    {row.competitors}
                  </p>
                )}
              </div>
            )}
          </li>
        ))}
        {rows.length === 0 && (
          <p className="text-sm text-brand-gray">No audit inquiries yet.</p>
        )}
      </ul>
    </div>
  );
}
