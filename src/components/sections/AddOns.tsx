import Image from "next/image";
import Link from "next/link";

const featuredAddOn = {
  title: "Template Customization",
  href: "#",
  image: "/images/addons/template-customization.png",
  description:
    "Turn any template into a fully branded, high-performing product. Whether you're using a Bubble or Webflow template, we adapt it to fit your business — updating structure, design, logic, and integrations so it looks custom-built and works seamlessly.",
};

const pluginIcons = [
  "/images/addons/plugins-1.png",
  "/images/addons/plugins-2.png",
  "/images/addons/plugins-3.png",
  "/images/addons/plugins-4.png",
];

const plugins = {
  title: "Plugins Development",
  href: "#",
  description: "We develop custom plugins and integrations.",
};

const qaAudit = {
  title: "QA & Audit",
  href: "#",
  image: "/images/addons/qa-audit.png",
  description: "Make your app stable, fast, and scalable.",
};

const ongoingSupport = {
  title: "Ongoing Support & Feature Development",
  href: "#",
  image: "/images/addons/ongoing-support-photo.png",
  description: "We keep your product growing — even after launch.",
};

export function AddOns() {
  return (
    <section className="flex flex-col items-center gap-8 bg-brand-surface px-6 py-16 sm:px-25">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-3xl font-bold text-black sm:text-[40px]">
          Add-ons
        </h2>
        <p className="max-w-175 text-base text-brand-gray sm:text-lg">
          Extend your product with integrations, API development,
          optimization, QA, and ongoing support for long-term scalability.
        </p>
      </div>

      <div className="w-full max-w-300 rounded-[33px] bg-[#e9e9e9] p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          <Link
            href={featuredAddOn.href}
            className="flex flex-col items-center gap-6 rounded-[25px] border-2 border-transparent bg-white p-6 transition-colors hover:border-brand-accent sm:p-8 lg:flex-row lg:gap-15.25
            "
          >
            <div className="relative h-56.25 w-full max-w-81 shrink-0 lg:w-81">
              <Image
                src={featuredAddOn.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 324px, 100vw"
                className="object-contain"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-3.5">
              <h3 className="text-2xl font-bold text-black sm:text-[35px] sm:tracking-[-0.665px]">
                {featuredAddOn.title}
              </h3>
              <p className="text-sm text-brand-gray sm:text-base sm:tracking-[-0.176px]">
                {featuredAddOn.description}
              </p>
            </div>
          </Link>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Link
              href={plugins.href}
              className="flex flex-col items-start gap-4 rounded-[25px] border-2 border-transparent bg-white p-6 transition-colors hover:border-brand-accent sm:p-8"
            >
              <div className="grid shrink-0 grid-cols-2 gap-2">
                {pluginIcons.map((icon) => (
                  <div
                    key={icon}
                    className="relative size-14 shrink-0 overflow-hidden rounded-full"
                  >
                    <Image
                      src={icon}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-black sm:text-2xl sm:tracking-[-0.456px]">
                  {plugins.title}
                </h3>
                <p className="text-sm text-brand-gray sm:text-base sm:tracking-[-0.176px]">
                  {plugins.description}
                </p>
              </div>
            </Link>

            <Link
              href={qaAudit.href}
              className="flex flex-col items-start gap-4 rounded-[25px] border-2 border-transparent bg-white p-6 transition-colors hover:border-brand-accent sm:p-8 lg:flex-row lg:items-center"
            >
              <div className="relative h-53.25 w-30 shrink-0">
                <Image
                  src={qaAudit.image}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <h3 className="text-xl font-bold text-black sm:text-2xl sm:tracking-[-0.456px]">
                  {qaAudit.title}
                </h3>
                <p className="text-sm text-brand-gray sm:text-base sm:tracking-[-0.176px]">
                  {qaAudit.description}
                </p>
              </div>
            </Link>

            <Link
              href={ongoingSupport.href}
              className="flex flex-col items-start gap-4 rounded-[25px] border-2 border-transparent bg-white p-6 transition-colors hover:border-brand-accent sm:p-8"
            >
              <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:gap-5.5">
                <div className="relative h-38 w-29 shrink-0 overflow-hidden rounded-[15px]">
                  <Image
                    src={ongoingSupport.image}
                    alt=""
                    fill
                    sizes="118px"
                    className="object-cover"
                  />
                </div>
                <h3 className="min-w-0 flex-1 text-xl font-bold text-black sm:text-2xl sm:tracking-[-0.456px]">
                  {ongoingSupport.title}
                </h3>
              </div>
              <p className="text-sm text-brand-gray sm:text-base sm:tracking-[-0.176px]">
                {ongoingSupport.description}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
