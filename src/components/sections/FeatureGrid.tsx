import Image from "next/image";

type FeatureItem = {
  label: string;
  icon: string | null;
  col: number;
  row: number;
};

const features: FeatureItem[] = [
  { label: "Support", icon: "support", col: 1, row: 1 },
  { label: "Subscriptions", icon: "subscriptions", col: 2, row: 1 },
  { label: "Admin", icon: "admin", col: 3, row: 1 },
  { label: "Scheduling", icon: "scheduling", col: 4, row: 1 },
  { label: "Reviews", icon: "reviews", col: 5, row: 1 },
  { label: "Notifications", icon: "notifications", col: 6, row: 1 },
  { label: "Analytics", icon: null, col: 7, row: 1 },
  { label: "Integrations", icon: "integrations", col: 1, row: 2 },
  { label: "Certificates", icon: "certificates", col: 2, row: 2 },
  { label: "Listings", icon: "listings", col: 6, row: 2 },
  { label: "Dashboard", icon: null, col: 7, row: 2 },
  { label: "Security", icon: "security", col: 1, row: 3 },
  { label: "Mobile", icon: "mobile", col: 2, row: 3 },
  { label: "Booking", icon: "booking", col: 6, row: 3 },
  { label: "Payments", icon: "payments", col: 7, row: 3 },
  { label: "Community", icon: "community", col: 1, row: 4 },
  { label: "Map", icon: "map", col: 2, row: 4 },
  { label: "Calendar", icon: "calendar", col: 6, row: 4 },
  { label: "Search", icon: "search", col: 7, row: 4 },
  { label: "Invoicing", icon: "invoicing", col: 1, row: 5 },
  { label: "Onboarding", icon: "onboarding", col: 2, row: 5 },
  { label: "Filtering", icon: "filtering", col: 3, row: 5 },
  { label: "Roles", icon: "roles", col: 4, row: 5 },
  { label: "Reports", icon: "reports", col: 5, row: 5 },
  { label: "Profiles", icon: "profiles", col: 6, row: 5 },
  { label: "Messaging", icon: "messaging", col: 7, row: 5 },
];

function FeatureIcon({ icon }: { icon: string | null }) {
  if (icon) {
    return (
      <Image
        src={`/images/icons/${icon}.svg`}
        alt=""
        width={26}
        height={26}
        className="size-[26px]"
      />
    );
  }
  return (
    <div className="flex h-[26px] items-end gap-[3px]">
      <span className="h-[19px] w-[5px] rounded-[1px] border border-[#585858]" />
      <span className="h-[12px] w-[6px] rounded-[1px] border border-[#585858]" />
      <span className="h-[22px] w-[5px] rounded-[1px] border border-[#585858]" />
    </div>
  );
}

export function FeatureGrid() {
  return (
    <section className="flex flex-col items-center gap-6 bg-gradient-to-b from-[#e4e4e4] to-[#d8d8d8] px-6 py-16 sm:px-25">
      <div className="grid w-full max-w-300 grid-cols-2 gap-4 sm:grid-cols-3 lg:hidden">
        {features.map((feature) => (
          <div
            key={feature.label}
            className="flex flex-col items-center justify-center gap-3 rounded-[25px] border border-[#e4e4e4] bg-white px-6 py-8"
          >
            <FeatureIcon icon={feature.icon} />
            <p className="text-base text-[#585858] tracking-[-0.35px]">
              {feature.label}
            </p>
          </div>
        ))}
      </div>

      <div className="hidden w-full max-w-300 grid-cols-7 grid-rows-5 gap-3 lg:grid">
        {features.map((feature) => (
          <div
            key={feature.label}
            style={{ gridColumn: feature.col, gridRow: feature.row }}
            className="flex flex-col items-center justify-center gap-4 rounded-[33px] border border-[#e4e4e4] bg-white px-2 py-8"
          >
            <FeatureIcon icon={feature.icon} />
            <p className="text-center text-sm text-[#585858] tracking-[-0.396px] xl:text-lg">
              {feature.label}
            </p>
          </div>
        ))}

        <div
          style={{ gridColumn: "3 / span 3", gridRow: "2 / span 3" }}
          className="relative flex items-center justify-center overflow-hidden rounded-[33px] bg-gradient-to-b from-[#0461f7] via-[#2c2f9d] to-[#091069]"
        >
          <Image
            src="/images/union-bg.svg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="relative flex flex-col items-center gap-6 px-8 text-center">
            <div className="flex items-center gap-6">
              <Image
                src="/images/solution-deco-left.svg"
                alt=""
                width={30}
                height={95}
              />
              <p className="text-3xl font-semibold text-white sm:text-[45px]">
                Solution
              </p>
              <Image
                src="/images/solution-deco-right.svg"
                alt=""
                width={28}
                height={95}
              />
            </div>
            <Image
              src="/images/solution-icon.svg"
              alt=""
              width={97}
              height={55}
            />
            <p className="max-w-[430px] text-sm text-white sm:text-base">
              Using proven best practices from each industry, we created
              universal ready-to-launch solutions with core features and
              flexible personalization.
            </p>
            <div className="flex items-center gap-4">
              <Image
                src="/images/explore-deco-left.svg"
                alt=""
                width={38}
                height={102}
              />
              <button className="rounded-[44px] bg-white px-8 py-3 text-xl font-medium text-black sm:px-[61px] sm:text-[32px]">
                Explore
              </button>
              <Image
                src="/images/explore-deco-right.svg"
                alt=""
                width={28}
                height={102}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
