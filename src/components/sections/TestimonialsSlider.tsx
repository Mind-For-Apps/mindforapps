"use client";

import { useState } from "react";
import Image from "next/image";
import type { Testimonial } from "@/lib/testimonials";

export function TestimonialsSlider({ items }: { items: Testimonial[] }) {
  const [start, setStart] = useState(0);
  const visible = 3;

  function goPrev() {
    setStart((s) => (s - 1 + items.length) % items.length);
  }

  function goNext() {
    setStart((s) => (s + 1) % items.length);
  }

  const shown = Array.from(
    { length: Math.min(visible, items.length) },
    (_, i) => items[(start + i) % items.length],
  );

  return (
    <>
      <div className="flex w-full max-w-[1200px] items-center justify-center gap-2 sm:gap-[19px]">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous testimonial"
          disabled={items.length < 2}
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
          <h2 className="text-2xl text-white sm:text-[32px]">Testimonials</h2>
          <p className="max-w-[608px] text-base text-white sm:text-lg">
            Client reviews and real customer testimonials from startups and
            companies trusted worldwide.
          </p>
        </div>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next testimonial"
          disabled={items.length < 2}
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

      <div className="grid w-full max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((t) => (
          <div
            key={t.id}
            className="flex flex-col gap-6 rounded-[25px] bg-white p-6 sm:p-8"
          >
            <div className="flex items-center gap-4 sm:gap-6">
              {t.photoUrl ? (
                <Image
                  src={t.photoUrl}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="size-16 shrink-0 rounded-full object-cover sm:size-20"
                />
              ) : (
                <div className="size-16 shrink-0 rounded-full bg-brand-surface sm:size-20" />
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
            <p className="text-sm leading-relaxed text-black sm:text-base">
              {t.quote}
            </p>
            {t.projectImageUrl || t.projectLogoUrl ? (
              <div className="flex items-center gap-4">
                {t.projectImageUrl && (
                  <div className="relative h-[76px] w-[101px] shrink-0 overflow-hidden rounded-2xl shadow-[0px_2px_12px_0px_rgba(0,0,0,0.15)]">
                    <Image
                      src={t.projectImageUrl}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  {t.projectLogoUrl && (
                    <Image
                      src={t.projectLogoUrl}
                      alt=""
                      width={90}
                      height={24}
                      className="h-6 w-auto object-contain object-left"
                    />
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
        ))}
      </div>
    </>
  );
}
