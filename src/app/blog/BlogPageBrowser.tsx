"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPostCard } from "@/lib/blog";

const SORT_OPTIONS = ["Newest", "Title A-Z", "Title Z-A"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

function formatPublishedDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogPageBrowser({ posts }: { posts: BlogPostCard[] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("Newest");
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase()),
    );

    result = [...result].sort((a, b) => {
      switch (sort) {
        case "Newest":
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        case "Title A-Z":
          return a.title.localeCompare(b.title);
        case "Title Z-A":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [posts, search, sort]);

  return (
    <div className="flex w-full max-w-300 flex-col gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-full border border-black/15 bg-white px-6 py-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent text-base text-black outline-none placeholder:text-black/40"
          />
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setSortOpen((s) => !s)}
            className="flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-medium text-black"
          >
            Sort by
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full z-10 mt-2 flex w-48 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSort(option);
                    setSortOpen(false);
                  }}
                  className={`px-4 py-3 text-left text-sm hover:bg-brand-surface ${
                    option === sort ? "font-semibold text-brand-accent" : "text-black"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-black/60">No articles match your search.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export function BlogCard({
  post,
  className,
}: {
  post: BlogPostCard;
  className?: string;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`flex flex-col overflow-hidden p-5 rounded-[5px] border-2 border-transparent bg-white shadow-[0px_4px_19.3px_0px_rgba(0,0,0,0.08)] transition-colors hover:border-brand-accent ${className ?? ""}`}
    >
      {post.coverImageUrl && (
        <div className="relative aspect-video w-full bg-brand-surface">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover rounded-lg"
          />
        </div>
      )}
      {/* <div className="flex flex-1 flex-col gap-3 p-6"> */}
      <div className="flex flex-1 flex-col gap-2.5 py-5">
        <p className="text-sm text-brand-gray">
          Published on {formatPublishedDate(post.publishedAt)}
        </p>
        <p className="text-xl font-semibold text-black">{post.title}</p>
        {/* <span className="mt-auto flex items-center gap-2 pt-2 text-sm font-medium text-brand-accent"> */}
        <span className="mt-auto flex items-center gap-2 text-sm font-medium text-brand-accent">
          Read more
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
