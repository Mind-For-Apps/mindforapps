"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function getSolutionFields(formData: FormData) {
  return {
    title: (formData.get("title") as string)?.trim(),
    price_label: (formData.get("price_label") as string) || null,
    is_estimate_link: formData.get("is_estimate_link") === "on",
    tags: formData
      .getAll("tags")
      .map((v) => (v as string).trim())
      .filter(Boolean),
    more_count: Number(formData.get("more_count") ?? 0),
    is_published: formData.get("is_published") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

export async function createSolution(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("solutions")
    .insert(getSolutionFields(formData));

  if (error) throw new Error(error.message);

  revalidatePath("/admin/solutions");
  revalidatePath("/");
  redirect("/admin/solutions");
}

export async function updateSolution(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("solutions")
    .update(getSolutionFields(formData))
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/solutions");
  revalidatePath("/");
  redirect("/admin/solutions");
}

export async function deleteSolution(id: string) {
  const supabase = await createClient();
  await supabase.from("solutions").delete().eq("id", id);
  revalidatePath("/admin/solutions");
  revalidatePath("/");
}
