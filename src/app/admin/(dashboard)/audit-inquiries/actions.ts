"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleAuditInquiryRead(id: string, isRead: boolean) {
  const supabase = await createClient();
  await supabase
    .from("audit_inquiries")
    .update({ is_read: !isRead })
    .eq("id", id);
  revalidatePath("/admin/audit-inquiries");
}

export async function deleteAuditInquiry(id: string) {
  const supabase = await createClient();
  await supabase.from("audit_inquiries").delete().eq("id", id);
  revalidatePath("/admin/audit-inquiries");
}
