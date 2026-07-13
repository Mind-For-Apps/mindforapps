import { createClient } from "@/lib/supabase/server";

export async function getTemplateLookupOptions() {
  const supabase = await createClient();
  const [categories, featureTags] = await Promise.all([
    supabase.from("categories").select("id, title").order("sort_order"),
    supabase.from("template_feature_tags").select("id, title").order("title"),
  ]);

  return {
    categories: (categories.data ?? []).map((c) => ({ id: c.id, name: c.title })),
    featureTags: (featureTags.data ?? []).map((t) => ({ id: t.id, name: t.title })),
  };
}
