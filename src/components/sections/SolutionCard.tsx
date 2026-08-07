import Image from "next/image";
import Link from "next/link";
import type { SolutionCardData } from "@/lib/solutions";

export function SolutionCard({ solution }: { solution: SolutionCardData }) {
  const href = solution.slug ? `/solutions/${solution.slug}` : "#";

  return (
    <div className="flex w-full flex-col gap-6 rounded-[25px] bg-white p-6 sm:p-8">
      <div>
        <h3 className="text-3xl font-bold tracking-[-0.77px] text-black">
          {solution.title}
        </h3>
        <p className="text-lg text-black/60">Solution</p>
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
        <div className="flex flex-wrap items-center gap-3">
          {solution.tools.map(
            (tool) =>
              tool.icon_url && (
                <div
                  key={tool.name}
                  className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white"
                >
                  <Image
                    src={tool.icon_url}
                    alt={tool.name}
                    width={28}
                    height={28}
                    className="size-7 object-contain"
                  />
                </div>
              ),
          )}
        </div>
      )}

      {solution.titleForCards && (
        <p className="text-base leading-normal text-black">
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
        <div className="flex gap-3">
          {solution.imagesCover.map((url, i) => (
            <div
              key={url}
              className="relative h-45 flex-1 overflow-hidden rounded-2xl bg-brand-surface"
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

      <Link
        href={href}
        className="flex h-14 items-center justify-center rounded-full border border-black text-sm font-medium uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-white"
      >
        View Solution
      </Link>
    </div>
  );
}
