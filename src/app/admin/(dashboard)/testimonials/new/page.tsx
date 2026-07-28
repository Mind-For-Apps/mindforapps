import { TestimonialForm } from "../TestimonialForm";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-black">New Testimonial</h1>
      <TestimonialForm action={createTestimonial} />
    </div>
  );
}
