import { createClient } from "@/lib/supabase/server";

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export async function getAllFaqs(): Promise<Faq[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("faqs").select("*").order("sort_order");
  return data ?? [];
}

export async function getIndexFaqs(): Promise<Faq[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faqs")
    .select("*")
    .eq("show_on_index", true)
    .order("sort_order");
  return data ?? [];
}

export async function getRealEstateFaqs(): Promise<Faq[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faqs")
    .select("*")
    .not("real_estate_sort_order", "is", null)
    .order("real_estate_sort_order");
  return data ?? [];
}

export async function getServiceBookingFaqs(): Promise<Faq[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faqs")
    .select("*")
    .not("service_booking_sort_order", "is", null)
    .order("service_booking_sort_order");
  return data ?? [];
}

export async function getFreeSeoAuditFaqs(): Promise<Faq[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faqs")
    .select("*")
    .not("free_seo_audit_sort_order", "is", null)
    .order("free_seo_audit_sort_order");
  return data ?? [];
}
