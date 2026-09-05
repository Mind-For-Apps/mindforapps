import { createClient } from "@/lib/supabase/server";

export type TrustBadge = {
  id: string;
  text: string;
  description: string | null;
  iconUrl: string | null;
};

export async function getTrustBadges(
  page: "index" | "solutions",
): Promise<TrustBadge[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("trust_badges")
    .select("*")
    .in("type", [page, "both"])
    .order("sort_order");

  return (data ?? []).map((row) => ({
    id: row.id,
    text: row.text,
    description: row.description,
    iconUrl: row.icon_url,
  }));
}
