import { createClient } from "@/lib/supabase/server";
import { LookupSection } from "./LookupSection";
import { CategoriesSection } from "./CategoriesSection";

export default async function ReferenceDataPage() {
  const supabase = await createClient();

  const [services, tools, teamInvolvement, categories] = await Promise.all([
    supabase.from("services").select("*").order("sort_order"),
    supabase.from("tools").select("*").order("sort_order"),
    supabase.from("team_involvement_types").select("*").order("sort_order"),
    supabase.from("categories").select("*").order("sort_order"),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-black">Reference Data</h1>
      <p className="text-sm text-brand-gray">
        Shared lists reused across case studies and templates (Services,
        Tools, Team Involvement, Categories).
      </p>

      <LookupSection
        table="services"
        title="Services"
        items={services.data ?? []}
        hasIcon
      />
      <LookupSection
        table="tools"
        title="Tools"
        items={tools.data ?? []}
        hasIcon
      />
      <LookupSection
        table="team_involvement_types"
        title="Team Involvement"
        items={teamInvolvement.data ?? []}
        hasIcon={false}
      />
      <CategoriesSection items={categories.data ?? []} />
    </div>
  );
}
