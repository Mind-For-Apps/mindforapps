import Link from "next/link";
import { getCaseStudySlides } from "@/lib/case-studies";
import { CaseStudySlider } from "./CaseStudySlider";

export async function CaseStudies() {
  const slides = await getCaseStudySlides();

  if (slides.length === 0) return null;

  return (
    <section className="flex flex-col items-center gap-8 bg-black py-16 sm:py-15">
      <div className="flex h-15 items-center rounded-full border-[3px] border-brand-purple px-8 sm:px-7 max-w-[320px]">
        <Link
          href="/case-studies"
          className="text-brand-gradient cursor-pointer text-2xl font-medium sm:text-[31px]"
        >
          Case Studies
        </Link>
      </div>

      <CaseStudySlider slides={slides} />
    </section>
  );
}
