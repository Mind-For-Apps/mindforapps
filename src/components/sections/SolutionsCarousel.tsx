"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { BookConsultationButton } from "@/components/BookConsultationButton";

type SolutionPill = {
  id: string;
  title: string;
  price_label: string | null;
  is_estimate_link: boolean;
  tags: string[];
  more_count: number;
};

export function SolutionsCarousel({
  solutions,
}: {
  solutions: SolutionPill[];
}) {
  const swiperRef = useRef<SwiperRef>(null);

  // Swiper's loop mode needs enough real slides to duplicate cleanly at the
  // widest breakpoint (slidesPerView up to 4) — with only a handful of
  // solutions, looping breaks (stalls at the last slide, stray slide
  // fragments) unless the source list is padded out first.
  const loopSlides =
    solutions.length > 0 && solutions.length < 12
      ? [...solutions, ...solutions, ...solutions]
      : solutions;

  return (
    <div className="relative w-full">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay]}
        loop
        loopAdditionalSlides={5}
        speed={800}
        slidesPerView={1}
        spaceBetween={40}
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        breakpoints={{
          800: { slidesPerView: 1.5 },
          1000: { slidesPerView: 2 },
          1200: { slidesPerView: 2.2 },
          1550: { slidesPerView: 3 },
          2000: { slidesPerView: 4 },
        }}
        // className="w-full! px-6! sm:px-25!"
        className="w-full! px-5!"
      >
        {loopSlides.map((solution, i) => (
          <SwiperSlide key={`${solution.id}-${i}`} style={{ height: "auto" }}>
            <div className="flex h-full w-full min-h-87.5 flex-col gap-6 rounded-t-[25px] bg-black px-8 py-9">
              <div className="flex flex-col gap-1">
                <p className="text-4xl font-bold tracking-[-0.77px] text-white">
                  {solution.title}
                </p>
                {solution.price_label && (
                  <p className="text-2xl font-medium tracking-[-0.55px] text-white">
                    {solution.price_label}
                  </p>
                )}
                {solution.is_estimate_link && (
                  <BookConsultationButton className="self-start text-lg font-medium tracking-[-0.22px] text-brand-accent underline">
                    Get Your Estimation
                  </BookConsultationButton>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {solution.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#e9e9e9] px-2 py-2 text-xs font-medium tracking-[-0.165px] text-black"
                  >
                    {tag}
                  </span>
                ))}
                {solution.more_count > 0 && (
                  <span className="rounded-full bg-[#e9e9e9] px-2 py-2 text-xs font-medium tracking-[-0.165px] text-black">
                    +{solution.more_count}
                  </span>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        aria-label="Previous solution"
        disabled={solutions.length < 2}
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-[0px_4px_19.3px_0px_rgba(0,0,0,0.14)] disabled:opacity-30 sm:block"
      >
        <Image unoptimized src="/images/nav-arrow-left.svg" alt="" width={20} height={20} className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => swiperRef.current?.swiper.slideNext()}
        aria-label="Next solution"
        disabled={solutions.length < 2}
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-[0px_4px_19.3px_0px_rgba(0,0,0,0.14)] disabled:opacity-30 sm:block"
      >
        <Image unoptimized src="/images/nav-arrow-right.svg" alt="" width={20} height={20} className="size-5 -scale-x-100" />
      </button>
    </div>
  );
}
