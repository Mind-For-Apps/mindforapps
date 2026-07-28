import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { getCaseStudySlides } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case Studies — Mind For Apps",
  description:
    "Real case studies showcasing no-code success stories, project examples, and proven client results across industries.",
};

export default async function CaseStudiesPage() {
  const slides = await getCaseStudySlides();

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="flex flex-col items-center gap-3 bg-brand-surface px-6 py-16 text-center sm:px-[100px]">
          <h1 className="text-3xl font-semibold text-black sm:text-[45px]">
            No-Code App &amp; MVP Case Studies
          </h1>
          <p className="max-w-[608px] text-base text-brand-gray sm:text-lg">
            Real case studies showcasing no-code success stories, project
            examples, and proven client results across industries.
          </p>
        </section>

        <section className="flex flex-col items-center gap-8 bg-black px-6 py-16 sm:px-[100px]">
          {slides.length === 0 ? (
            <p className="text-white">No case studies published yet.</p>
          ) : (
            slides.map((slide) => (
              <CaseStudyCard key={slide.id} slide={slide} />
            ))
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
