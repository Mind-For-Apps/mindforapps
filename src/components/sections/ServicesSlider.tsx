"use client";

import { useRef } from "react";
import Image from "next/image";
import type { ServiceCardData } from "@/lib/services";

export function ServicesSlider({ services }: { services: ServiceCardData[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function getStep() {
    const el = scrollRef.current;
    if (!el) return 400;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = 24;
    return card ? card.getBoundingClientRect().width + gap : 400;
  }

  function scroll(direction: 1 | -1) {
    scrollRef.current?.scrollBy({
      left: direction * getStep(),
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="flex w-full max-w-[1200px] items-center justify-center gap-2 sm:gap-[19px]">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Previous service"
          disabled={services.length < 2}
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
          <h2 className="text-3xl font-semibold text-black sm:text-[40px]">
            Services
          </h2>
          <p className="max-w-[700px] text-base text-brand-gray sm:text-lg">
            End-to-end no-code development services. From product discovery
            and UX/UI design to MVP development and scalable app growth.
          </p>
        </div>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Next service"
          disabled={services.length < 2}
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

      <div
        ref={scrollRef}
        className="scrollbar-hide flex w-full snap-x snap-mandatory gap-6 overflow-x-auto px-6 sm:px-[100px]"
      >
        {services.map((service) => (
          <div
            key={service.id}
            data-card
            className="flex w-[320px] shrink-0 snap-start gap-4 rounded-[25px] bg-white p-3 shadow-[0px_4px_19.3px_0px_rgba(0,0,0,0.08)] sm:w-[620px] sm:gap-6 sm:p-4"
          >
            <div className="flex w-16 shrink-0 items-start justify-center rounded-2xl bg-brand-gradient pt-6 sm:w-20">
              {service.iconUrl && (
                <div className="flex size-11 items-center justify-center rounded-full bg-white/20">
                  <Image
                    src={service.iconUrl}
                    alt=""
                    width={24}
                    height={24}
                    className="size-6 object-contain"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-4 py-4 pr-2 sm:flex-row sm:gap-6 sm:py-6 sm:pr-4">
              <div className="flex flex-1 flex-col gap-3">
                <h3 className="text-xl font-bold tracking-[-0.4px] text-black sm:text-2xl">
                  {service.name}
                </h3>
                {service.description && (
                  <p className="text-sm text-brand-gray sm:text-base">
                    {service.description}
                  </p>
                )}
                {service.whatsIncluded.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-black sm:text-base">
                      What&apos;s included:
                    </p>
                    <ul className="flex flex-col gap-1.5">
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

              <div className="flex shrink-0 flex-col items-center gap-3 sm:w-[190px]">
                {service.pictureUrl && (
                  <div className="relative h-[130px] w-full overflow-hidden rounded-2xl bg-brand-surface">
                    <Image
                      src={service.pictureUrl}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {service.tags.length > 0 && (
                  <div className="grid w-full grid-cols-2 gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-brand-surface px-3 py-1.5 text-center text-xs font-medium text-black sm:text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
