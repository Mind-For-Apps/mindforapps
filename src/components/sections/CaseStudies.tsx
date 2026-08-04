import { getCaseStudySlides } from "@/lib/case-studies";
import { CaseStudySlider } from "./CaseStudySlider";

export async function CaseStudies() {
  const slides = await getCaseStudySlides();

  if (slides.length === 0) return null;

  return (
    <section className="flex flex-col items-center gap-8 bg-black px-6 py-16 sm:px-25 sm:py-15">
      <div className="flex h-[87px] items-center rounded-full border-[3px] border-brand-purple px-8 sm:px-11">
        <span className="text-brand-gradient text-2xl font-medium sm:text-[45px]">
          Case Studies
        </span>
      </div>

      <CaseStudySlider slides={slides} />
    </section>
  );
}
