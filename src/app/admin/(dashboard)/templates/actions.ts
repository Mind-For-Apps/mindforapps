"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function getTextArray(formData: FormData, name: string) {
  return formData
    .getAll(name)
    .map((v) => (v as string).trim())
    .filter(Boolean);
}

function getTemplateFields(formData: FormData) {
  return {
    slug: (formData.get("slug") as string)?.trim(),
    title: (formData.get("title") as string)?.trim(),
    description_short: (formData.get("description_short") as string) || null,
    description_long_1: (formData.get("description_long_1") as string) || null,
    description_long_2: (formData.get("description_long_2") as string) || null,
    images: getTextArray(formData, "images"),
    design_images: getTextArray(formData, "design_images"),
    new_images: getTextArray(formData, "new_images"),
    demo_accounts_url: (formData.get("demo_accounts_url") as string) || null,
    demo_preview_url: (formData.get("demo_preview_url") as string) || null,
    documentation_url: (formData.get("documentation_url") as string) || null,
    shop_url: (formData.get("shop_url") as string) || null,
    platform_type: (formData.get("platform_type") as string) || null,
    user_roles: (formData.get("user_roles") as string) || null,
    price: formData.get("price") ? Number(formData.get("price")) : null,
    is_public: formData.get("is_public") === "on",
    seo_title: (formData.get("seo_title") as string) || null,
    seo_description: (formData.get("seo_description") as string) || null,
    seo_image_url: (formData.get("seo_image_url") as string) || null,
    youtube_video: (formData.get("youtube_video") as string) || null,
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

async function syncRelations(templateId: string, formData: FormData) {
  const supabase = await createClient();

  const categoryIds = formData.getAll("category_ids") as string[];
  const featureTagIds = formData.getAll("feature_tag_ids") as string[];

  await Promise.all([
    supabase.from("template_categories").delete().eq("template_id", templateId),
    supabase.from("template_features").delete().eq("template_id", templateId),
  ]);

  if (categoryIds.length > 0) {
    await supabase.from("template_categories").insert(
      categoryIds.map((category_id) => ({ template_id: templateId, category_id })),
    );
  }
  if (featureTagIds.length > 0) {
    await supabase.from("template_features").insert(
      featureTagIds.map((feature_tag_id) => ({
        template_id: templateId,
        feature_tag_id,
      })),
    );
  }
}

export async function createTemplate(formData: FormData) {
  const supabase = await createClient();
  const fields = getTemplateFields(formData);

  const { data, error } = await supabase
    .from("templates")
    .insert(fields)
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to create template");
  }

  await syncRelations(data.id, formData);

  revalidatePath("/admin/templates");
  revalidatePath("/");
  redirect("/admin/templates");
}

export async function updateTemplate(id: string, formData: FormData) {
  const supabase = await createClient();
  const fields = getTemplateFields(formData);

  const { error } = await supabase.from("templates").update(fields).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  await syncRelations(id, formData);

  revalidatePath("/admin/templates");
  revalidatePath("/");
  redirect("/admin/templates");
}

export async function deleteTemplate(id: string) {
  const supabase = await createClient();
  await supabase.from("templates").delete().eq("id", id);
  revalidatePath("/admin/templates");
  revalidatePath("/");
}
