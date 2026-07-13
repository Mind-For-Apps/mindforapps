import { createClient } from "@/lib/supabase/server";

export async function getToolOptions() {
  const supabase = await createClient();
  const { data } = await supabase.from("tools").select("id, name").order("sort_order");
  return data ?? [];
}
