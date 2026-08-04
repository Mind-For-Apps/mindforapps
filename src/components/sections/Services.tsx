import { getServiceCards } from "@/lib/services";
import { ServicesSlider } from "./ServicesSlider";

export async function Services() {
  const services = await getServiceCards();

  if (services.length === 0) return null;

  return (
    <section className="flex flex-col items-center gap-8 bg-brand-surface py-16 sm:py-15">
      <ServicesSlider services={services} />
    </section>
  );
}
