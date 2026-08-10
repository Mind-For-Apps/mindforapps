import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteBlogPost } from "./actions";

export default async function BlogListPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, cover_image_url, is_published, published_at")
    .order("published_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          + New post
        </Link>
      </div>

      <ul className="flex flex-col gap-2">
        {(posts ?? []).map((post) => (
          <li
            key={post.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white px-5 py-3"
          >
            <div className="flex items-center gap-3">
              {post.cover_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.cover_image_url}
                  alt=""
                  className="size-10 rounded-lg object-cover"
                />
              ) : (
                <div className="size-10 rounded-lg bg-brand-surface" />
              )}
              <span className="text-sm font-medium text-black">
                {post.title}
              </span>
              {!post.is_published && (
                <span className="rounded-full bg-brand-surface px-2 py-0.5 text-xs text-brand-gray">
                  Draft
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/blog/${post.id}`}
                className="text-sm font-medium text-brand-accent hover:underline"
              >
                Edit
              </Link>
              <form action={deleteBlogPost.bind(null, post.id)}>
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
        {(posts ?? []).length === 0 && (
          <p className="text-sm text-brand-gray">No blog posts yet.</p>
        )}
      </ul>
    </div>
  );
}
