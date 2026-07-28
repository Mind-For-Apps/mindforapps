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
    <div className="relative flex flex-col gap-4">
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
      <Image
        src={illustrationSrc}
        alt=""
        width={140}
        height={92}
        className="pointer-events-none absolute -bottom-6 -right-16 hidden opacity-90 xl:block"
      />
    </div>
  );
}
