import Image from "next/image";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      className={className}
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function ComparisonBlock({
  withoutItems,
  withItems,
}: {
  withoutItems: string[];
  withItems: string[];
}) {
  if (withoutItems.length === 0 && withItems.length === 0) return null;

  const withoutItemTextClass =
    withoutItems.length > 5 ? "sm:text-[18px]" : "sm:text-[22px]";
  const withItemTextClass =
    withItems.length > 5 ? "sm:text-[18px]" : "sm:text-[22px]";

  return (
    <div className="relative grid w-full max-w-300 grid-cols-1 min-[800px]:grid-cols-2 min-[800px]:gap-18">
      {withoutItems.length > 0 && (
        <div className="relative min-h-120 z-1 max-[800px]:min-h-150 max-[1108px]:min-h-140 ml-2.5 max-[800px]:ml-0">
          <Image
            src="/images/solutions/compare-red-narrow2.png"
            alt=""
            fill
            sizes="100vw"
            className="object-fill min-[800px]:hidden"
          />
          <Image
            src="/images/solutions/compare-red-wide.png"
            alt=""
            fill
            sizes="(min-width: 1000px) 590px, 50vw"
            className="hidden object-cover min-[800px]:block rounded-3xl"
          />
          <div className="relative z-10 flex flex-col gap-8 p-3 pt-30 min-[800px]:pt-3">
            <div className="relative min-h-22.75 flex items-center w-full">
              <Image
                src="/images/solutions/pill-red.png"
                alt=""
                fill
                sizes="(min-width: 1000px) 590px, 50vw"
                className="object-cover rounded-[19px]"
              />
              <div className="relative z-10 flex h-full items-center gap-3 px-6 sm:px-8">
                <Image
                  unoptimized
                  src="/images/solutions/icon-cross.svg"
                  alt=""
                  width={41}
                  height={41}
                  className="size-8 shrink-0 sm:size-10.25"
                />
                <p className="text-xl font-semibold text-white sm:text-[25px]">
                  Without MindForApps
                </p>
              </div>
            </div>
            <ul className="flex flex-col gap-2 text-left px-10">
              {withoutItems.map((item) => (
                <li
                  key={item}
                  className={`flex items-start gap-3 text-base text-white/90 ${withoutItemTextClass}`}
                >
                  <XIcon className="mt-1.5 size-5 shrink-0 text-[#a02048]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {withItems.length > 0 && (
        // <div className="relative min-h-121.75 max-[800px]:-mt-15">
        <div className="relative min-h-120 max-[800px]:min-h-150 max-[1108px]:min-h-140 max-[800px]:-mt-16.5 mr-2.5 max-[800px]:mr-0">
          <Image
            src="/images/solutions/compare-blue-narrow.png"
            alt=""
            fill
            sizes="100vw"
            className="object-fill min-[800px]:hidden"
          />
          <Image
            src="/images/solutions/compare-blue-wide.png"
            alt=""
            fill
            sizes="(min-width: 1000px) 590px, 50vw"
            className="hidden object-cover min-[800px]:block rounded-3xl"
          />
          <div className="relative z-10 flex flex-col gap-8 p-3 pt-30 min-[800px]:pt-3">
            {/* <div className="relative min-h-[84px] flex items-center w-full shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"> */}
            <div className="relative min-h-22.75 flex items-center w-full">
              <Image
                src="/images/solutions/pill-blue.png"
                alt=""
                fill
                sizes="(min-width: 1000px) 590px, 50vw"
                className="object-cover rounded-[19px]"
              />
              <div className="relative z-10 flex h-full items-center gap-3 px-6 sm:px-8">
                <Image
                  unoptimized
                  src="/images/solutions/icon-check.svg"
                  alt=""
                  width={41}
                  height={41}
                  className="size-8 shrink-0 sm:size-10.25"
                />
                <p className="text-xl font-semibold text-white sm:text-[25px]">
                  With MindForApps
                </p>
              </div>
            </div>
            <ul className="flex flex-col gap-2 text-left px-10">
              {withItems.map((item) => (
                <li
                  key={item}
                  className={`flex items-start gap-3 text-base text-white/90 ${withItemTextClass}`}
                >
                  <CheckIcon className="mt-1.5 size-5 shrink-0 text-white" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl font-medium text-black shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)] sm:size-30 sm:text-5xl">
        VS
      </div>
    </div>
  );
}
