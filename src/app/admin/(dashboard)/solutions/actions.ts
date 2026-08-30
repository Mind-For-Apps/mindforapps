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

function getSolutionFields(formData: FormData) {
  return {
    slug: (formData.get("slug") as string)?.trim(),
    title: (formData.get("title") as string)?.trim(),
    title_long: (formData.get("title_long") as string) || null,
    title_for_cards: (formData.get("title_for_cards") as string) || null,
    price_label: (formData.get("price_label") as string) || null,
    is_estimate_link: formData.get("is_estimate_link") === "on",
    tags: getTextArray(formData, "tags"),
    more_count: Number(formData.get("more_count") ?? 0),
    with_mfa: getTextArray(formData, "with_mfa"),
    without_mfa: getTextArray(formData, "without_mfa"),
    main_image_url: (formData.get("main_image_url") as string) || null,
    features_image_url: (formData.get("features_image_url") as string) || null,
    whats_included_icon_url:
      (formData.get("whats_included_icon_url") as string) || null,
    images: getTextArray(formData, "images"),
    images_cover: getTextArray(formData, "images_cover"),
    text_0: (formData.get("text_0") as string) || null,
    text_1: (formData.get("text_1") as string) || null,
    text_2: (formData.get("text_2") as string) || null,
    text_3: (formData.get("text_3") as string) || null,
    text_4: (formData.get("text_4") as string) || null,
    text_5: (formData.get("text_5") as string) || null,
    text_6: (formData.get("text_6") as string) || null,
    text_7: (formData.get("text_7") as string) || null,
    text_8: (formData.get("text_8") as string) || null,
    seo_title: (formData.get("seo_title") as string) || null,
    seo_description: (formData.get("seo_description") as string) || null,
    is_published: formData.get("is_published") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
    build_price_low: formData.get("build_price_low")
      ? Number(formData.get("build_price_low"))
      : null,
    build_price_high: formData.get("build_price_high")
      ? Number(formData.get("build_price_high"))
      : null,
    build_checklist: getTextArray(formData, "build_checklist"),
  };
}

type FeatureLabel = { title: string; color: string; bgColor: string };
type FeatureCategory = { name: string; labels: FeatureLabel[] };

async function syncRelations(solutionId: string, formData: FormData) {
  const supabase = await createClient();

  const toolIds = formData.getAll("tool_ids") as string[];

  await supabase.from("solution_tools").delete().eq("solution_id", solutionId);
  if (toolIds.length > 0) {
    await supabase.from("solution_tools").insert(
      toolIds.map((tool_id) => ({ solution_id: solutionId, tool_id })),
    );
  }

  await supabase
    .from("solution_feature_categories")
    .delete()
    .eq("solution_id", solutionId);

  const raw = formData.get("feature_categories_json") as string | null;
  if (!raw) return;

  let categories: FeatureCategory[];
  try {
    categories = JSON.parse(raw);
  } catch {
    return;
  }

  for (const [i, category] of categories.entries()) {
    const name = category.name?.trim();
    if (!name) continue;

    const { data: created, error } = await supabase
      .from("solution_feature_categories")
      .insert({ solution_id: solutionId, name, sort_order: i })
      .select("id")
      .single();

    if (error || !created) continue;

    const labels = category.labels
      .map((l, idx) => ({
        category_id: created.id,
        title: l.title?.trim(),
        color: l.color?.trim() || null,
        bg_color: l.bgColor?.trim() || null,
        sort_order: idx,
      }))
      .filter((l) => l.title);

    if (labels.length > 0) {
      await supabase.from("solution_feature_labels").insert(labels);
    }
  }

  await supabase
    .from("solution_included_features")
    .delete()
    .eq("solution_id", solutionId);

  const includedTitles = formData.getAll("included_feature_title") as string[];
  const includedSubtitles = formData.getAll(
    "included_feature_subtitle",
  ) as string[];
  const includedIcons = formData.getAll("included_feature_icon") as string[];
  const includedTags = formData.getAll("included_feature_tags") as string[];

  const includedFeatures = includedTitles
    .map((title, i) => ({
      title: title.trim(),
      subtitle: includedSubtitles[i]?.trim() || null,
      icon_url: includedIcons[i] || null,
      tags: (includedTags[i] ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    }))
    .filter((f) => f.title);

  if (includedFeatures.length > 0) {
    await supabase.from("solution_included_features").insert(
      includedFeatures.map((f, i) => ({
        solution_id: solutionId,
        title: f.title,
        subtitle: f.subtitle,
        icon_url: f.icon_url,
        tags: f.tags,
        sort_order: i,
      })),
    );
  }

  await supabase
    .from("solution_designed_for")
    .delete()
    .eq("solution_id", solutionId);

  const designedForTitles = formData.getAll("designed_for_title") as string[];
  const designedForDescriptions = formData.getAll(
    "designed_for_description",
  ) as string[];
  const designedForIcons = formData.getAll("designed_for_icon") as string[];

  const designedFor = designedForTitles
    .map((title, i) => ({
      title: title.trim(),
      description: designedForDescriptions[i]?.trim() || null,
      icon_url: designedForIcons[i] || null,
    }))
    .filter((d) => d.title);

  if (designedFor.length > 0) {
    await supabase.from("solution_designed_for").insert(
      designedFor.map((d, i) => ({
        solution_id: solutionId,
        title: d.title,
        description: d.description,
        icon_url: d.icon_url,
        sort_order: i,
      })),
    );
  }
}

export async function createSolution(formData: FormData) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("solutions")
    .insert(getSolutionFields(formData))
    .select("id")
    .single();

  if (error || !data) throw new Error(error?.message ?? "Failed to create solution");

  await syncRelations(data.id, formData);

  revalidatePath("/admin/solutions");
  revalidatePath("/");
  redirect("/admin/solutions");
}

export async function updateSolution(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("solutions")
    .update(getSolutionFields(formData))
    .eq("id", id);

  if (error) throw new Error(error.message);

  await syncRelations(id, formData);

  revalidatePath("/admin/solutions");
  revalidatePath("/");
  redirect("/admin/solutions");
}

export async function deleteSolution(id: string) {
  const supabase = await createClient();
  await supabase.from("solutions").delete().eq("id", id);
  revalidatePath("/admin/solutions");
  revalidatePath("/");
}
