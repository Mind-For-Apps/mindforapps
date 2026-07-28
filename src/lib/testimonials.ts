import { createClient } from "@/lib/supabase/server";

export type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  photoUrl: string | null;
};

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    role: row.role,
    company: row.company,
    quote: row.quote,
    photoUrl: row.photo_url,
  }));
}
