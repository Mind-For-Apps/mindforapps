import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getBlogPostBySlug, getRandomBlogPosts } from "@/lib/blog";
import { BlogCard } from "../BlogPageBrowser";

function formatPublishedDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Mind For Apps Blog`,
    openGraph: post.coverImageUrl ? { images: [post.coverImageUrl] } : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const similarPosts = await getRandomBlogPosts(slug, 2);

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center gap-10 px-6 py-16 sm:px-25">
        <div className="relative flex w-full max-w-300 items-center justify-center">
          <Link
            href="/blog"
            className="absolute left-0 flex items-center gap-2 text-sm font-medium text-black hover:text-brand-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </Link>
          <h1 className="text-3xl font-semibold text-black sm:text-[40px]">
            Blog
          </h1>
        </div>

        <div className="grid w-full max-w-300 grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <article className="flex flex-col overflow-hidden rounded-[25px] bg-white shadow-[0px_4px_19.3px_0px_rgba(0,0,0,0.08)]">
            {post.coverImageUrl && (
              <div className="relative aspect-video w-full bg-brand-surface">
                <Image
                  src={post.coverImageUrl}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 700px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-col gap-4 p-8">
              <p className="text-sm text-brand-gray">
                Published on {formatPublishedDate(post.publishedAt)}
              </p>
              <h2 className="text-2xl font-bold text-black sm:text-3xl">
                {post.title}
              </h2>
              <div
                className="prose-blog text-base text-brand-gray"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-black">Similar posts</p>
              <Link
                href="/blog"
                className="text-sm font-medium text-brand-accent hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="flex flex-col gap-6">
              {similarPosts.map((similar) => (
                <BlogCard key={similar.id} post={similar} />
              ))}
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
