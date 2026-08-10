"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getBlogPostFields(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const slugInput = (formData.get("slug") as string)?.trim();
  const connectedTemplates = (formData.get("connected_templates") as string)
    ?.split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return {
    title,
    slug: slugInput ? slugify(slugInput) : slugify(title),
    cover_image_url: (formData.get("cover_image_url") as string) || null,
    content_html: (formData.get("content_html") as string)?.trim(),
    connected_templates: connectedTemplates ?? [],
    sort_order: Number(formData.get("sort_order") ?? 0),
    is_published: formData.get("is_published") === "on",
  };
}

function revalidateBlog(slug?: string) {
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function createBlogPost(formData: FormData) {
  const supabase = await createClient();
  const fields = getBlogPostFields(formData);
  const { error } = await supabase.from("blog_posts").insert(fields);

  if (error) throw new Error(error.message);

  revalidateBlog(fields.slug);
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  const supabase = await createClient();
  const fields = getBlogPostFields(formData);
  const { error } = await supabase
    .from("blog_posts")
    .update(fields)
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidateBlog(fields.slug);
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient();
  await supabase.from("blog_posts").delete().eq("id", id);
  revalidateBlog();
}
