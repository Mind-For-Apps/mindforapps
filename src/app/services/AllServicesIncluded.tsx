import Image from "next/image";
import Link from "next/link";

const ICONS = [
  { label: "Integrations", icon: "integrations" },
  { label: "Listings", icon: "listings" },
  { label: "Dashboard", icon: "dashboard" },
  { label: "Security", icon: "security" },
  { label: "Security", icon: "security" },
  { label: "Booking", icon: "booking" },
  { label: "Payments", icon: "payments" },
  { label: "Community", icon: "community" },
  { label: "Community", icon: "community" },
  { label: "Calendar", icon: "calendar" },
  { label: "Search", icon: "search" },
  { label: "Invoicing", icon: "invoicing" },
  { label: "Support", icon: "support" },
  { label: "Subscriptions", icon: "subscriptions" },
  { label: "Admin", icon: "admin" },
  { label: "Scheduling", icon: "scheduling" },
];

export function AllServicesIncluded() {
  return (
    <section className="mx-auto flex w-full bg-white mt-12 rounded-[20px] max-w-300 flex-col gap-12 px-6 py-16 sm:px-10 lg:flex-row lg:items-center lg:gap-16">
      <div className="flex flex-col gap-10 lg:w-1/2">
        {/* <h2 className="text-[40px] font-semibold text-black sm:text-[45px] sm:leading-[1.15]"> */}
        <h2 className="text-[40px] font-semibold text-black sm:leading-[1.15]">
          All our services included in a complete solution for your industry
        </h2>

        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          <Link
            href="/solutions"
            className="group relative flex h-70 w-70 shrink-0 items-center justify-center overflow-hidden"
          >
            <Image
              src="/images/union.png"
              alt=""
              fill
              sizes="280px"
            />
            <Image
              src="/images/union_1.png"
              alt=""
              fill
              sizes="280px"
              className="opacity-0 transition-opacity w-14 duration-300 group-hover:opacity-100"
            />
            <Image
              unoptimized
              src="/images/solution-deco-left.svg"
              alt=""
              width={38}
              height={120}
              className="absolute top-6 left-6 w-6.25 h-17.5"
            />
            <Image
              unoptimized
              src="/images/solution-deco-right.svg"
              alt=""
              width={36}
              height={120}
              className="absolute top-6 right-6 w-6.25 h-17.5"
            />
            <Image
              unoptimized
              // src="/images/explore-deco-left.svg"
              src="/images/solution-deco-left.svg"
              alt=""
              width={48}
              height={129}
              className="absolute bottom-0 left-12 w-6.25 h-17.5 -rotate-90"
            />
            <Image
              unoptimized
              // src="/images/explore-deco-right.svg"
              src="/images/solution-deco-left.svg"
              alt=""
              width={36}
              height={129}
              className="absolute bottom-6 right-6 w-6.25 h-17.5 rotate-180"
            />
            <div className="relative flex flex-col items-center gap-4 px-6 text-center">
              <p className="text-3xl font-semibold text-white">Solution</p>
              <Image unoptimized src="/images/solution-icon.svg" alt="" width={70} height={40} />
            </div>
          </Link>

          <div className="flex flex-col gap-6">
            <p className="text-lg text-black/70">
              Using proven best practices from each industry, we created
              universal ready-to-launch solutions with core features and
              flexible personalization.
            </p>
            <Link
              href="/solutions"
              className="flex w-fit items-center gap-3 self-end transition-opacity hover:opacity-80"
            >
              <Image unoptimized src="/images/services/arrow_b.svg" alt="" width={55} height={55} />
              <span className="text-[32px] font-medium text-black">Explore</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:w-1/2">
        {ICONS.map((item, i) => (
          <div
            key={`${item.icon}-${i}`}
            className="flex flex-col items-center justify-center gap-3 rounded-[25px] border border-[#e4e4e4] bg-white px-2 py-8 transition-colors hover:bg-[#eaeffe] shadow-[0px_4px_9.65px_rgba(0,0,0,0.1)]"
          >
            <Image
              unoptimized
              src={`/images/icons/${item.icon}.svg`}
              alt=""
              width={26}
              height={26}
              className="size-6.5"
            />
            <p className="text-center text-sm text-brand-gray-dark">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
