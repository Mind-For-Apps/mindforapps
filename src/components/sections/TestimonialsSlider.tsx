"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import type { Testimonial } from "@/lib/testimonials";

export function TestimonialsSlider({ items }: { items: Testimonial[] }) {
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <>
      <div className="flex w-full max-w-300 items-center justify-center gap-2 px-6 sm:gap-4.75 sm:px-25">
        <button
          type="button"
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          aria-label="Previous testimonial"
          disabled={items.length < 2}
          className="hidden shrink-0 sm:block disabled:opacity-30"
        >
          <Image
            src="/images/nav-arrow-left.svg"
            alt=""
            width={59}
            height={161}
            className="h-30 w-auto"
          />
        </button>
        <div className="flex flex-col items-center gap-3 py-5 text-center">
          <h2 className="text-2xl text-white sm:text-[40px] font-semibold">Testimonials</h2>
          <p className="max-w-152 text-base text-white sm:text-lg">
            Client reviews and real customer testimonials from startups and
            companies trusted worldwide.
          </p>
        </div>
        <button
          type="button"
          onClick={() => swiperRef.current?.swiper.slideNext()}
          aria-label="Next testimonial"
          disabled={items.length < 2}
          className="hidden shrink-0 sm:block disabled:opacity-30"
        >
          <Image
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
        loopAdditionalSlides={1}
        speed={800}
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        slidesPerView={1}
        spaceBetween={24}
        allowTouchMove
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full! px-6! sm:px-5!"
      >
        {items.map((t) => (
          <SwiperSlide key={t.id} style={{ height: "auto" }}>
            <div className="flex h-full w-full flex-col gap-6 rounded-[25px] bg-white p-6 sm:p-8">
              <div className="flex flex-1 flex-col gap-6">
                <div className="flex items-center gap-4 sm:gap-6">
                  {t.photoUrl ? (
                    <Image
                      src={t.photoUrl}
                      alt={t.name}
                      width={130}
                      height={130}
                      className="size-16 shrink-0 rounded-full object-cover sm:size-32.5"
                    />
                  ) : (
                    <div className="size-16 shrink-0 rounded-full bg-brand-surface sm:size-32.5" />
                  )}
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <p className="text-lg font-medium text-black sm:text-xl">
                      {t.name}
                    </p>
                    {t.role && (
                      <p className="text-sm text-[#8a8a8a] sm:text-base">
                        {t.role}
                      </p>
                    )}
                  </div>
                </div>
                <p className="line-clamp-4 text-sm leading-relaxed text-black sm:text-base">
                  {t.quote}
                </p>
              </div>
              {t.projectImageUrl || t.projectLogoUrl ? (
                <div className="flex items-center gap-4">
                  {t.projectImageUrl && (
                    <div className="relative h-19 w-25.25 shrink-0 overflow-hidden rounded-2xl shadow-[0px_2px_12px_0px_rgba(0,0,0,0.15)]">
                      <Image
                        src={t.projectImageUrl}
                        alt=""
                        fill
                        sizes="101px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    {t.projectLogoUrl && (
                      <div className="relative h-6 w-22.5">
                        <Image
                          src={t.projectLogoUrl}
                          alt=""
                          fill
                          sizes="90px"
                          className="object-contain object-left"
                        />
                      </div>
                    )}
                    {t.company && (
                      <p className="text-sm font-medium text-brand-accent sm:text-base">
                        {t.company}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                t.company && (
                  <p className="text-sm font-medium text-brand-accent sm:text-base">
                    {t.company}
                  </p>
                )
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
