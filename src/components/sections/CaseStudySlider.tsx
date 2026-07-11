"use client";

import { useState } from "react";
import Image from "next/image";
import type { CaseStudySlide } from "@/lib/case-studies";
import { CaseStudyCard } from "./CaseStudyCard";

export function CaseStudySlider({ slides }: { slides: CaseStudySlide[] }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  function goPrev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }

  function goNext() {
    setIndex((i) => (i + 1) % slides.length);
  }

  return (
    <>
      <div className="flex w-full max-w-[1200px] items-center justify-center gap-2 sm:gap-[19px]">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous case study"
          disabled={slides.length < 2}
          className="hidden shrink-0 sm:block disabled:opacity-30"
        >
          <Image
            src="/images/arrow-left.svg"
            alt=""
            width={59}
            height={161}
            className="h-24 w-auto"
          />
        </button>
        <div className="flex flex-col items-center gap-3 py-5 text-center">
          <p className="text-2xl text-white sm:text-[32px]">
            Bubble No-Code Case Studies with Proven Business Results
          </p>
          <p className="max-w-[608px] text-base text-white sm:text-lg">
            Real case studies showcasing no-code success stories, project
            examples, and proven client results across industries.
          </p>
        </div>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next case study"
          disabled={slides.length < 2}
          className="hidden shrink-0 sm:block disabled:opacity-30"
        >
          <Image
            src="/images/arrow-right.svg"
            alt=""
            width={59}
            height={161}
            className="h-24 w-auto -scale-x-100"
          />
        </button>
      </div>

      <CaseStudyCard slide={slide} />
    </>
  );
}
