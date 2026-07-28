"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleInquiryRead(id: string, isRead: boolean) {
  const supabase = await createClient();
  await supabase
    .from("project_inquiries")
    .update({ is_read: !isRead })
    .eq("id", id);
  revalidatePath("/admin/inquiries");
}

export async function deleteInquiry(id: string) {
  const supabase = await createClient();
  await supabase.from("project_inquiries").delete().eq("id", id);
  revalidatePath("/admin/inquiries");
}
