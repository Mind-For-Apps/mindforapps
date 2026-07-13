import { SolutionForm } from "../SolutionForm";
import { createSolution } from "../actions";
import { getToolOptions } from "../lookups";

export default async function NewSolutionPage() {
  const tools = await getToolOptions();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-black">New Solution</h1>
      <SolutionForm
        action={createSolution}
        tools={tools}
        selectedToolIds={[]}
        featureCategories={[]}
      />
    </div>
  );
}
