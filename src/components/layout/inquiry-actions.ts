"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitProjectInquiry(formData: FormData) {
  const supabase = await createClient();

  const filePaths = formData.getAll("file_paths") as string[];

  const { error } = await supabase.from("project_inquiries").insert({
    stage: formData.get("stage") as string,
    budget: (formData.get("budget") as string) || null,
    name: (formData.get("name") as string)?.trim(),
    email: (formData.get("email") as string)?.trim(),
    project_title: (formData.get("project_title") as string) || null,
    message: (formData.get("message") as string) || null,
    file_paths: filePaths.filter(Boolean),
  });

  if (error) {
    throw new Error(error.message);
  }
}
