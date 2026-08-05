import { getTestimonials } from "@/lib/testimonials";
import { TestimonialsSlider } from "./TestimonialsSlider";

export async function Testimonials() {
  const testimonials = await getTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="flex flex-col items-center gap-8 bg-black px-6 py-16 sm:px-25">
      <TestimonialsSlider items={testimonials} />
    </section>
  );
}
