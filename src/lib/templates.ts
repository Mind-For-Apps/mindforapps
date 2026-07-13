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
};

export async function getTemplateCards(): Promise<TemplateCardData[]> {
  const supabase = await createClient();

  const { data: templates } = await supabase
    .from("templates")
    .select("*, template_categories(category_id)")
    .eq("is_public", true)
    .order("sort_order");

  if (!templates) return [];

  return templates.map((template) => ({
    id: template.id,
    slug: template.slug,
    title: template.title,
    descriptionShort: template.description_short,
    price: template.price,
    imageUrl: (template.images ?? [])[0] ?? null,
    shopUrl: template.shop_url,
    demoPreviewUrl: template.demo_preview_url,
    categoryIds: (
      template.template_categories as { category_id: string }[]
    ).map((tc) => tc.category_id),
  }));
}
