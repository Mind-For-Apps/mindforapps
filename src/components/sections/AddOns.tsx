import Image from "next/image";
import Link from "next/link";

type AddOn = {
  title: string;
  icon: string;
  href: string;
  description?: string;
  ctaLabel?: string;
};

const featuredAddOn: AddOn = {
  title: "Template Customization",
  icon: "template-customization",
  href: "#",
  description:
    "Turn any template into a fully branded, high-performing product. Whether you're using a Bubble or Webflow template, we adapt it to fit your business — updating structure, design, logic, and integrations so it looks custom-built and works seamlessly.",
  ctaLabel: "View Templates",
};

const addOns: AddOn[] = [
  { title: "Plugins Development", icon: "plugins-development", href: "#" },
  { title: "QA & Audit", icon: "qa-audit", href: "#" },
  {
    title: "Ongoing Support & Feature Development",
    icon: "ongoing-support",
    href: "#",
  },
];

function AddOnIcon({ icon }: { icon: string }) {
  return (
    <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-black/10">
      <Image
        src={`/images/addons/${icon}.svg`}
        alt=""
        width={26}
        height={26}
        className="size-6 object-contain"
      />
    </div>
  );
}

export function AddOns() {
  return (
    <section className="flex flex-col items-center gap-8 bg-brand-surface px-6 py-16 sm:px-[100px]">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-3xl font-bold text-black sm:text-[40px]">
          Add-ons
        </h2>
        <p className="max-w-[700px] text-base text-brand-gray sm:text-lg">
          Extend your product with integrations, API development,
          optimization, QA, and ongoing support for long-term scalability.
        </p>
      </div>

      <div className="w-full max-w-[1200px] rounded-[33px] bg-[#e9e9e9] p-4 sm:p-6">
        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2">
          <Link
            href={featuredAddOn.href}
            className="flex flex-col gap-6 rounded-[25px] border-2 border-transparent bg-white p-6 transition-colors hover:border-brand-accent sm:p-8"
          >
            <AddOnIcon icon={featuredAddOn.icon} />

            {/* TODO: swap for the real photo once it's uploaded */}
            <div className="h-[220px] w-full rounded-2xl bg-brand-surface" />

            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-bold text-black sm:text-3xl">
                {featuredAddOn.title}
              </h3>
              <p className="text-sm text-brand-gray sm:text-base">
                {featuredAddOn.description}
              </p>
            </div>

            <span className="self-start rounded-full bg-black px-6 py-3 text-sm font-medium text-white">
              {featuredAddOn.ctaLabel}
            </span>
          </Link>

          <div className="flex flex-col gap-4">
            {addOns.map((addOn) => (
              <Link
                key={addOn.title}
                href={addOn.href}
                className="flex flex-1 flex-col justify-center gap-4 rounded-[25px] border-2 border-transparent bg-white p-6 transition-colors hover:border-brand-accent sm:p-8"
              >
                <AddOnIcon icon={addOn.icon} />
                <h3 className="text-xl font-bold text-black sm:text-2xl">
                  {addOn.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
