"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import type { CaseStudySlide } from "@/lib/case-studies";
import { CaseStudyCard } from "./CaseStudyCard";

export function CaseStudySlider({ slides }: { slides: CaseStudySlide[] }) {
  const swiperRef = useRef<SwiperRef>(null);
  const [ready, setReady] = useState(false);

  return (
    <>
      <div className="flex w-full max-w-300 items-center justify-center gap-2 px-6 sm:gap-4.75 sm:px-25">
        <button
          type="button"
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          aria-label="Previous case study"
          disabled={slides.length < 2}
          className="hidden shrink-0 sm:block disabled:opacity-30"
        >
          <Image
            unoptimized
            src="/images/nav-arrow-left.svg"
            alt=""
            width={59}
            height={161}
            className="h-30 w-auto"
          />
        </button>
        <div className="flex flex-col items-center gap-3 py-5 text-center">
          <p className="text-2xl text-white sm:text-[32px]">
            Bubble No-Code Case Studies with Proven Business Results
          </p>
          <p className="max-w-152 text-base text-white sm:text-lg">
            Real case studies showcasing no-code success stories, project
            examples, and proven client results across industries.
          </p>
        </div>
        <button
          type="button"
          onClick={() => swiperRef.current?.swiper.slideNext()}
          aria-label="Next case study"
          disabled={slides.length < 2}
          className="hidden shrink-0 sm:block disabled:opacity-30"
        >
          <Image
            unoptimized
            src="/images/nav-arrow-right.svg"
            alt=""
            width={59}
            height={161}
            className="h-30 w-auto -scale-x-100"
          />
        </button>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Autoplay]}
        loop
        loopAdditionalSlides={0}
        speed={1000}
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        slidesPerView={1}
        spaceBetween={20}
        centeredSlides={true}
        breakpoints={{
          1500: { slidesPerView: 1.2, spaceBetween: 40 },
          1800: { slidesPerView: 1.5, spaceBetween: 80 },
        }}
        onInit={() => setReady(true)}
        className={`w-full! px-6! sm:px-5! transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.id} style={{ height: "auto" }}>
            <CaseStudyCard
              slide={slide}
              priority={i === 0 || i === slides.length - 1}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
