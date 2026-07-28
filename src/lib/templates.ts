import { createClient } from "@/lib/supabase/server";

export type TemplateCardData = {
  id: string;
  slug: string;
  title: string;
  descriptionShort: string | null;
  price: number | null;
  imageUrl: string | null;
  shopUrl: string | null;
  demoPreviewUrl: string | null;
  categoryIds: string[];
  platformType: string | null;
  userRoles: string | null;
  featureTags: string[];
  createdAt: string;
};

function mapTemplate(template: {
  id: string;
  slug: string;
  title: string;
  description_short: string | null;
  price: number | null;
  images: string[] | null;
  shop_url: string | null;
  demo_preview_url: string | null;
  platform_type: string | null;
  user_roles: string | null;
  created_at: string;
  template_categories: { category_id: string }[];
  template_features: { template_feature_tags: { title: string } | null }[];
}): TemplateCardData {
  return {
    id: template.id,
    slug: template.slug,
    title: template.title,
    descriptionShort: template.description_short,
    price: template.price,
    imageUrl: (template.images ?? [])[0] ?? null,
    shopUrl: template.shop_url,
    demoPreviewUrl: template.demo_preview_url,
    categoryIds: (template.template_categories ?? []).map(
      (tc) => tc.category_id,
    ),
    platformType: template.platform_type,
    userRoles: template.user_roles,
    featureTags: (template.template_features ?? [])
      .map((tf) => tf.template_feature_tags?.title)
      .filter((t): t is string => !!t),
    createdAt: template.created_at,
  };
}

export async function getTemplateCards(): Promise<TemplateCardData[]> {
  const supabase = await createClient();

  const { data: templates } = await supabase
    .from("templates")
    .select(
      "*, template_categories(category_id), template_features(template_feature_tags(title))",
    )
    .eq("is_public", true)
    .order("sort_order");

  return (templates ?? []).map(mapTemplate);
}

export type FeatureTag = { id: string; title: string };

export async function getFeatureTags(): Promise<FeatureTag[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("template_feature_tags")
    .select("id, title")
    .order("title");
  return data ?? [];
}
