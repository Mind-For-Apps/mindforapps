import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";
import { BlogCard } from "@/app/blog/BlogPageBrowser";

export async function Blog() {
  const posts = (await getAllBlogPosts()).slice(0, 4);

  if (posts.length === 0) return null;

  return (
    // <section className="flex flex-col items-center gap-8 bg-brand-surface px-6 py-16 sm:px-25">
    <section className="flex flex-col items-center gap-4 bg-brand-surface px-6 py-11">
      {/* <Link
        href="/blog"
        className="text-sm font-medium text-black underline hover:text-brand-accent"
      >
        See All
      </Link> */}

      <div className="flex w-full max-w-300 flex-col gap-8">
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-semibold text-black sm:text-[40px]">
            Blog
          </h2>
          {/* <p className="max-w-175 text-base text-brand-gray sm:text-lg"> */}
          <p className="max-w-150 text-base text-black sm:text-lg">
            A no-code blog with Bubble tutorials, app development insights,
            product-building tips, and startup guides.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 min-[600px]:grid-cols-2 min-[850px]:grid-cols-3">
          {posts.map((post, i) => (
            <BlogCard
              key={post.id}
              post={post}
              className={i === 3 ? "hidden min-[600px]:flex min-[850px]:hidden" : undefined}
            />
          ))}
        </div>
      </div>

      <Link
        href="/blog"
        className="text-lg font-semibold text-black underline hover:text-brand-accent py-4"
      >
        See All
      </Link>
    </section>
  );
}
