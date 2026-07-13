import { createClient } from "@/lib/supabase/server";

export type ServiceCardData = {
  id: string;
  name: string;
  description: string | null;
  iconUrl: string | null;
  pictureUrl: string | null;
  tags: string[];
  whatsIncluded: string[];
};

export async function getServiceCards(): Promise<ServiceCardData[]> {
  const supabase = await createClient();

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("sort_order");

  if (!services) return [];

  return services.map((service) => ({
    id: service.id,
    name: service.name,
    description: service.description,
    iconUrl: service.icon_url,
    pictureUrl: service.picture_url,
    tags: service.tags ?? [],
    whatsIncluded: service.whats_included ?? [],
  }));
}
