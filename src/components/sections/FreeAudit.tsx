import Image from "next/image";
import Link from "next/link";
import { BookConsultationButton } from "@/components/BookConsultationButton";

export function FreeAudit({ href }: { href?: string } = {}) {
  const buttonClassName =
    "self-end rounded-full bg-white px-8 py-4 text-xl font-medium text-black transition-colors hover:bg-black hover:text-white max-[530px]:w-full mt-5";

  return (
    // <section className="flex flex-col items-center bg-brand-surface px-6 py-6 sm:px-25">
    <section className="flex flex-col items-center bg-brand-surface px-6 py-6">
      <div className="flex w-full max-w-300 flex-col gap-8 min-[800px]:flex-row min-[800px]:justify-center px-5">
        {/* <div className="flex min-h-108.25 min-w-100 max-w-195 flex-1 flex-col justify-between gap-8 rounded-[5px] bg-brand-accent p-12.5 max-[799px]:max-w-none max-[499px]:min-w-50 max-[499px]:px-7.5"> */}
        <div className="flex min-h-108.25 min-w-100 max-w-195 flex-1 flex-col justify-between gap-2 rounded-[5px] bg-brand-accent p-12.5 max-[799px]:max-w-none max-[499px]:min-w-50 max-[499px]:px-7.5">
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-bold text-[#7dd3fc] sm:text-[40px]">
              Not sure what to build yet?
            </p>
            <p className="text-2xl font-bold text-white sm:text-[40px]">
              Start with an audit.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-base text-white sm:text-lg">
            <p>
              30 minutes with us, looking at how your business actually runs
              — <strong>bookings, follow-ups, tools, lead flow.</strong>
            </p>
            <p>
              You walk away with concrete recommendations, whether you build
              anything or not.
            </p>
          </div>

          {href ? (
            <Link href={href} className={buttonClassName}>
              Book a Free Audit
            </Link>
          ) : (
            <BookConsultationButton className={buttonClassName}>
              Book a Free Audit
            </BookConsultationButton>
          )}
        </div>

        {/* <div className="relative flex min-h-108.25 min-w-70 max-w-101.25 flex-1 items-center justify-center overflow-hidden rounded-[5px] bg-white p-8 max-[799px]:max-w-none"> */}
        <div className="relative flex min-h-108.25 min-w-70 max-w-101.25 flex-1 items-center justify-center overflow-hidden rounded-[5px] bg-white max-[799px]:max-w-none">
          <Image
            src="/images/Group-mfa.png"
            alt="Mind For Apps"
            width={405}
            height={256}
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
