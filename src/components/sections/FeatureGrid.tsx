import Image from "next/image";
import Link from "next/link";

type FeatureItem = {
  label: string;
  icon: string | null;
  col: number;
  row: number;
  ring: "far" | "outer" | "middle" | "inner";
};

const features: FeatureItem[] = [
  { label: "Listings", icon: "listings", col: 1, row: 1, ring: "far" },
  { label: "Reviews", icon: "reviews", col: 1, row: 2, ring: "far" },
  { label: "Messaging", icon: "messaging", col: 1, row: 3, ring: "far" },
  { label: "Analytics", icon: "analytics", col: 1, row: 4, ring: "far" },
  { label: "Payments", icon: "payments", col: 1, row: 5, ring: "far" },

  { label: "Support", icon: "support", col: 2, row: 1, ring: "outer" },
  { label: "Subscriptions", icon: "subscriptions", col: 3, row: 1, ring: "middle" },
  { label: "Admin", icon: "admin", col: 4, row: 1, ring: "inner" },
  { label: "Scheduling", icon: "scheduling", col: 5, row: 1, ring: "inner" },
  { label: "Reviews", icon: "reviews", col: 6, row: 1, ring: "inner" },
  { label: "Notifications", icon: "notifications", col: 7, row: 1, ring: "middle" },
  { label: "Analytics", icon: null, col: 8, row: 1, ring: "outer" },
  { label: "Integrations", icon: "integrations", col: 2, row: 2, ring: "outer" },
  { label: "Certificates", icon: "certificates", col: 3, row: 2, ring: "middle" },
  { label: "Listings", icon: "listings", col: 7, row: 2, ring: "middle" },
  { label: "Dashboard", icon: null, col: 8, row: 2, ring: "outer" },
  { label: "Security", icon: "security", col: 2, row: 3, ring: "outer" },
  { label: "Mobile", icon: "mobile", col: 3, row: 3, ring: "middle" },
  { label: "Booking", icon: "booking", col: 7, row: 3, ring: "middle" },
  { label: "Payments", icon: "payments", col: 8, row: 3, ring: "outer" },
  { label: "Community", icon: "community", col: 2, row: 4, ring: "outer" },
  { label: "Map", icon: "map", col: 3, row: 4, ring: "middle" },
  { label: "Calendar", icon: "calendar", col: 7, row: 4, ring: "middle" },
  { label: "Search", icon: "search", col: 8, row: 4, ring: "outer" },
  { label: "Invoicing", icon: "invoicing", col: 2, row: 5, ring: "outer" },
  { label: "Onboarding", icon: "onboarding", col: 3, row: 5, ring: "middle" },
  { label: "Filtering", icon: "filtering", col: 4, row: 5, ring: "inner" },
  { label: "Roles", icon: "roles", col: 5, row: 5, ring: "inner" },
  { label: "Reports", icon: "reports", col: 6, row: 5, ring: "inner" },
  { label: "Profiles", icon: "profiles", col: 7, row: 5, ring: "middle" },
  { label: "Messaging", icon: "messaging", col: 8, row: 5, ring: "outer" },

  { label: "Analytics", icon: "analytics", col: 9, row: 1, ring: "far" },
  { label: "Dashboard", icon: "dashboard", col: 9, row: 2, ring: "far" },
  { label: "Payments", icon: "payments", col: 9, row: 3, ring: "far" },
  { label: "Search", icon: "search", col: 9, row: 4, ring: "far" },
  { label: "Messaging", icon: "messaging", col: 9, row: 5, ring: "far" },
];

const ringVisibility: Record<FeatureItem["ring"], string> = {
  far: "hidden min-[1650px]:flex",
  outer: "hidden min-[1200px]:flex",
  middle: "hidden min-[750px]:flex",
  inner: "flex",
};

function FeatureIcon({ icon }: { icon: string | null }) {
  if (icon) {
    return (
      <Image
        src={`/images/icons/${icon}.svg`}
        alt=""
        width={26}
        height={26}
        className="size-6.5"
      />
    );
  }
  return (
    <div className="flex h-6.5 items-end gap-0.75">
      <span className="h-4.75 w-1.25 rounded-[1px] border border-brand-gray-dark" />
      <span className="h-3 w-1.5 rounded-[1px] border border-brand-gray-dark" />
      <span className="h-5.5 w-1.25 rounded-[1px] border border-brand-gray-dark" />
    </div>
  );
}

export function FeatureGrid() {
  return (
    // <section className="relative z-10 -mt-20 flex flex-col items-center gap-6 bg-linear-to-b from-[#e4e4e4] to-[#d8d8d8] px-4">
    <section className="relative z-10 -mt-35 flex flex-col items-center gap-6 from-[#e4e4e4] to-[#d8d8d8]">
      <div
        className="grid w-full justify-center grid-cols-[0px_0px_0px_1fr_1fr_1fr_0px_0px_0px] grid-rows-[175px_150px_150px_150px_175px] min-[750px]:grid-cols-[0px_0px_minmax(150px,300px)_minmax(142.33px,200px)_minmax(142.33px,200px)_minmax(142.33px,200px)_minmax(150px,300px)_0px_0px] min-[900px]:grid-rows-[175px_175px_175px_175px_175px] min-[1200px]:grid-cols-[0px_minmax(150px,250px)_minmax(150px,300px)_200px_200px_200px_minmax(150px,300px)_minmax(150px,250px)_0px] min-[1650px]:grid-cols-[minmax(150px,1fr)_minmax(150px,300px)_minmax(150px,300px)_200px_200px_200px_minmax(150px,300px)_minmax(150px,300px)_minmax(150px,1fr)]"
      >
        <div
          style={{ gridColumn: "1 / -1", gridRow: "2 / -1", marginTop: "-50px", marginBottom: "50px" }}
          className="bg-[#eaeaea]"
        />
        {features.map((feature) => (
          <div
            key={`${feature.col}-${feature.row}`}
            style={{ gridColumn: feature.col, gridRow: feature.row }}
            className={`h-full flex-col items-center justify-center gap-4 rounded-[33px] border border-[#e4e4e4] bg-white px-2 transition-colors hover:bg-[#eaeffe] ${ringVisibility[feature.ring]}`}
          >
            <FeatureIcon icon={feature.icon} />
            <p className="text-center text-sm text-brand-gray-dark tracking-[-0.396px] xl:text-lg">
              {feature.label}
            </p>
          </div>
        ))}

        <div
          style={{ gridColumn: "4 / span 3", gridRow: "2 / span 3" }}
          className="group relative flex h-112.5 w-full min-[900px]:h-131.75 items-center justify-center overflow-hidden rounded-[33px] bg-linear-to-b"
        >
          <Image
            src="/images/union.png"
            alt=""
            fill
            sizes="(min-width: 750px) 600px, 100vw"
          />
          <Image
            src="/images/union_1.png"
            alt=""
            fill
            sizes="(min-width: 750px) 600px, 100vw"
            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          <Image
            src="/images/solution-deco-left.svg"
            alt=""
            width={38}
            height={120}
            className="absolute left-6 top-6"
          />
          <Image
            src="/images/solution-deco-right.svg"
            alt=""
            width={36}
            height={120}
            className="absolute right-6 top-6"
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
          <div className="relative flex flex-col items-center gap-6 px-8 text-center">
            <p className="text-3xl font-semibold text-white sm:text-[45px]">
              Solution
            </p>
            <Image
              src="/images/solution-icon.svg"
              alt=""
              width={97}
              height={55}
            />
            <p className="max-w-107.5 text-sm text-white sm:text-base">
              Using proven best practices from each industry, we created
              universal ready-to-launch solutions with core features and
              flexible personalization.
            </p>
            <Link
              href="/solutions"
              className="rounded-[44px] bg-white px-10 py-2.5 text-xl font-medium text-black transition-colors hover:text-brand-accent sm:px-19 sm:text-[28px]"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
