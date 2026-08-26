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
    <section className="flex w-full flex-col gap-12 px-6 py-16 sm:px-10 lg:flex-row lg:items-center lg:gap-16 lg:px-0">
      <div className="flex flex-col gap-10 lg:w-1/2">
        <h2 className="text-3xl font-bold text-black sm:text-[45px] sm:leading-[1.15]">
          All our services included in a complete solution for your industry
        </h2>

        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          <div className="group relative flex h-70 w-70 shrink-0 items-center justify-center overflow-hidden rounded-[33px]">
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
              className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <Image
              src="/images/solution-deco-left.svg"
              alt=""
              width={38}
              height={120}
              className="absolute top-6 left-6"
            />
            <Image
              src="/images/solution-deco-right.svg"
              alt=""
              width={36}
              height={120}
              className="absolute top-6 right-6"
            />
            <Image
              src="/images/explore-deco-left.svg"
              alt=""
              width={48}
              height={129}
              className="absolute bottom-6 left-6"
            />
            <Image
              src="/images/explore-deco-right.svg"
              alt=""
              width={36}
              height={129}
              className="absolute bottom-6 right-6"
            />
            <div className="relative flex flex-col items-center gap-4 px-6 text-center">
              <p className="text-3xl font-semibold text-white">Solution</p>
              <Image src="/images/solution-icon.svg" alt="" width={70} height={40} />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-base text-black/70">
              Using proven best practices from each industry, we created
              universal ready-to-launch solutions with core features and
              flexible personalization.
            </p>
            <Link href="/solutions" className="flex w-fit items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
                ↗
              </span>
              <span className="text-2xl font-bold text-black">Explore</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:w-1/2">
        {ICONS.map((item, i) => (
          <div
            key={`${item.icon}-${i}`}
            className="flex flex-col items-center justify-center gap-3 rounded-[25px] border border-[#e4e4e4] bg-white px-2 py-8 transition-colors hover:bg-[#eaeffe]"
          >
            <Image
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
