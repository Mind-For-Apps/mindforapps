import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrustCarousel } from "@/components/sections/TrustCarousel";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { getSolutionBySlug } from "@/lib/solutions";
import { getTestimonials } from "@/lib/testimonials";
import { getRealEstateFaqs, getServiceBookingFaqs } from "@/lib/faqs";
import { StickyNav } from "./StickyNav";
import { ComparisonBlock } from "./ComparisonBlock";
import { ImagesSlider } from "@/components/ImagesSlider";
import { ToolsSlider } from "@/components/ToolsSlider";
import { FeaturesBrowser } from "./FeaturesBrowser";
import { TestimonialsSlider } from "@/components/sections/TestimonialsSlider";
import { isSvgSrc } from "@/lib/is-svg-src";
import { FreeAudit } from "@/components/sections/FreeAudit";
import { CalendlyWidget } from "@/components/CalendlyWidget";

const INCLUDED_FEATURE_ICONS = [
  "reports",
  "community",
  "roles",
  "search",
  "payments",
  "messaging",
  "admin",
  "listings",
  "security",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);
  if (!solution) return {};

  return {
    title: `${solution.title} — Mind For Apps`,
    description: solution.text0 ?? undefined,
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [solution, testimonials] = await Promise.all([
    getSolutionBySlug(slug),
    getTestimonials(),
  ]);

  if (!solution) notFound();

  const faqs =
    slug === "real-estate"
      ? await getRealEstateFaqs()
      : slug === "service-booking-platform"
        ? await getServiceBookingFaqs()
        : [];

  return (
    <>
      <Header />
      <main id="top" className="flex flex-1 flex-col mb-5">
        {/* <section className="flex flex-col items-center gap-10 bg-brand-surface px-6 py-8.5 sm:px-25"> */}
        <section className="flex flex-col items-center gap-10 bg-brand-surface px-6 pt-8.5">
          {/* <div className="mx-auto grid w-full max-w-300 grid-cols-1 items-center gap-10 lg:grid-cols-2"> */}
          <div className="mx-auto grid w-full grid-cols-1 items-start lg:grid-cols-2 max-w-308.75">
            <div className="flex flex-col gap-5">
              {/* <h1 className="text-4xl font-medium sm:text-[45px] max-[1199px]:text-[35px] max-[799px]:text-[30px] leading-[1.3] text-black"> */}
              <h1 className="text-[30px] min-[800px]:max-[1199px]:text-[35px] min-[1200px]:text-[45px] font-medium leading-[1.3] text-black">
                {solution.titleLong ?? solution.title}
              </h1>
              {solution.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2.5">
                  {solution.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#e0e4ff] px-4 py-2 text-base font-medium text-brand-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {solution.text0 && (
                <p className="text-xl font-normal text-black/70">
                  {solution.text0}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href="#pricing"
                  className="bg-brand-gradient flex h-15 items-center rounded-full px-9 text-[25px] font-medium text-white transition-opacity hover:opacity-90"
                >
                  Book a Free Strategy Call
                </a>
                <a
                  href="#pricing"
                  className="flex h-15 w-47.5 max-[1139px]:w-37.5 items-center justify-center rounded-full bg-black px-9 text-[25px] font-medium text-white transition-opacity hover:opacity-90"
                >
                  Pricing
                </a>
              </div>
            </div>
            {solution.mainImageUrl && (
              // <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  src={solution.mainImageUrl}
                  alt={solution.title}
                  fill
                  sizes="(min-width: 1024px) 617px, 100vw"
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </section>

        <TrustCarousel />

        <StickyNav />

        {(solution.text1 ||
          solution.designedFor.length > 0 ||
          solution.images.length > 0) && (
          <section
            id="why-us"
            className="relative overflow-hidden bg-brand-surface py-16"
          >
            <Image
              src="/images/magnific_a-bright-blue.png"
              alt=""
              width={2560}
              height={1973}
              className="pointer-events-none absolute right-0 top-0 hidden w-[55%] max-w-225 opacity-90 lg:block"
            />
            {/* <div className="relative mx-auto flex max-w-300 flex-col gap-8 px-6 sm:px-25"> */}
            <div className="relative mx-auto flex max-w-310 flex-col gap-8 px-6">
              <div className="flex flex-col gap-3">
                {solution.text1 && (
                  <>
                    <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
                      Who it&rsquo;s built for
                    </p>
                    <h2 className="max-w-175 text-3xl font-bold text-black sm:text-[40px]">
                      {solution.text1}
                    </h2>
                  </>
                )}
                {solution.text2 && (
                  <p className="max-w-150 text-base text-black/70 sm:text-lg">
                    {solution.text2}
                  </p>
                )}
              </div>

              {solution.designedFor.length > 0 && (
                <div className="grid max-w-305 min-h-45 grid-cols-1 gap-4 min-[450px]:grid-cols-2 min-[650px]:grid-cols-3 min-[850px]:grid-cols-4">
                  {solution.designedFor.map((item) => (
                    <div
                      key={item.title}
                      className="flex min-h-45 min-w-10 flex-col gap-4 rounded-[30px] border border-transparent bg-white p-5 shadow-[0px_4px_7px_0px_rgba(0,0,0,0.14)] transition-colors hover:border-black min-[450px]:max-w-72.5"
                    >
                      <Image
                        unoptimized={isSvgSrc(item.iconUrl) || !item.iconUrl}
                        src={item.iconUrl ?? "/images/icons/onboarding.svg"}
                        alt=""
                        width={28}
                        height={28}
                        className="size-12.5"
                      />
                      <p className="font-medium text-[20px] text-black">{item.title}</p>
                      {item.description && (
                        <p className="text-[16px] font-medium text-black/60">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {solution.images.length > 0 && (
              <div className="relative mt-17.5">
                <ImagesSlider images={solution.images} />
              </div>
            )}
          </section>
        )}

        <section className="bg-brand-surface px-6 pb-16 sm:px-25 my-5">
          <a
            href="#contact"
            className="mx-auto flex max-w-300 flex-col items-center gap-2 rounded-[25px] bg-white p-8 text-center transition-opacity hover:opacity-90"
          >
            <p className="text-[25px] font-semibold text-brand-accent">
              Building for clients?
            </p>
            <p className="max-w-175 text-[20px] font-medium text-black/70">
              Our platform is built for white-labelling — resell it under
              your own brand, domain, and colour scheme. Ask us how on the{" "}
              <span className="font-medium text-brand-accent underline">
                strategy call.
              </span>
            </p>
          </a>
        </section>

        {(solution.text6 || solution.withMfa.length > 0) && (
          // <section className="flex flex-col items-center gap-10 bg-black px-6 py-16 text-center sm:px-25">
          <section className="flex flex-col items-center gap-10 py-5 text-center">
                <p className="max-w-175 text-base text-brand-accent font-semibold">
                  WHAT PROBLEM IT SOLVES
                </p>
            <div className="flex flex-col items-center gap-4">
              {solution.text6 && (
                // <h2 className="max-w-200 text-3xl font-bold text-white sm:text-[40px]">
                <h2 className="max-w-275 text-3xl font-semibold sm:text-[40px] leading-normal">
                  {solution.text6}
                </h2>
              )}
              {solution.text3 && (
                // <p className="max-w-175 text-base text-white/70 sm:text-lg">
                <p className="max-w-175 text-base  sm:text-xl">
                  {solution.text3}
                </p>
              )}
            </div>
            <ComparisonBlock
              withoutItems={solution.withoutMfa}
              withItems={solution.withMfa}
            />
          </section>
        )}

        <section className="relative overflow-hidden bg-brand-surface py-16 px-5">
          <Image
            src="/images/solution-ribbon-bg.png"
            alt=""
            width={1500}
            height={620}
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden w-full opacity-80 lg:block"
          />

          {solution.featureCategories.length > 0 && (
            <div
              id="features"
              className="relative mx-auto flex max-w-300 flex-col items-center gap-5 text-center"
            >
              <p className="max-w-175 text-base text-brand-accent font-semibold">
                FEATURES
              </p>
              <div className="flex flex-col items-center gap-3">
                <h2 className="text-3xl font-semibold text-black sm:text-4xl">
                  {solution.text7 ?? "Everything you need."}{" "}
                  <span className="text-brand-accent">One solution.</span>
                </h2>
                {solution.text4 && (
                  <p className="max-w-175 text-base text-black/80 sm:text-xl">
                    {solution.text4}
                  </p>
                )}
              </div>
              <div className="mt-10 w-full">
                <FeaturesBrowser
                  categories={solution.featureCategories}
                  featuresImageUrl={solution.featuresImageUrl}
                />
              </div>
            </div>
          )}

          <div className="relative mx-auto mt-16 grid max-w-300 grid-cols-1 items-center gap-10 min-[850px]:grid-cols-2">
            <div className="flex flex-col items-start gap-3 text-left min-[850px]:order-last">
              <h2 className="text-3xl font-bold text-black sm:text-[40px] min-[850px]:hidden">
                Real platforms. Real results.
              </h2>
              <p className="max-w-125 text-base text-black/60 min-[850px]:hidden">
                Numbers from projects we&rsquo;ve shipped, not just estimates.
              </p>

              <p className="hidden text-sm font-semibold uppercase tracking-wide text-brand-accent min-[850px]:block">
                Real platforms. Real results.
              </p>
              <h2 className="hidden text-3xl font-bold text-black sm:text-[40px] min-[850px]:block">
                Numbers we&rsquo;ve shipped — not estimates.
              </h2>
              <p className="hidden max-w-125 text-base text-black/60 min-[850px]:block">
                Metrics from real projects. Not projections.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 min-[470px]:grid-cols-2 min-[1200px]:gap-8">
              {[
                {
                  value: "4 weeks",
                  label: "Average time to launch",
                  corners: "min-[470px]:rounded-[60px_30px_4px_30px]",
                },
                {
                  value: "65%",
                  label: "Average time and budget saving vs custom development",
                  corners: "min-[470px]:rounded-[30px_60px_30px_4px]",
                },
                {
                  value: "100%",
                  label: "Client ownership of the created platform",
                  corners: "min-[470px]:rounded-[30px_4px_30px_60px]",
                },
                {
                  value: "$50K+",
                  label: "Average saving vs hiring a dev team",
                  corners: "min-[470px]:rounded-[4px_30px_60px_30px]",
                },
              ].map((stat) => (
                <div
                  key={stat.value}
                  className={`flex min-h-50 min-w-47.5 flex-col items-start gap-3 rounded-2xl ${stat.corners} bg-white p-5 text-center shadow-[7px_21px_19px_0px_rgba(50,95,254,0.1)] max-[530px]:p-5 max-[850px]:p-10 max-[1020px]:p-5 min-[1021px]:p-8 max-[429px]:min-h-0 max-[429px]:max-h-40`}
                >
                  <span className="rounded-full bg-brand-accent px-6 py-3 font-bold text-white text-3xl max-[1080px]:text-[26px] max-[1020px]:text-[24px] max-[470px]:text-[30px] max-[470px]:w-full">
                    {stat.value}
                  </span>
                  <span className="text-base text-black  max-[470px]:text-[18px]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto mt-16 max-w-300">
            <div className="flex flex-col items-start gap-4 rounded-[25px] bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-5">
                <p className="text-[28px] font-semibold text-brand-accent">
                  Want to speak to a past client before committing?
                </p>
                <p className="text-xl text-black/80">
                  Ask us on the strategy call, and we&rsquo;ll make the
                  introduction.
                </p>
              </div>
              <a
                href="#contact"
                className="bg-brand-gradient shrink-0 rounded-full px-8 py-3 text-[25px] font-medium text-white transition-opacity hover:opacity-90"
              >
                Book a Free Strategy Call
              </a>
            </div>
          </div>
        </section>

        <section
          id="process"
          className="flex flex-col items-center gap-15 bg-brand-surface px-6 py-16 text-center sm:px-25"
        >
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
              Our process
            </p>
            <h2 className="text-3xl font-bold text-black sm:text-[40px]">
              From brief to live in 3 steps.
            </h2>
            <p className="max-w-150 text-base text-black/60">
              Three steps. Clarity and support on each step.  <br></ br>
              Every stage has a clear deliverable. You always know what comes next.
            </p>
          </div>
          <div className="flex w-full max-w-300 flex-col gap-8">
            {[
              {
                n: 1,
                duration: "1–2 days",
                title: "Strategy",
                description:
                  "We scope your niche, user flows, and feature requirements together. You come with an idea — and leave with a plan.",
                outcome: "You have a locked scope and a fixed price",
                checklist: [
                  "Feature list agreed",
                  "Budget confirmed",
                  "Start date set",
                ],
                bg: "bg-[rgb(226,245,249)]",
                accentBg: "bg-[rgb(52,196,227)]",
              },
              {
                n: 2,
                duration: "4 weeks",
                title: "Build & brand",
                description: `We configure your ${solution.title} platform, brand it to your identity, connect your tools, and QA everything.`,
                outcome: "You have a tested, branded, ready-to-launch platform",
                checklist: [
                  "Platform live in staging",
                  "Integrations connected",
                  "Full QA completed",
                ],
                bg: "bg-[#e3ddfa]",
                accentBg: "bg-[rgb(99,133,255)]",
              },
              {
                n: 3,
                duration: "Ongoing",
                title: "Launch & support",
                description:
                  "We go live together. Then we stay on — for bug fixes, new features, and scaling as you grow.",
                outcome: "You're live — with a long-term technical partner",
                checklist: [
                  "Platform live on your domain",
                  "Team onboarded and trained",
                  "Support channel open",
                ],
                bg: "bg-[#d8cef7]",
                accentBg: "bg-[rgb(161,98,255)]",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="grid grid-cols-1 gap-0 overflow-hidden rounded-sm bg-white text-left lg:grid-cols-2 p-2.5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.14)]"
              >
                <div className="flex flex-col gap-3 p-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex size-7 items-center justify-center rounded-full ${step.accentBg} text-lg font-medium text-white p-4`}
                    >
                      {step.n}
                    </span>
                    <span
                      className={`rounded-full ${step.accentBg} px-5 py-0.75 text-lg font-medium text-white`}
                    >
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-[25px] font-semibold text-black">{step.title}</p>
                  <p className="text-base text-black/80">{step.description}</p>
                </div>
                <div className={`flex flex-col gap-3 p-4 ${step.bg}`}>
                  <p className="text-[13px] font-semibold uppercase tracking-wide text-black/50">
                    After this step
                  </p>
                  <p className="text-lg font-semibold text-black">
                    {step.outcome}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {step.checklist.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-base font-medium text-black/80"
                      >
                        <span className="text-brand-accent">✔️</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {solution.tools.length > 0 && (
          <section className="flex flex-col items-center gap-10 bg-brand-surface px-6 py-10 text-center">
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
                Built with
              </p>
              <h2 className="text-3xl font-bold text-black sm:text-[40px]">
                Tools you can trust. Stack you own.
              </h2>
              <p className="max-w-150 text-base text-black/60">
                Every tool in your platform is enterprise-grade, widely
                supported, and fully transferable.
              </p>
            </div>
            {/* <div className="w-full max-w-300"> */}
            <div className="w-full">
              <ToolsSlider tools={solution.tools} />
            </div>
          </section>
        )}

        {solution.includedFeatures.length > 0 && (
          <section className="flex flex-col items-center gap-15 bg-brand-surface px-6 py-16 text-center sm:px-25">
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
                What&rsquo;s included
              </p>
              <h2 className="text-3xl font-bold text-black sm:text-[40px]">
                Everything ready on day one.
              </h2>
              {solution.text8 && (
                <p className="max-w-150 text-base text-black/60">
                  No loose ends, no setup left for you to figure out. Your
                  platform launches complete.
                </p>
              )}
            </div>
            <div className="grid w-full max-w-300 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {solution.includedFeatures.map((feature, i) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-start gap-3 rounded-2xl bg-white p-6 text-left"
                >
                  {feature.iconUrl ? (
                    <Image
                      unoptimized={isSvgSrc(feature.iconUrl)}
                      src={feature.iconUrl}
                      alt=""
                      width={28}
                      height={28}
                      className="size-7"
                    />
                  ) : (
                    <Image
                      unoptimized
                      src={`/images/icons/${INCLUDED_FEATURE_ICONS[i % INCLUDED_FEATURE_ICONS.length]}.svg`}
                      alt=""
                      width={28}
                      height={28}
                      className="size-7"
                    />
                  )}
                  <p className="font-semibold text-black">{feature.title}</p>
                  {feature.subtitle && (
                    <p className="text-sm text-black/50">{feature.subtitle}</p>
                  )}
                  {feature.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {feature.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-brand-surface px-3 py-1 text-xs font-medium text-black/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {solution.whatsIncludedIconUrl && (
          <section className="flex flex-col items-center gap-3 bg-brand-surface px-6 pt-8 pb-20 text-center sm:px-25">
            <p className="text-[30px] font-semibold text-brand-accent min-[500px]:text-[15px]">
              WHAT&rsquo;S INCLUDED:
            </p>
            <h2 className="text-[25px] font-semibold text-black min-[400px]:text-[30px] min-[500px]:text-[35px] min-[700px]:text-[40px]">
              Everything ready on day one.
            </h2>
            {solution.text5 && (
              <p className="max-w-175 text-[18px] font-normal text-black/70 min-[500px]:text-[20px]">
                {solution.text5}
              </p>
            )}
            <div className="relative mt-10 aspect-1122/495 w-full max-w-280.5">
              <Image
                unoptimized={isSvgSrc(solution.whatsIncludedIconUrl)}
                src={solution.whatsIncludedIconUrl}
                sizes="(min-width: 1150px) 1122px, 100vw"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </section>
        )}

        {testimonials.length > 0 && (
          <section className="flex flex-col items-center gap-8 bg-black py-16">
            <TestimonialsSlider items={testimonials} />
          </section>
        )}

        {faqs.length > 0 && (
          <section className="flex flex-col items-center gap-10 bg-brand-surface px-6 py-16 sm:px-25">
            <div className="flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl font-bold text-black sm:text-[40px]">
                FAQ
              </h2>
              <p className="max-w-150 text-base text-black/60">
                Clear answers about no-code app development, Bubble services,
                timelines, pricing, and scalability.
              </p>
            </div>
            <FAQAccordion items={faqs} />
          </section>
        )}

        <section
          id="pricing"
          className="mx-auto flex w-full max-w-300 flex-col items-center mb-12.5 gap-10 rounded-[30px] bg-white py-16 text-center shadow-[0px_7px_23px_0px_rgba(0,0,0,0.14)]"
        >
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-3xl font-bold text-black sm:text-[40px]">
              Transparent pricing. No surprises.
            </h2>
            <p className="max-w-150 text-base text-black/60">
              Two tracks — one for getting your platform live, one for
              growing it after launch. Every quote is fixed and confirmed in
              writing before we start.
            </p>
          </div>
          <div className="relative w-full">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-85 bg-[linear-gradient(150deg,rgba(111,47,239,0.2),rgba(62,125,207,0.2),rgba(82,226,251,0.2))]"
            />
            {/* <div className="relative z-10 grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 justify-items-center"> */}
            <div className="relative z-10 flex flex-wrap justify-center gap-6 p-6 pt-12.5">
              <div className="min-w-82.5 flex flex-1 flex-col gap-4 rounded-[25px] bg-white p-6.25 text-left shadow-[0px_7px_23px_0px_rgba(0,0,0,0.14)] min-[800px]:max-w-120">
                <span className="w-fit rounded-full bg-[#e0e4ff] px-4 py-1.5 text-sm font-medium text-brand-accent">
                  Build track
                </span>
                <p className="text-[22px] font-semibold text-black">
                  Launch your platform
                </p>
                <p className="text-sm text-black/80">
                  A fully configured, branded {solution.title} platform — live
                  in weeks. One-time fixed price, scoped before we start.
                </p>
                <p className="text-3xl font-bold text-black">
                  $1,500 – $3,000{" "}
                  <span className="text-base font-normal text-black/50">
                    / one-time
                  </span>
                </p>
                <p className="text-sm text-black/50">
                  Fixed price · confirmed on strategy call · no hourly billing
                </p>
                <ul className="flex flex-col gap-2 border-t border-black/10 pt-4">
                  {[
                    "Core platform features fully configured",
                    "Branding, domain, and mobile-ready design",
                    "Admin panel and user roles",
                    "Third-party integrations included in scope",
                    "Full QA and testing before launch",
                    "Post-launch handover session included",
                    "100% client ownership — no lock-in",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-black/70"
                    >
                      <Image
                        unoptimized
                        src="/images/solutions/tick.svg"
                        alt=""
                        width={19}
                        height={19}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#start-your-project"
                  className="bg-brand-gradient mt-auto flex h-14 items-center justify-center rounded-full text-[20px] font-medium text-white transition-opacity hover:opacity-90"
                >
                  Book a Free Strategy Call
                </a>
              </div>

              <div className="min-w-82.5 flex flex-1 flex-col gap-4 rounded-[25px] bg-white p-6.25 text-left shadow-[0px_7px_23px_0px_rgba(0,0,0,0.14)] min-[800px]:max-w-120">
                <span className="w-fit rounded-full px-4 py-1.5 text-sm font-medium text-[rgb(54,53,207)] bg-[rgb(186,214,255)]">
                  Grow track
                </span>
                <p className="text-[22px] font-semibold text-black">
                  Keep growing after launch
                </p>
                <p className="text-sm text-black/80">
                  Monthly retainer for ongoing support, new features, and
                  platform iterations. Start when you&rsquo;re ready — no
                  lock-in.
                </p>
                <p className="text-3xl font-bold text-black">
                  $300 – $600{" "}
                  <span className="text-base font-normal text-black/50">
                    / month
                  </span>
                </p>
                <p className="text-sm text-black/50">
                  Month-to-month · scope confirmed upfront · cancel anytime
                </p>
                <ul className="flex flex-col gap-2 border-t border-black/10 pt-4">
                  {[
                    "Bug fixes and platform maintenance",
                    "Feature iterations and improvements",
                    "Priority response and turnaround",
                    "New integration and automation scoping",
                    "Monthly review call and roadmap planning",
                    "Scope and pricing confirmed monthly in writing",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-black/70"
                    >
                      <Image
                        unoptimized
                        src="/images/solutions/tick.svg"
                        alt=""
                        width={19}
                        height={19}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#start-your-project"
                  className="mt-auto flex h-14 items-center justify-center rounded-full border border-brand-accent text-[20px] font-medium text-brand-accent transition-colors hover:border-transparent hover:bg-[linear-gradient(45deg,rgb(31,120,255),rgb(65,62,207),rgb(111,47,239))] hover:text-white"
                >
                  Ask us about Grow Track
                </a>
              </div>
            </div>
          </div>
        </section>

        <FreeAudit />

        <section
          id="contact"
          className="relative z-10 -mb-160 max-[1210px]:-mb-140 max-[1025px]:-mb-180 max-[640px]:-mb-250 max-[530px]:-mb-270 overflow-hidden bg-transparent px-6 py-16 sm:px-25"
        >
          {/* <Image
            src="/images/solution-cta-ribbon.webp"
            alt=""
            width={800}
            height={800}
            className="pointer-events-none absolute -left-20 bottom-0 hidden w-75 lg:block"
          />
          <Image
            src="/images/solution-cta-ribbon.webp"
            alt=""
            width={800}
            height={800}
            className="pointer-events-none absolute -right-20 top-0 hidden w-75 scale-x-[-1] lg:block"
          /> */}
          <div className="relative mx-auto flex max-w-200 flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-bold text-black sm:text-[40px]">
              Ready to launch your {solution.title} platform?
            </h2>
            <p className="text-base text-black/60">
              Tell us about your project — we&rsquo;ll map the full scope.
            </p>
          </div>
          {/* <div className="relative mx-auto mt-10 max-w-175"> */}
          <div className="relative mx-auto mt-10">
            <CalendlyWidget />
          </div>
        </section>
      </main>
      <Footer hideStartProjectCard />
    </>
  );
}
