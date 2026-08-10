import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllBlogPosts } from "@/lib/blog";
import { BlogPageBrowser } from "./BlogPageBrowser";

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center gap-10 px-6 py-16 sm:px-25">
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-3xl font-semibold text-black sm:text-[40px]">
            No-Code &amp; Bubble Blog
          </h1>
          <p className="max-w-175 text-base text-brand-gray sm:text-lg">
            A no-code blog with Bubble tutorials, app development insights,
            product-building tips, and startup guides.
          </p>
        </div>

        <BlogPageBrowser posts={posts} />
      </main>
      <Footer />
    </>
  );
}
