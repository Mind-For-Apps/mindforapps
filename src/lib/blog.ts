import { createClient } from "@/lib/supabase/server";

export type BlogPostCard = {
  id: string;
  slug: string;
  title: string;
  coverImageUrl: string | null;
  publishedAt: string;
};

export type BlogPost = BlogPostCard & {
  contentHtml: string;
  connectedTemplates: string[];
};

function mapCard(row: {
  id: string;
  slug: string;
  title: string;
  cover_image_url: string | null;
  published_at: string;
}): BlogPostCard {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    coverImageUrl: row.cover_image_url,
    publishedAt: row.published_at,
  };
}

export async function getAllBlogPosts(): Promise<BlogPostCard[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("id, slug, title, cover_image_url, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });
  return (data ?? []).map(mapCard);
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!data) return null;

  return {
    ...mapCard(data),
    contentHtml: data.content_html,
    connectedTemplates: data.connected_templates ?? [],
  };
}

export async function getRandomBlogPosts(
  excludeSlug: string,
  count = 2,
): Promise<BlogPostCard[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("id, slug, title, cover_image_url, published_at")
    .eq("is_published", true)
    .neq("slug", excludeSlug);

  const posts = (data ?? []).map(mapCard);
  return posts.sort(() => Math.random() - 0.5).slice(0, count);
}
