"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function getFaqFields(formData: FormData) {
  const realEstateNr = formData.get("real_estate_sort_order") as string;

  return {
    question: (formData.get("question") as string)?.trim(),
    answer: (formData.get("answer") as string)?.trim(),
    show_on_index: formData.get("show_on_index") === "on",
    real_estate_sort_order: realEstateNr ? Number(realEstateNr) : null,
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

export async function createFaq(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("faqs").insert(getFaqFields(formData));

  if (error) throw new Error(error.message);

  revalidatePath("/admin/faqs");
  revalidatePath("/");
  revalidatePath("/faq");
  revalidatePath("/solutions/real-estate");
  redirect("/admin/faqs");
}

export async function updateFaq(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("faqs")
    .update(getFaqFields(formData))
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/faqs");
  revalidatePath("/");
  revalidatePath("/faq");
  revalidatePath("/solutions/real-estate");
  redirect("/admin/faqs");
}

export async function deleteFaq(id: string) {
  const supabase = await createClient();
  await supabase.from("faqs").delete().eq("id", id);
  revalidatePath("/admin/faqs");
  revalidatePath("/");
  revalidatePath("/faq");
  revalidatePath("/solutions/real-estate");
}
