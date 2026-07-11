import { createClient } from "@/lib/supabase/server";

export async function getLookupOptions() {
  const supabase = await createClient();
  const [services, tools, teamInvolvementTypes] = await Promise.all([
    supabase.from("services").select("id, name").order("sort_order"),
    supabase.from("tools").select("id, name").order("sort_order"),
    supabase
      .from("team_involvement_types")
      .select("id, name")
      .order("sort_order"),
  ]);

  return {
    services: services.data ?? [],
    tools: tools.data ?? [],
    teamInvolvementTypes: teamInvolvementTypes.data ?? [],
  };
}
