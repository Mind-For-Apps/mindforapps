import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const TEAM = [
  "Jay",
  "Anna",
  "Irine",
  "Andrew",
  "Marina",
  "Ira",
  "Kirill",
  "Ann",
  "Azalia",
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center px-5 py-16">
        <div className="flex flex-col items-center text-center">
          <h1 className="mx-5 mb-6.25 text-[36px] font-semibold text-black">
            About Us
          </h1>
          <p className="mx-5 mb-10 max-w-175 text-[15px] font-normal text-black/70">
            Every project we build is crafted with personal attention,
            because we believe in relationships, not just transactions.
          </p>
        </div>

        <div className="grid w-full max-w-262.5 grid-cols-1 gap-6.25 min-[365px]:grid-cols-2 min-[540px]:grid-cols-3">
          {TEAM.map((name, i) => (
            <div
              key={name}
              className="relative aspect-square overflow-hidden rounded-[35px]"
            >
              <Image
                src={`/images/about_us/${name}.png`}
                alt={name}
                fill
                priority={i === 0}
                sizes="(min-width: 540px) 332px, (min-width: 365px) calc((100vw - 65px) / 2), calc(100vw - 40px)"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="my-27.5 flex w-full max-w-262.5 flex-col gap-10 min-[850px]:flex-row min-[850px]:items-start min-[850px]:justify-between">
          <div className="w-full min-w-70 max-w-none min-[470px]:min-w-80 min-[850px]:max-w-117.5">
            <h2 className="mb-2.5 text-[22px] font-semibold text-black min-[460px]:text-[27px]">
              Want to be part of our team?
            </h2>
            <p className="text-[18px] font-normal text-black/70 min-[460px]:text-[20px]">
              We&apos;re always on the lookout for talented, ambitious people
              who share our passion and drive to make a difference. If
              you&apos;re someone who loves big ideas and bold moves — we
              want to hear from you.
            </p>
          </div>

          <div
            className="w-full min-h-47.5 min-w-70 max-w-none rounded-[15px] py-10 pl-3.75 pr-3.75 min-[380px]:pl-6.25 min-[380px]:pr-5 min-[470px]:min-w-105 min-[500px]:pl-12.5 min-[500px]:pr-10 min-[850px]:max-w-131.75 min-[850px]:pl-6.25 min-[850px]:pr-5 min-[900px]:pl-12.5 min-[900px]:pr-10"
            style={{
              background:
                "linear-gradient(to right, rgba(120, 233, 193, 0.4), rgba(168, 255, 224, 0.4), rgba(73, 199, 213, 0.4))",
            }}
          >
            <p className="mb-4 text-[16px] font-semibold text-black min-[420px]:text-[18px] min-[460px]:text-[20px]">
              Send your CV or a short message to:
            </p>
            <a
              href="mailto:contact@mindforapps.com"
              className="flex items-center gap-3 text-[16px] font-normal text-black min-[420px]:text-[18px] min-[460px]:text-[20px]"
            >
              <Image
                src="/images/about_us/mail-icon.svg"
                alt=""
                width={34}
                height={34}
                className="size-8.5 shrink-0"
              />
              contact@mindforapps.com
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
