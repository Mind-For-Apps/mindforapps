import { createClient } from "@/lib/supabase/server";

export type CategoryData = {
  id: string;
  title: string;
  shortTitle: string;
  iconUrl: string | null;
};

export async function getCategories(): Promise<CategoryData[]> {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  if (!categories) return [];

  return categories.map((category) => ({
    id: category.id,
    title: category.title,
    shortTitle: category.short_title,
    iconUrl: category.icon_url,
  }));
}
