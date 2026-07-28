import Link from "next/link";
import { FAQAccordion } from "./FAQAccordion";
import { getIndexFaqs } from "@/lib/faqs";

export async function FAQ() {
  const faqs = await getIndexFaqs();

  if (faqs.length === 0) return null;

  return (
    <section className="flex flex-col items-center gap-10 bg-brand-surface px-6 py-16 text-center sm:px-[100px]">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-3xl font-bold text-black sm:text-[40px]">
          Frequently Asked Questions
        </h2>
        <p className="max-w-[600px] text-base text-black/60 sm:text-lg">
          Clear answers about no-code app development, Bubble services,
          timelines, pricing, and scalability.
        </p>
      </div>
      <FAQAccordion items={faqs} />
      <Link
        href="/faq"
        className="text-sm font-medium text-brand-accent hover:underline"
      >
        View all FAQ&rsquo;s
      </Link>
    </section>
  );
}
