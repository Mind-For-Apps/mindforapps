import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SolutionForm } from "../SolutionForm";
import { updateSolution } from "../actions";

export default async function EditSolutionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: solution } = await supabase
    .from("solutions")
    .select("*")
    .eq("id", id)
    .single();

  if (!solution) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-black">Edit Solution</h1>
      <SolutionForm action={updateSolution.bind(null, id)} solution={solution} />
    </div>
  );
}
