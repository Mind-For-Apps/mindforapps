import { createClient } from "@/lib/supabase/server";

export type PluginCardData = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  description: string | null;
  demoUrl: string | null;
  logoUrl: string | null;
  priceMonthly: number | null;
  priceOneTime: number | null;
  categoryIds: string[];
  createdAt: string;
};

function mapPlugin(plugin: {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  description: string | null;
  demo_url: string | null;
  logo_url: string | null;
  price_monthly: number | null;
  price_one_time: number | null;
  created_at: string;
  plugin_category_links: { category_id: string }[];
}): PluginCardData {
  return {
    id: plugin.id,
    slug: plugin.slug,
    name: plugin.name,
    shortDescription: plugin.short_description,
    description: plugin.description,
    demoUrl: plugin.demo_url,
    logoUrl: plugin.logo_url,
    priceMonthly: plugin.price_monthly,
    priceOneTime: plugin.price_one_time,
    categoryIds: (plugin.plugin_category_links ?? []).map((l) => l.category_id),
    createdAt: plugin.created_at,
  };
}

export async function getPluginCards(): Promise<PluginCardData[]> {
  const supabase = await createClient();

  const { data: plugins } = await supabase
    .from("plugins")
    .select("*, plugin_category_links(category_id)")
    .eq("is_public", true)
    .order("sort_order");

  return (plugins ?? []).map(mapPlugin);
}

export type PluginCategory = { id: string; title: string };

export async function getPluginCategories(): Promise<PluginCategory[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("plugin_categories")
    .select("id, title")
    .order("title");
  return data ?? [];
}
