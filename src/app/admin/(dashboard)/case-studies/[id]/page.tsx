import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CaseStudyForm } from "../CaseStudyForm";
import { updateCaseStudy } from "../actions";
import { getLookupOptions } from "../lookups";

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [
    { data: caseStudy },
    { data: services },
    { data: tools },
    { data: teamInvolvement },
    { data: keyFeatures },
    lookupOptions,
  ] = await Promise.all([
    supabase.from("case_studies").select("*").eq("id", id).single(),
    supabase.from("case_study_services").select("service_id").eq("case_study_id", id),
    supabase.from("case_study_tools").select("tool_id").eq("case_study_id", id),
    supabase
      .from("case_study_team_involvement")
      .select("team_involvement_type_id")
      .eq("case_study_id", id),
    supabase
      .from("case_study_key_features")
      .select("label, icon_url")
      .eq("case_study_id", id)
      .order("sort_order"),
    getLookupOptions(),
  ]);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-black">Edit Case Study</h1>
      <CaseStudyForm
        action={updateCaseStudy.bind(null, id)}
        caseStudy={caseStudy}
        services={lookupOptions.services}
        tools={lookupOptions.tools}
        teamInvolvementTypes={lookupOptions.teamInvolvementTypes}
        selectedServiceIds={(services ?? []).map((s) => s.service_id)}
        selectedToolIds={(tools ?? []).map((t) => t.tool_id)}
        selectedTeamIds={(teamInvolvement ?? []).map((t) => t.team_involvement_type_id)}
        keyFeatures={(keyFeatures ?? []).map((f) => ({
          label: f.label,
          iconUrl: f.icon_url ?? "",
        }))}
      />
    </div>
  );
}
