import { createClient } from "@/lib/supabase/server";
import { toggleInquiryRead, deleteInquiry } from "./actions";

export default async function InquiriesPage() {
  const supabase = await createClient();
  const { data: inquiries } = await supabase
    .from("project_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  const rows = inquiries ?? [];

  const filesByInquiry = await Promise.all(
    rows.map(async (row) => {
      const paths: string[] = row.file_paths ?? [];
      if (paths.length === 0) return [] as { path: string; url: string }[];

      const { data } = await supabase.storage
        .from("project-inquiry-files")
        .createSignedUrls(paths, 60 * 60);

      return (data ?? [])
        .filter((d) => d.signedUrl)
        .map((d) => ({ path: d.path ?? "", url: d.signedUrl! }));
    }),
  );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-black">
        Project Inquiries
      </h1>

      <ul className="flex flex-col gap-3">
        {rows.map((row, i) => (
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
                <span className="rounded-full bg-brand-surface px-2 py-0.5 text-xs text-brand-gray">
                  {row.stage}
                </span>
                {row.budget && (
                  <span className="rounded-full bg-brand-surface px-2 py-0.5 text-xs text-brand-gray">
                    {row.budget}
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
                <form action={toggleInquiryRead.bind(null, row.id, row.is_read)}>
                  <button
                    type="submit"
                    className="text-sm font-medium text-brand-accent hover:underline"
                  >
                    {row.is_read ? "Mark unread" : "Mark read"}
                  </button>
                </form>
                <form action={deleteInquiry.bind(null, row.id)}>
                  <button
                    type="submit"
                    className="text-sm text-brand-gray hover:text-red-600"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>

            {row.project_title && (
              <p className="text-sm font-medium text-black">
                {row.project_title}
              </p>
            )}
            {row.message && (
              <p className="text-sm text-black/70">{row.message}</p>
            )}

            {filesByInquiry[i].length > 0 && (
              <div className="flex flex-wrap gap-2">
                {filesByInquiry[i].map((f) => (
                  <a
                    key={f.path}
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-brand-surface px-3 py-1 text-xs font-medium text-brand-accent hover:underline"
                  >
                    {f.path.split("/").pop()}
                  </a>
                ))}
              </div>
            )}
          </li>
        ))}
        {rows.length === 0 && (
          <p className="text-sm text-brand-gray">No inquiries yet.</p>
        )}
      </ul>
    </div>
  );
}
