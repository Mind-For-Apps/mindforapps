"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function getTestimonialFields(formData: FormData) {
  return {
    name: (formData.get("name") as string)?.trim(),
    role: (formData.get("role") as string) || null,
    company: (formData.get("company") as string) || null,
    quote: (formData.get("quote") as string)?.trim(),
    photo_url: (formData.get("photo_url") as string) || null,
    is_published: formData.get("is_published") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

export async function createTestimonial(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("testimonials")
    .insert(getTestimonialFields(formData));

  if (error) throw new Error(error.message);

  revalidatePath("/admin/testimonials");
  revalidatePath("/solutions");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("testimonials")
    .update(getTestimonialFields(formData))
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/testimonials");
  revalidatePath("/solutions");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/solutions");
}
