import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { getAllFaqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQ — Mind For Apps",
  description:
    "Clear answers about no-code app development, Bubble services, timelines, pricing, and scalability.",
};

export default async function FaqPage() {
  const faqs = await getAllFaqs();

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="flex flex-col items-center gap-10 bg-brand-surface px-6 py-16 sm:px-[100px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-3xl font-bold text-black sm:text-[45px]">
              Frequently Asked Questions
            </h1>
            <p className="max-w-[600px] text-base text-black/60 sm:text-lg">
              Clear answers about no-code app development, Bubble services,
              timelines, pricing, and scalability.
            </p>
          </div>
          <FAQAccordion items={faqs} />
        </section>
      </main>
      <Footer />
    </>
  );
}
