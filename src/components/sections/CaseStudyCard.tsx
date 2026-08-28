import Image from "next/image";
import Link from "next/link";
import type { CaseStudySlide } from "@/lib/case-studies";

export function CaseStudyCard({
  slide,
  priority = false,
}: {
  slide: CaseStudySlide;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/case-studies/${slide.slug}`}
      className="
    flex
    w-full
    flex-col
    overflow-hidden
    lg:flex-row
    lg:h-180

    ">
      <div className="
      flex 
      flex-col 
      gap-6 
      overflow-y-auto 
      bg-white 
      p-8 
      sm:p-12.5 
      lg:h-full 
      lg:flex-1 
      h-200 
      min-[883px]:max-[1023px]:h-160
      min-[530px]:max-[882px]:h-170
      // min-[1024px]:max-[1160px]:gap-1
      min-[1100px]:max-[1180px]:p-3!
      min-[1024px]:max-[1101px]:p-2!
      ">
        {slide.logoUrl && (
          <div className="inline-flex w-fit items-center rounded-full bg-brand-surface px-8 py-5">
            <div className="relative h-10 w-37.5 sm:h-12 sm:w-45">
              <Image
                src={slide.logoUrl}
                alt={slide.clientName ?? ""}
                fill
                sizes="180px"
                className="object-contain object-left"
              />
            </div>
          </div>
        )}
        <div className="flex w-full flex-col gap-5">
          <h3 className="max-w-102.5 text-2xl leading-tight font-medium text-black sm:text-[35px]">
            {slide.title}
          </h3>
          {slide.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-sm font-medium tracking-[-0.3px] text-black sm:gap-2.5 sm:text-base">
              {slide.tags.map((tag, i) => (
                <span key={tag} className="flex items-center gap-2">
                  {i > 0 && <span className="text-black/40">|</span>}
                  {tag}
                </span>
              ))}
            </div>
          )}
          {/* <div className="flex flex-col gap-5 font-medium sm:flex-row">
            <div className="flex w-full flex-col gap-1.5 rounded-[15px] bg-brand-surface px-5 py-2.5 sm:w-67.5">
              <p className="text-sm tracking-[-0.27px] text-black/40">
                Problem:
              </p>
              <p className="text-base tracking-[-0.3px] text-black">
                {slide.problem}
              </p>
            </div>
            <div className="flex w-full flex-col gap-1.5 rounded-[15px] bg-brand-surface px-5 py-2.5 sm:w-67.5">
              <p className="text-sm tracking-[-0.27px] text-black/40">
                Context:
              </p>
              <p className="text-base tracking-[-0.3px] text-black">
                {slide.context}
              </p>
            </div>
          </div> */}
          <div className="grid grid-cols-1 gap-x-16 gap-y-5 rounded-[15px] bg-linear-to-r from-[#cde1ff]/50 to-[#d9daff]/50 px-5 py-3 font-medium sm:grid-cols-[1fr_auto]">
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
                {/* {slide.tools.map( */}
                {/* {slide.tools.slice(-2).map( */}
                {slide.tools.filter((tool) => tool.name==="Figma"||tool.name==="Bubble.io").map(
                  (tool) =>
                    tool.icon_url && (
                      <div key={tool.name} className="relative h-6 w-5">
                        <Image
                          src={tool.icon_url}
                          alt={tool.name}
                          fill
                          sizes="20px"
                          className="object-contain"
                        />
                      </div>
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
        {/* <div className="flex flex-wrap items-center gap-8 sm:gap-29.5"> */}
        <div className="flex flex-wrap h-full items-end gap-8 sm:gap-29.5">
          <p className="text-lg text-black">{slide.hours}</p>
          <p className="text-lg text-black">{slide.teamSize}</p>
        </div>
      </div>
      {slide.mainImageUrl && (
        <div className="relative hidden aspect-405/532 lg:block lg:h-full lg:w-auto">
          <Image
            src={slide.mainImageUrl}
            alt={slide.title}
            fill
            priority={priority}
            sizes="50vw"
            className="object-contain"
          />
        </div>
      )}
      {(slide.headerImages[0] ?? slide.mainImageUrl) && (
        <div className="relative aspect-26/17 w-full lg:hidden">
          <Image
            src={slide.headerImages[0] ?? slide.mainImageUrl!}
            alt={slide.title}
            fill
            priority={priority}
            sizes="(min-width: 640px) calc(100vw - 40px), calc(100vw - 48px)"
            className="object-contain"
          />
        </div>
      )}
    </Link>
  );
}
