import Image from "next/image";

export function BulletSection({
  heading,
  items,
  illustrationSrc,
}: {
  heading: string;
  items: string[];
  illustrationSrc: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 rounded bg-[#e9e9e9] p-6 sm:p-8 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <h3 className="text-2xl font-bold text-black sm:text-[32px]">
            {heading}
          </h3>
          <span className="mt-2 block h-1 w-10 rounded-full bg-brand-accent" />
        </div>
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <p
              key={i}
              className="rounded-2xl bg-white px-6 py-4 text-base text-black"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="relative hidden h-47.5 w-72.5 shrink-0 opacity-90 xl:block">
        <Image
          src={illustrationSrc}
          alt=""
          fill
          sizes="290px"
          className="pointer-events-none object-contain"
        />
      </div>
    </div>
  );
}
