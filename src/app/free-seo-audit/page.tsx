import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { getFreeSeoAuditFaqs } from "@/lib/faqs";
import { BookConsultationButton } from "@/components/BookConsultationButton";
import { RequestAuditForm } from "./RequestAuditForm";

export const metadata: Metadata = {
  title: "Free SEO Audit — Mind For Apps",
  description:
    "A free SEO & GEO audit of your website, search presence, and AI visibility — walked through live with you in a focused 20-minute call.",
};

const PROBLEM_AREAS = [
  {
    icon: "icon-1.svg",
    title: "Website & performance",
    description:
      "Load speed, mobile responsiveness, and the UX issues quietly losing you visitors.",
  },
  {
    icon: "icon-2.svg",
    title: "SEO & local search",
    description:
      "Google Business Profile, local pack position, and the keyword gaps you're missing.",
  },
  {
    icon: "icon-3.svg",
    title: "GEO & AI visibility",
    description:
      "Whether AI engines can find, understand, and cite your business — schema, structured data, llms.txt.",
  },
  {
    icon: "icon-4.svg",
    title: "Booking & conversion flow",
    description:
      "A mystery-shopper walk of your funnel: click count, friction points, and drop-off.",
  },
  {
    icon: "icon-5.svg",
    title: "Reputation & reviews",
    description:
      "Ratings, volume, response rate, and how you stack up against one local competitor.",
  },
  {
    icon: "icon-6.svg",
    title: "Revenue leakage",
    description:
      "A rough, honest dollar figure on what your current setup is costing you each month.",
  },
];

const GEO_ITEMS = [
  {
    title: "Structured data & schema",
    description: "Can engines parse who you are and what you offer?",
  },
  {
    title: "llms.txt presence",
    description: "The file that tells AI crawlers how to read you.",
  },
  {
    title: "AI-citation presence",
    description: "Are you showing up — and cited — in AI answers today?",
  },
  {
    title: "Entity clarity",
    description: "Is your brand a clear, consistent entity across the web?",
  },
];

const FREE_AUDIT_INCLUDES = [
  "Current-state review of your setup",
  "Top friction points and lost-revenue signals",
  "High-level, prioritized recommendations",
  "An honest read on whether a deep-dive fits",
  "A real person on the call — not an automated scan",
];

const DEEP_DIVE_INCLUDES = [
  "All 30 audit components",
  "Customer journey mapping",
  "Financial impact model",
  "Customer lifetime value",
  "Retention & churn analysis",
  "Prioritized action plan",
  "90-day strategic roadmap",
];

const STEPS = [
  {
    n: 1,
    title: "Request",
    description:
      "Tell us your site and your biggest frustration. Takes about two minutes.",
  },
  {
    n: 2,
    title: "Book",
    description:
      "Pick a time right after the form. You get an instant confirmation by email.",
  },
  {
    n: 3,
    title: "Live review",
    description:
      "We walk your findings with you in ~20 minutes. You keep the notes.",
  },
  {
    n: 4,
    title: "Go deeper",
    description:
      "If it's a fit, we scope the full deep-dive or an ongoing retainer.",
  },
];

export default async function FreeSeoAuditPage() {
  const faqs = await getFreeSeoAuditFaqs();

  return (
    <>
      <div className="relative overflow-hidden">
        <Image
          src="/images/free-seo-audit/bg.webp"
          alt=""
          width={1400}
          height={1458}
          className="pointer-events-none absolute -top-10 right-0 -z-10 w-[55%] min-w-full h-full"
        />

        <Header />

        <div className="relative z-10 flex flex-1 flex-col">
          <section className="flex flex-col gap-8 px-6 pb-20 pt-16 sm:px-25">
            <div className="flex max-w-175 flex-col gap-6">
              <h1 className="text-4xl font-bold leading-[1.15] text-black sm:text-[56px]">
                See exactly why customers — and AI — can&rsquo;t find you.
              </h1>
              <p className="max-w-135 text-lg text-black/60">
                A free SEO &amp; GEO audit of your website, search presence,
                and AI visibility — walked through live with you in a focused
                20-minute call. No PDF you&rsquo;ll never open.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#request"
                  className="flex h-14 items-center justify-center rounded-[50px] border-2 border-transparent bg-[linear-gradient(220deg,rgb(111,47,239),rgb(65,62,207),rgb(31,120,255))] px-8 text-lg font-semibold text-white transition-colors hover:border-[#314cde] hover:bg-none hover:text-[#314cde]"
                >
                  Request your free audit
                </a>
                <a
                  href="#what-it-solves"
                  className="flex h-14 items-center justify-center rounded-[50px] border border-black/15 bg-white px-8 text-lg font-medium text-black transition-colors hover:border hover:border-solid hover:border-[#314cde] hover:text-[#314cde]"
                >
                  See what we review
                </a>
              </div>
            </div>
          </section>

          <section className="flex flex-col items-center gap-10 bg-[rgba(255,255,255,0.6)] px-6 py-16 sm:px-25">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold text-black sm:text-[40px]">
                One path, four steps.
              </h2>
              <p className="max-w-175 text-lg text-black/70">
                No tiers to pick and no upsell maze. You request an audit, we
                run it by hand, and we walk the findings with you on a call.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-300">
              {STEPS.map((step) => (
                <div
                  key={step.n}
                  className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.14)]"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-[#e1e0ff] text-lg font-semibold text-brand-purple">
                    {step.n}
                  </span>
                  <p className="text-xl font-bold text-black">{step.title}</p>
                  <p className="text-base text-black/60">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="what-it-solves"
            className="flex flex-col items-center gap-3 px-6 pt-16 text-center sm:px-25"
          >
            <h2 className="text-3xl font-bold text-black sm:text-[40px]">
              What Problem It Solves
            </h2>
            <p className="max-w-150 text-base text-black/60 sm:text-lg">
              Six areas we check by hand — and what each one is costing you
              right now.
            </p>
          </section>
        </div>
      </div>

      <main className="flex flex-1 flex-col pb-16">
        <section className="flex flex-col items-center gap-10 px-6 pb-16 pt-10 sm:px-25">
          <div className="grid w-full max-w-300 grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEM_AREAS.map((area) => (
              <div
                key={area.title}
                className="flex flex-col gap-4 rounded-2xl border border-black/15 p-8"
              >
                <Image
                  unoptimized
                  src={`/images/free-seo-audit/${area.icon}`}
                  alt=""
                  width={41}
                  height={41}
                  className="size-10"
                />
                <p className="text-xl font-bold text-black">{area.title}</p>
                <p className="text-base text-black/50">{area.description}</p>
              </div>
            ))}
          </div>

          <div className="flex w-full max-w-300 items-center gap-6 rounded-[30px] bg-white p-8 text-left">
            <Image
              unoptimized
              src="/images/free-seo-audit/icon-7.svg"
              alt=""
              width={70}
              height={70}
              className="shrink-0"
            />
            <p className="text-xl text-black">
              <span className="font-bold">
                Two signature finds in every audit:
              </span>{" "}
              <br />
              <span className="font-bold text-brand-accent">
                a Mystery Shopper walkthrough &amp; a You vs. Them snapshot.
              </span>
            </p>
          </div>

          <div
            className="grid w-full max-w-287.5 grid-cols-1 gap-10 rounded-[30px] p-10 text-left shadow-[0px_4px_20px_0px_rgba(1,101,253,0.14)] sm:p-14 lg:grid-cols-2"
            style={{
              background:
                "linear-gradient(108deg, rgb(1, 101, 253), rgb(46, 45, 153), rgb(7, 15, 103))",
            }}
          >
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-semibold text-white sm:text-[40px]">
                Search isn&rsquo;t just Google anymore.
              </h2>
              <p className="text-xl text-white/80">
                More buyers ask an AI before they ever reach your site. If AI
                engines can&rsquo;t read your business, you&rsquo;re invisible
                in the answers that increasingly decide the sale. Every audit
                includes a GEO-readiness pass.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {GEO_ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-2xl bg-[rgba(255,255,255,0.3)] p-4"
                >
                  <Image
                    unoptimized
                    src="/images/free-seo-audit/icon-8.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="mt-0.5 shrink-0"
                  />
                  <p className="text-base text-white">
                    <span className="font-bold">{item.title}</span>
                    <br />
                    <span className="text-white/80">{item.description}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <section className="mx-auto flex w-full max-w-300 flex-col items-center gap-10 rounded-[30px] bg-white py-16 text-center shadow-[0px_7px_23px_0px_rgba(0,0,0,0.14)]"> */}
        <section className="mx-auto flex w-full flex-col items-center gap-10 rounded-[30px] bg-white py-16 text-center">
          <div className=" px-5">
            <h2 className="text-3xl font-bold text-black sm:text-[40px]">
              Start with an audit. No surprises.
            </h2>
            <p className="max-w-150 text-base text-black/60">
              A free call shows you where you stand. When you&rsquo;re ready
              to go deeper, the paid deep-dive goes all the way — 30
              components, modeled and prioritized, and credited toward your
              build.
            </p>
          </div>

          <div className="relative w-full">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-85 bg-[rgba(216,239,255,0.5)]"
            />
            <div className="relative z-10 flex flex-wrap justify-center gap-8 p-6 pt-12.5">
              <div className="min-w-82.5 flex flex-1 flex-col gap-4 rounded-[25px] bg-white p-6.25 text-left shadow-[0px_7px_23px_0px_rgba(0,0,0,0.14)] min-[800px]:max-w-120">
                <span className="w-fit rounded-full bg-[#e0e4ff] px-4 py-1.5 text-sm font-medium text-brand-accent">
                  Free audit
                </span>
                <p className="text-[22px] font-semibold text-black">
                  See where you stand
                </p>
                <p className="text-sm text-black/80">
                  A focused, no-cost review of your current setup. We surface
                  the gaps, the quick wins, and whether a deeper engagement is
                  even worth it — live, on a call.
                </p>
                <p className="text-[35px] font-semibold text-black">
                  Free{" "}
                  <span className="text-base font-normal text-black/50">
                    / no obligation
                  </span>
                </p>
                <p className="text-sm text-black/50">
                  Scoped to your size and goals on the call
                </p>
                <p className="border-t border-black/10 pt-4 text-sm font-medium text-black">
                  What you get
                </p>
                <ul className="flex flex-col gap-2">
                  {FREE_AUDIT_INCLUDES.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-black/70"
                    >
                      <Image
                        unoptimized
                        src="/images/free-seo-audit/tick.svg"
                        alt=""
                        width={19}
                        height={19}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#request"
                  className="bg-brand-gradient mt-auto flex h-14 items-center justify-center rounded-full text-[20px] font-medium text-white transition-opacity hover:opacity-90"
                >
                  Start with the free audit
                </a>
              </div>

              <div className="min-w-82.5 flex flex-1 flex-col gap-4 rounded-[25px] bg-white p-6.25 text-left shadow-[0px_7px_23px_0px_rgba(0,0,0,0.14)] min-[800px]:max-w-120">
                <span className="w-fit rounded-full px-4 py-1.5 text-sm font-medium text-[rgb(54,53,207)] bg-[rgb(186,214,255)]">
                  Deep-dive
                </span>
                <p className="text-[22px] font-semibold text-black">
                  The full picture, modeled
                </p>
                <p className="text-sm text-black/80">
                  The complete engagement — 30 components analyzed, modeled,
                  and prioritized into a plan you can act on. Pitched on your
                  call only if it&rsquo;s a genuine fit. No pressure.
                </p>
                <p className="text-[35px] font-semibold text-black">
                  $750 – $1,500{" "}
                  <span className="text-base font-normal text-black/50">
                    / project
                  </span>
                </p>
                <p className="text-sm text-black/50">Everything, at full depth</p>
                <p className="border-t border-black/10 pt-4 text-sm font-medium text-black">
                  What&rsquo;s included
                </p>
                <ul className="flex flex-col gap-2">
                  {DEEP_DIVE_INCLUDES.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-black/70"
                    >
                      <Image
                        unoptimized
                        src="/images/free-seo-audit/tick.svg"
                        alt=""
                        width={19}
                        height={19}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <BookConsultationButton className="mt-auto flex h-14 items-center justify-center rounded-full border border-brand-accent text-[20px] font-medium text-brand-accent transition-colors hover:border-transparent hover:bg-[linear-gradient(45deg,rgb(31,120,255),rgb(65,62,207),rgb(111,47,239))] hover:text-white">
                  Book the deep-dive
                </BookConsultationButton>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden">
          <Image
            src="/images/free-seo-audit/bg2.webp"
            alt=""
            width={3840}
            height={888}
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 w-full"
          />
          {/* <div className="relative z-10 mx-auto grid w-full max-w-300 grid-cols-1 items-start gap-10 px-6 py-16 sm:px-25 lg:grid-cols-2"> */}
          <div className="relative z-10 mx-auto grid w-full max-w-300 grid-cols-1 items-start gap-10 px-6 py-16 lg:grid-cols-[390px_1fr]">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold text-black sm:text-[40px]">
                A real person runs your audit.
              </h2>
              <p className="max-w-125 text-lg text-black/80">
                Not a dashboard, not an automated scan. The findings come
                from someone who&rsquo;s done this before and will be on the
                call with you.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="relative size-36.25 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src="/images/free-seo-audit/photo.png"
                    alt="Jay D"
                    fill
                    sizes="145px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xl font-bold text-black">Jay D</p>
                  <p className="text-base text-black/80">
                    I&rsquo;m Jay, and I run every audit myself — live, not
                    an automated scan. I&rsquo;m here to be useful, not to
                    sell you: after 50+ service businesses, I usually see how
                    yours breaks before you&rsquo;ve finished describing it,
                    and I&rsquo;ll tell you the things that are actually
                    costing you.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col justify-between gap-6 rounded-2xl bg-white p-6 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]">
                  <p className="text-base font-medium leading-[1.3] text-black">
                    &ldquo;I walked in worried about the wrong thing
                    entirely. Jay pointed at two problems I hadn&rsquo;t even
                    noticed — and those were the ones actually costing
                    me.&rdquo;
                  </p>
                  <p className="text-right text-sm text-black/80">
                    Diane Hovey — PhotoInsights
                  </p>
                </div>
                <div className="flex flex-col justify-between gap-6 rounded-2xl bg-white p-6 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]">
                  <p className="text-base font-medium leading-[1.3] text-black">
                    &ldquo;Jay explained where we were losing bookings in
                    plain language. I understood it, my ops manager
                    understood it, and we fixed it that week.&rdquo;
                  </p>
                  <p className="text-right text-sm text-black/80">
                    Alliance for Healing
                    <br />
                    Michael Schweizer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <RequestAuditForm />

        {faqs.length > 0 && (
          <section className="flex flex-col items-center gap-10 px-6 pb-16">
            <h2 className="text-3xl font-bold text-black sm:text-[40px] mt-12.5">
              Good to know.
            </h2>
            <FAQAccordion items={faqs} />
          </section>
        )}
      </main>

      <Footer hideStartProjectSection />
    </>
  );
}
