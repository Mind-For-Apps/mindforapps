"use server";

import { createClient } from "@/lib/supabase/server";

// Visitors naturally type "mindforapps.com" without a scheme — the input
// accepts that (plain text, not type="url") and this fills in "https://" so
// what lands in the DB is always a real, clickable absolute URL.
function normalizeWebsiteUrl(raw: string): string {
  const trimmed = raw.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export async function submitAuditInquiry(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("audit_inquiries").insert({
    website_url: normalizeWebsiteUrl(formData.get("website_url") as string),
    name: (formData.get("name") as string)?.trim(),
    email: (formData.get("email") as string)?.trim(),
    goal: (formData.get("goal") as string)?.trim(),
    win: (formData.get("win") as string) || null,
    markets: (formData.get("markets") as string) || null,
    competitors: (formData.get("competitors") as string) || null,
    company_size: (formData.get("company_size") as string) || null,
  });

  if (error) {
    throw new Error(error.message);
  }
}
