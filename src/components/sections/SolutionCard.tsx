import Image from "next/image";
import Link from "next/link";
import type { SolutionCardData } from "@/lib/solutions";
import { BookConsultationButton } from "@/components/BookConsultationButton";

const SOLUTION_PAGE_SLUGS = ["real-estate", "service-booking-platform"];

export function SolutionCard({ solution }: { solution: SolutionCardData }) {
  const href = solution.slug ? `/solutions/${solution.slug}` : "#";
  const hasSolutionPage = SOLUTION_PAGE_SLUGS.includes(solution.slug ?? "");
  const buttonClassName =
    "flex h-14 items-center justify-center rounded-[25px] border border-black text-[20px] font-bold uppercase tracking-widest text-black transition-colors hover:border-transparent hover:bg-[linear-gradient(45deg,rgb(31,120,255),rgb(65,62,207),rgb(111,47,239))] hover:text-white max-[400px]:text-base";

  return (
    <div className="@container flex h-full w-full flex-col gap-6 rounded-[25px] bg-white p-6">
      <div className="flex flex-1 flex-col gap-3">
        <div>
          <h3 className="text-[35px] font-bold tracking-[-0.77px] text-black leading-none">
            {solution.title}
          </h3>
          <p className="text-[25px] text-black/90 font-medium">Solution</p>
        </div>

        {solution.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2.5">
            {solution.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#e9e9e9] px-4 py-2 text-sm font-medium tracking-[-0.165px] text-black"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {solution.tools.length > 0 && (
          <div className="grid min-h-16 min-w-5 grid-cols-5 gap-3">
            {solution.tools.slice(0, 5).map(
              (tool) =>
                tool.icon_url && (
                  <div
                    key={tool.name}
                    className="mx-auto my-1.75 flex w-full max-w-18.75 items-center justify-center overflow-hidden rounded-xl border border-black/10 bg-white py-3.75 px-2.5 shadow-[1px_2px_7px_0px_rgba(0,0,0,0.14)] @max-[465px]:max-h-13.25 @max-[465px]:max-w-15 @max-[465px]:min-w-15 max-[420px]:max-h-11.25! max-[420px]:max-w-12.5! max-[420px]:min-w-10! max-[420px]:py-2.5! max-[420px]:px-1.25! max-[370px]:mx-0.5!"
                  >
                    <Image
                      src={tool.icon_url}
                      alt={tool.name}
                      width={36}
                      height={36}
                      className="w-full max-w-9 aspect-square object-contain @max-[465px]:max-w-7 max-[420px]:max-w-5.25!"
                    />
                  </div>
                ),
            )}
          </div>
        )}

        {solution.titleForCards && (
          <p className="text-base font-medium leading-normal text-black">
            <span className="line-clamp-3">{solution.titleForCards}</span>{" "}
            <Link
              href={href}
              className="font-medium text-brand-accent hover:underline"
            >
              View more
            </Link>
          </p>
        )}

        {solution.imagesCover.length > 0 && (
          <div className="flex gap-3 py-7">
            {solution.imagesCover.map((url, i) => (
              <div
                key={url}
                className="relative h-45 flex-1 overflow-hidden rounded-2xl bg-brand-surface shadow-[2px_2px_8px_0px_rgba(170,170,170,0.5)]"
              >
                <Image
                  src={url}
                  alt={`${solution.title} preview ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {hasSolutionPage ? (
        <Link href={href} className={buttonClassName}>
          View Solution
        </Link>
      ) : (
        <BookConsultationButton className={buttonClassName}>
          Book a Consultation
        </BookConsultationButton>
      )}
    </div>
  );
}
