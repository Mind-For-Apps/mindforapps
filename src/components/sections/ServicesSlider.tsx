"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import "swiper/css";
import type { ServiceCardData } from "@/lib/services";

export function ServicesSlider({ services }: { services: ServiceCardData[] }) {
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <>
      <div className="flex w-full max-w-300 items-center justify-center gap-2 sm:gap-4.75">
        <button
          type="button"
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          aria-label="Previous service"
          disabled={services.length < 2}
          className="hidden shrink-0 sm:block disabled:opacity-30"
        >
          <Image
            src="/images/nav-arrow-left.svg"
            alt=""
            width={59}
            height={161}
            className="h-24 w-auto"
          />
        </button>
        <div className="flex flex-col items-center gap-3 py-5 text-center">
          <h2 className="text-3xl font-semibold text-black sm:text-[40px]">
            Services
          </h2>
          <p className="max-w-175 text-base text-brand-gray sm:text-lg">
            End-to-end no-code development services. From product discovery
            and UX/UI design to MVP development and scalable app growth.
          </p>
        </div>
        <button
          type="button"
          onClick={() => swiperRef.current?.swiper.slideNext()}
          aria-label="Next service"
          disabled={services.length < 2}
          className="hidden shrink-0 sm:block disabled:opacity-30"
        >
          <Image
            src="/images/nav-arrow-right.svg"
            alt=""
            width={59}
            height={161}
            className="h-24 w-auto -scale-x-100"
          />
        </button>
      </div>

      <Swiper
        ref={swiperRef}
        loop
        loopAdditionalSlides={1}
        speed={1000}
        slidesPerView="auto"
        spaceBetween={24}
        className="w-full! px-6! sm:px-25!"
      >
        {services.map((service) => (
          <SwiperSlide
            key={service.id}
            style={{ width: "auto", height: "auto" }}
            className="border-2 border-transparent transition-colors hover:border-2 hover:border-brand-accent"
          >
            {/* <div className="flex h-full w-[320px] gap-4 rounded-[5px] bg-white p-3 shadow-[0px_4px_19.3px_0px_rgba(0,0,0,0.08)] sm:w-200 sm:gap-6 sm:p-4"> */}
            <div className="flex h-full w-[320px] gap-4 bg-white p-3 shadow-[0px_4px_19.3px_0px_rgba(0,0,0,0.08)] sm:w-200 sm:gap-6 sm:p-4">
              <div className="flex w-16 shrink-0 items-start justify-center rounded bg-brand-gradient pt-6 sm:w-20 sm:pt-8">
                {service.iconUrl && (
                  <Image
                    src={service.iconUrl}
                    alt=""
                    width={40}
                    height={40}
                    className="size-8 object-contain sm:size-9"
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col gap-4 py-4 pr-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:py-6 sm:pr-6">
                <div className="flex flex-1 flex-col gap-3 sm:gap-4">
                  <h3 className="text-xl font-bold tracking-[-0.4px] text-black sm:text-3xl">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="text-sm text-brand-gray sm:text-base">
                      {service.description}
                    </p>
                  )}
                  {service.whatsIncluded.length > 0 && (
                    <div className="flex flex-col gap-2 sm:gap-3">
                      <p className="text-sm font-semibold text-black sm:text-base">
                        What&apos;s included:
                      </p>
                      <ul className="flex flex-col gap-1.5 sm:gap-2">
                        {service.whatsIncluded.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-brand-gray sm:text-base"
                          >
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-brand-gray" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex shrink-0 flex-col items-center gap-3 sm:w-56 sm:gap-3">
                  {service.pictureUrl && (
                    <div className="relative h-32.5 w-full overflow-hidden rounded-2xl bg-brand-surface sm:h-40">
                      <Image
                        src={service.pictureUrl}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 224px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  {service.tags.length > 0 && (
                    <div className="grid w-full grid-cols-2 gap-2 sm:gap-2.5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-brand-surface px-3 py-1.5 text-center text-xs font-medium text-black sm:px-3.5 sm:py-2 sm:text-sm sm:font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
