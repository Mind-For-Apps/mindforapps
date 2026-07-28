import Image from "next/image";
import Link from "next/link";
import type { CaseStudySlide } from "@/lib/case-studies";

export function CaseStudyCard({ slide }: { slide: CaseStudySlide }) {
  return (
    <div className="flex w-full max-w-[1200px] flex-col overflow-hidden lg:flex-row">
      <div className="flex flex-col gap-10 bg-white p-8 sm:p-[50px]">
        <div className="flex w-[560px] max-w-full flex-col gap-6">
          <h3 className="max-w-[410px] text-2xl font-medium text-black sm:text-[35px]">
            {slide.title}
          </h3>
          {slide.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium tracking-[-0.3px] text-black sm:gap-[15px] sm:text-base">
              {slide.tags.map((tag, i) => (
                <span key={tag} className="flex items-center gap-3">
                  {i > 0 && <span className="text-black/40">|</span>}
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-5 font-medium sm:flex-row">
            <div className="flex w-full flex-col gap-1.5 rounded-[15px] bg-brand-surface px-5 py-2.5 sm:w-[270px]">
              <p className="text-sm tracking-[-0.27px] text-black/40">
                Problem:
              </p>
              <p className="text-base tracking-[-0.3px] text-black">
                {slide.problem}
              </p>
            </div>
            <div className="flex w-full flex-col gap-1.5 rounded-[15px] bg-brand-surface px-5 py-2.5 sm:w-[270px]">
              <p className="text-sm tracking-[-0.27px] text-black/40">
                Context:
              </p>
              <p className="text-base tracking-[-0.3px] text-black">
                {slide.context}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-16 gap-y-5 rounded-[15px] bg-gradient-to-r from-[#cde1ff]/50 to-[#d9daff]/50 px-5 py-3 font-medium sm:grid-cols-2">
            <div>
              <p className="text-sm tracking-[-0.27px] text-black/40">
                Services
              </p>
              <p className="text-base tracking-[-0.3px] text-black">
                {slide.serviceNames}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-sm tracking-[-0.27px] text-black/40">
                Tools
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                {slide.tools.map(
                  (tool) =>
                    tool.icon_url && (
                      <Image
                        key={tool.name}
                        src={tool.icon_url}
                        alt={tool.name}
                        width={20}
                        height={24}
                        className="h-6 w-auto"
                      />
                    ),
                )}
              </div>
            </div>
            <div>
              <p className="text-sm tracking-[-0.27px] text-black/40">
                Deliverables
              </p>
              <p className="text-base tracking-[-0.3px] text-black">
                {slide.deliverables}
              </p>
            </div>
            <div>
              <p className="text-sm tracking-[-0.27px] text-black/40">
                Timeline
              </p>
              <p className="text-base tracking-[-0.3px] text-black">
                {slide.timeline}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-8 sm:gap-[118px]">
          <p className="text-lg text-black">{slide.hours}</p>
          <p className="text-lg text-black">{slide.teamSize}</p>
          {slide.logoUrl && (
            <Image
              src={slide.logoUrl}
              alt={slide.clientName ?? ""}
              width={113}
              height={32}
              className="h-8 w-auto"
            />
          )}
        </div>
        <Link
          href={`/case-studies/${slide.slug}`}
          className="flex h-14 w-full items-center justify-center rounded-full border border-black text-sm font-medium uppercase tracking-[0.1em] text-black transition-colors hover:bg-black hover:text-white sm:w-[270px]"
        >
          View Case Study
        </Link>
      </div>
      {slide.mainImageUrl && (
        <div className="relative h-[400px] w-full lg:h-auto lg:w-[540px] lg:min-h-[709px]">
          <Image
            src={slide.mainImageUrl}
            alt={slide.title}
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
