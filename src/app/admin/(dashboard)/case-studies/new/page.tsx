import { CaseStudyForm } from "../CaseStudyForm";
import { createCaseStudy } from "../actions";
import { getLookupOptions } from "../lookups";

export default async function NewCaseStudyPage() {
  const { services, tools, teamInvolvementTypes } = await getLookupOptions();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-black">New Case Study</h1>
      <CaseStudyForm
        action={createCaseStudy}
        services={services}
        tools={tools}
        teamInvolvementTypes={teamInvolvementTypes}
        selectedServiceIds={[]}
        selectedToolIds={[]}
        selectedTeamIds={[]}
        keyFeatures={[]}
        webArchitecture={[]}
      />
    </div>
  );
}
