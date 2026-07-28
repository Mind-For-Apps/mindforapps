import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SolutionForm } from "../SolutionForm";
import { updateSolution } from "../actions";
import { getToolOptions } from "../lookups";

export default async function EditSolutionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [
    { data: solution },
    { data: solutionTools },
    { data: categories },
    { data: includedFeaturesRows },
    tools,
  ] = await Promise.all([
    supabase.from("solutions").select("*").eq("id", id).single(),
    supabase.from("solution_tools").select("tool_id").eq("solution_id", id),
    supabase
      .from("solution_feature_categories")
      .select("id, name, sort_order, solution_feature_labels(title, color, bg_color, sort_order)")
      .eq("solution_id", id)
      .order("sort_order"),
    supabase
      .from("solution_included_features")
      .select("title, subtitle, icon_url, tags")
      .eq("solution_id", id)
      .order("sort_order"),
    getToolOptions(),
  ]);

  if (!solution) {
    notFound();
  }

  const featureCategories = (categories ?? []).map((c) => ({
    name: c.name,
    labels: (c.solution_feature_labels ?? [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((l) => ({
        title: l.title,
        color: l.color ?? "",
        bgColor: l.bg_color ?? "",
      })),
  }));

  const includedFeatures = (includedFeaturesRows ?? []).map((f) => ({
    title: f.title,
    subtitle: f.subtitle ?? "",
    iconUrl: f.icon_url ?? "",
    tags: (f.tags ?? []).join(", "),
  }));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-black">Edit Solution</h1>
      <SolutionForm
        action={updateSolution.bind(null, id)}
        solution={solution}
        tools={tools}
        selectedToolIds={(solutionTools ?? []).map((t) => t.tool_id)}
        featureCategories={featureCategories}
        includedFeatures={includedFeatures}
      />
    </div>
  );
}
