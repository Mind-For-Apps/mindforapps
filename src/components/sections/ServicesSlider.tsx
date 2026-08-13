"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import { Autoplay } from "swiper/modules";
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
            className="h-30 w-auto"
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
            className="h-30 w-auto -scale-x-100"
          />
        </button>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Autoplay]}
        loop
        loopAdditionalSlides={1}
        speed={1000}
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
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
            <div className="@container flex h-full w-[clamp(300px,60vw,800px)] min-w-0 gap-4 bg-white p-3 shadow-[0px_4px_19.3px_0px_rgba(0,0,0,0.08)] min-[800px]:min-h-127.5 @min-[600px]:gap-6 @min-[600px]:p-4">
              <div className="flex w-16 shrink-0 items-start justify-center rounded bg-brand-gradient pt-6 @min-[600px]:w-20 @min-[600px]:pt-8">
                {service.iconUrl && (
                  <Image
                    src={service.iconUrl}
                    alt=""
                    width={40}
                    height={40}
                    className="size-8 object-contain @min-[600px]:size-9"
                  />
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-4 py-4 pr-2 @min-[600px]:flex-row @min-[600px]:items-start @min-[600px]:justify-between @min-[600px]:gap-6 @min-[600px]:py-6 @min-[600px]:pr-6">
                <div className="flex min-w-0 flex-1 flex-col gap-3 @min-[600px]:gap-4">
                  <h3 className="text-xl font-bold tracking-[-0.4px] text-black @min-[600px]:text-3xl">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="text-sm text-brand-gray @min-[600px]:text-base">
                      {service.description}
                    </p>
                  )}
                  {service.whatsIncluded.length > 0 && (
                    <div className="flex flex-col gap-2 @min-[600px]:gap-3">
                      <p className="text-sm font-semibold text-black @min-[600px]:text-base">
                        What&apos;s included:
                      </p>
                      <ul className="flex flex-col gap-1.5 @min-[600px]:gap-2">
                        {service.whatsIncluded.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-brand-gray @min-[600px]:text-base"
                          >
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-brand-gray" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex shrink-0 flex-col items-center justify-center gap-6 @min-[600px]:w-56 @min-[600px]:gap-6">
                  {service.pictureUrl && (
                    <div className="relative aspect-233/174 w-full shrink-0 overflow-hidden rounded-2xl bg-brand-surface max-w-75">
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
                    <div className="grid w-full grid-cols-2 gap-2 @min-[600px]:gap-2.5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-brand-surface px-3 py-1.5 text-center text-xs font-medium text-black @min-[600px]:px-3.5 @min-[600px]:py-2 @min-[600px]:text-sm @min-[600px]:font-semibold"
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