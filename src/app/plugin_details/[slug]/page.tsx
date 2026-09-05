import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getPluginBySlug, formatPluginPrice } from "@/lib/plugins";
import { linkifyText } from "@/lib/linkify";
import { isSvgSrc } from "@/lib/is-svg-src";
import { InstallationSteps } from "./InstallationSteps";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const plugin = await getPluginBySlug(slug);
  if (!plugin) return {};

  return {
    title: plugin.seoTitle || `${plugin.name} — Mind For Apps`,
    description: plugin.seoDescription || plugin.shortDescription || undefined,
  };
}

const TAG_COLORS = [
  "#ffd5bd",
  "#bdefff",
  "#b6f5b5",
  "#bdd1ff",
  "#aaf3f0",
  "#e4c7f7",
];

export default async function PluginDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plugin = await getPluginBySlug(slug);

  if (!plugin) notFound();

  const price = formatPluginPrice(plugin.priceMonthly, plugin.priceOneTime);

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="bg-brand-surface px-6 pt-8 pb-16 sm:px-25">
          <div className="mx-auto grid w-full max-w-300 grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_430px]">
            <div className="flex flex-col gap-5 mt-6">
              <div className="flex items-center gap-2 text-base text-medium text-black">
                <Link href="/plugins" className="hover:text-black">
                  Plugins
                </Link>
                <span>&gt;</span>
                <span className="text-black">{plugin.name}</span>
              </div>

              <h1 className="text-[32px] font-medium text-black">
                {plugin.name}
              </h1>

              {plugin.categories.length > 0 && (
                <div className="flex flex-wrap gap-2.5">
                  {plugin.categories.map((category, i) => (
                    <span
                      key={category.id}
                      className="rounded-full px-4 py-1 text-base font-normal text-black"
                      style={{ backgroundColor: TAG_COLORS[i % TAG_COLORS.length] }}
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}

              {plugin.logoUrl && (
                <div className="relative mt-5 size-25 overflow-hidden rounded-full">
                  <Image
                    unoptimized={isSvgSrc(plugin.logoUrl)}
                    src={plugin.logoUrl}
                    alt={plugin.name}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 rounded-[20px] bg-white p-8">
              {price &&
                (plugin.marketUrl ? (
                  <a
                    href={plugin.marketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12.5 items-center justify-center rounded-[55px] bg-brand-accent px-6 text-center text-[16px] min-[365px]:text-[20px] font-bold uppercase text-white transition-colors hover:bg-[linear-gradient(266deg,rgb(45,184,255),rgb(118,148,255),rgb(163,154,255))] hover:text-white"
                  >
                    {price}
                  </a>
                ) : (
                  <span className="flex h-15.5 items-center justify-center rounded-[55px] bg-brand-accent px-6 text-center text-[20px] font-bold uppercase text-white">
                    {price}
                  </span>
                ))}

              {plugin.demoUrl && (
                <a
                  href={plugin.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-12.5 items-center justify-center gap-2 rounded-[55px] border border-[#1b4acf] bg-white px-6 text-[20px] font-bold text-[#1b4acf] transition-colors hover:border-transparent hover:bg-[linear-gradient(266deg,rgb(45,184,255),rgb(118,148,255),rgb(163,154,255))] hover:text-white"
                >
                  Check it Live
                  <span className="relative size-4 shrink-0">
                    <Image
                      unoptimized
                      src="/images/plugins/arrow-check-live.svg"
                      alt=""
                      fill
                      className="object-contain group-hover:opacity-0"
                    />
                    <Image
                      unoptimized
                      src="/images/plugins/arrow-check-live-white.svg"
                      alt=""
                      fill
                      className="object-contain opacity-0 group-hover:opacity-100"
                    />
                  </span>
                </a>
              )}

              <div className="mt-2 flex items-center justify-between gap-1">
                <div className="flex flex-col gap-4">
                  <p className="max-w-55 text-[22px] text-black">
                    Ready to start your own project?
                  </p>
                  <Link
                    href="/contact"
                    className="flex h-12.5 items-center justify-center mb-5 rounded-[55px] bg-brand-accent px-6 text-[16px] font-bold uppercase text-white transition-colors hover:bg-[linear-gradient(266deg,rgb(45,184,255),rgb(118,148,255),rgb(163,154,255))] hover:text-white"
                  >
                    Book a meeting
                  </Link>
                </div>
                <div className="relative -mr-4 -mb-4 h-28.75 w-40.5 shrink-0 right-6">
                  <Image
                    src="/images/plugins/book-meeting-illustration.png"
                    alt=""
                    fill
                    sizes="162px"
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand-surface px-6 pb-16 sm:px-25">
          <div className="mx-auto grid w-full max-w-300 grid-cols-1 items-start gap-10 px-5 lg:grid-cols-[1fr_430px]">
            <div className="flex flex-col gap-10 -mt-6">
              <div className="flex flex-col gap-1">
                <p className="text-[24px] font-normal text-black">Plugin details</p>
                <Image
                  unoptimized
                  src="/images/plugins/line-divider.svg"
                  alt=""
                  width={391}
                  height={1}
                  className="h-px w-full max-w-97.75"
                />
                <h2 className="text-[24px] font-normal text-black">
                  Overview &amp; Key Features
                </h2>
              </div>

              {plugin.description && (
                <p className="text-[15px] leading-[1.4] text-black/80">
                  {linkifyText(plugin.description)}
                </p>
              )}

              {plugin.installationSteps.length > 0 && (
                <div className="flex flex-col gap-5">
                  <h2 className="text-[24px] font-normal text-black">
                    Installation
                  </h2>
                  <InstallationSteps steps={plugin.installationSteps} />
                </div>
              )}

              <div
                className="flex flex-col items-center gap-6 rounded-[20px] px-8 py-14 text-center"
                style={{
                  background:
                    "linear-gradient(319deg, rgb(95, 119, 245), rgb(107, 183, 252), rgb(168, 191, 248))",
                }}
              >
                <p className="max-w-100 text-[28px] font-medium text-black">
                  Need help adjusting your new application?
                </p>
                <Link
                  href="/contact"
                  className="flex h-13 items-center justify-center rounded-[55px] bg-white px-18 text-[16px] font-bold uppercase text-black transition-colors hover:bg-[linear-gradient(266deg,rgb(45,184,255),rgb(118,148,255),rgb(163,154,255))] hover:text-white"
                >
                  Contact us
                </Link>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-[24px] font-normal text-black">Support</h2>
                <p className="text-lg text-black/80">
                  And if you have any questions, reach out to us at{" "}
                  <a
                    href="mailto:support@mindforapps.com"
                    className="text-brand-accent underline"
                  >
                    support@mindforapps.com
                  </a>
                </p>
              </div>
            </div>

            <Link
              href="/plugins"
              className="flex items-center gap-3 text-lg font-medium text-black underline hover:no-underline"
            >
              More plugins
              <Image
                unoptimized
                src="/images/plugins/arrow-more-plugins.svg"
                alt=""
                width={42}
                height={16}
              />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
