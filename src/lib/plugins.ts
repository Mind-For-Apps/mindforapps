import { createClient } from "@/lib/supabase/server";

export { formatPluginPrice } from "@/lib/plugin-price";

export type PluginCardData = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  description: string | null;
  demoUrl: string | null;
  marketUrl: string | null;
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
  market_url: string | null;
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
    marketUrl: plugin.market_url,
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
    .order("sort_order", { ascending: false });

  return (plugins ?? []).map(mapPlugin);
}

export type PluginDetail = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  description: string | null;
  installationSteps: string[];
  demoUrl: string | null;
  editorUrl: string | null;
  marketUrl: string | null;
  logoUrl: string | null;
  priceMonthly: number | null;
  priceOneTime: number | null;
  seoTitle: string | null;
  seoDescription: string | null;
  categories: { id: string; title: string }[];
};

export async function getPluginBySlug(slug: string): Promise<PluginDetail | null> {
  const supabase = await createClient();

  const { data: plugin, error } = await supabase
    .from("plugins")
    .select("*, plugin_category_links(plugin_categories(id, title))")
    .eq("slug", slug)
    .eq("is_public", true)
    .maybeSingle();

  if (error) {
    console.error(`getPluginBySlug("${slug}") query failed:`, error.message);
  }
  if (!plugin) return null;

  return {
    id: plugin.id,
    slug: plugin.slug,
    name: plugin.name,
    shortDescription: plugin.short_description,
    description: plugin.description,
    installationSteps: plugin.installation_steps ?? [],
    demoUrl: plugin.demo_url,
    editorUrl: plugin.editor_url,
    marketUrl: plugin.market_url,
    logoUrl: plugin.logo_url,
    priceMonthly: plugin.price_monthly,
    priceOneTime: plugin.price_one_time,
    seoTitle: plugin.seo_title,
    seoDescription: plugin.seo_description,
    categories: (
      plugin.plugin_category_links as {
        plugin_categories: { id: string; title: string } | null;
      }[]
    )
      .map((l) => l.plugin_categories)
      .filter((c): c is { id: string; title: string } => !!c),
  };
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
