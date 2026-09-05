"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function getTrustBadgeFields(formData: FormData) {
  return {
    text: (formData.get("text") as string)?.trim(),
    description: (formData.get("description") as string) || null,
    icon_url: (formData.get("icon_url") as string) || null,
    type: (formData.get("type") as string) || "both",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

export async function createTrustBadge(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("trust_badges")
    .insert(getTrustBadgeFields(formData));

  if (error) throw new Error(error.message);

  revalidatePath("/admin/trust-badges");
  revalidatePath("/");
  redirect("/admin/trust-badges");
}

export async function updateTrustBadge(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("trust_badges")
    .update(getTrustBadgeFields(formData))
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/trust-badges");
  revalidatePath("/");
  redirect("/admin/trust-badges");
}

export async function deleteTrustBadge(id: string) {
  const supabase = await createClient();
  await supabase.from("trust_badges").delete().eq("id", id);
  revalidatePath("/admin/trust-badges");
  revalidatePath("/");
}
