"use client";

import { useState } from "react";
import Image from "next/image";
import { submitAuditInquiry } from "./audit-actions";

const REQUEST_INCLUDES = [
  "Reviewed live within 5 business days",
  "~20 minutes, no obligation",
  "Only 10 audits taken each month",
  "We don't sell or spam your email",
];

export function RequestAuditForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle",
  );

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    try {
      await submitAuditInquiry(formData);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="request" className="bg-black px-6 py-16">
      <div className="mx-auto grid w-full max-w-300 grid-cols-1 overflow-hidden rounded-[30px] shadow-[0px_20px_60px_0px_rgba(0,0,0,0.4)] min-[750px]:grid-cols-[300px_1fr] min-[1200px]:grid-cols-[400px_1fr]">
        <div
          className="flex flex-col gap-8 py-10 px-5 sm:px-10"
          style={{
            background:
              "linear-gradient(180deg, rgb(1, 101, 253), rgb(46, 45, 153), rgb(7, 15, 103))",
          }}
        >
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold text-white sm:text-[40px]">
              Request your free audit
            </h2>
            <p className="text-xl text-white/80">
              Tell us where to look. Next step is picking a time —
              you&rsquo;ll get instant confirmation.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {REQUEST_INCLUDES.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Image
                  unoptimized
                  src="/images/free-seo-audit/icon-8.svg"
                  alt=""
                  width={28}
                  height={28}
                  className="mt-0.5 shrink-0"
                />
                <p className="text-xl font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {status === "done" ? (
          <div className="flex flex-col items-center justify-center gap-2 bg-white p-10 text-center sm:p-14">
            <p className="text-2xl font-semibold text-black">
              Request received.
            </p>
            <p className="text-lg text-black/70">
              We&rsquo;ll follow up shortly to lock in a call time.
            </p>
          </div>
        ) : (
          <form
            action={handleSubmit}
            className="flex flex-col gap-6 bg-white p-10 sm:p-14"
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="website-url"
                className="text-base font-medium text-black"
              >
                Website URL*
              </label>
              <input
                id="website-url"
                name="website_url"
                type="text"
                placeholder="yourwebsite.com"
                required
                className="border-b border-black/20 pb-2 text-black outline-none focus:border-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-6 max-[849px]:min-[750px]:grid-cols-1">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-base font-medium text-black"
                >
                  Name*
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="border-b border-black/20 pb-2 text-black outline-none focus:border-black"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-base font-medium text-black"
                >
                  Email*
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="border-b border-black/20 pb-2 text-black outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="goal"
                className="text-base font-medium text-black"
              >
                Main goal or biggest frustration*
              </label>
              <input
                id="goal"
                name="goal"
                type="text"
                required
                className="border-b border-black/20 pb-2 text-black outline-none focus:border-black"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="win"
                className="text-base font-medium text-black"
              >
                What would make this audit a win for you?
              </label>
              <input
                id="win"
                name="win"
                type="text"
                className="border-b border-black/20 pb-2 text-black outline-none focus:border-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-6 max-[849px]:min-[750px]:grid-cols-1">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="markets"
                  className="text-base font-medium text-black"
                >
                  Target markets / locations (optional)
                </label>
                <input
                  id="markets"
                  name="markets"
                  type="text"
                  className="border-b border-black/20 pb-2 text-black outline-none focus:border-black"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="competitors"
                  className="text-base font-medium text-black"
                >
                  Main competitors (optional)
                </label>
                <input
                  id="competitors"
                  name="competitors"
                  type="text"
                  className="border-b border-black/20 pb-2 text-black outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="company-size"
                className="text-base font-medium text-black"
              >
                Company size or rough monthly traffic{" "}
                <span className="font-normal text-black/40">optional</span>
              </label>
              <select
                id="company-size"
                name="company_size"
                defaultValue=""
                className="border-b border-black/20 bg-transparent pb-2 text-black outline-none focus:border-black"
              >
                <option value="">Prefer not to say</option>
                <option value="solo">Solo / just me</option>
                <option value="small">2–10 people</option>
                <option value="medium">11–50 people</option>
                <option value="large">50+ people</option>
              </select>
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600">
                Something went wrong — please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="group mt-4 flex h-14 items-center justify-center gap-2 rounded-full border-2 border-transparent bg-black px-8 text-lg font-semibold text-white transition-colors hover:border-[#314cde] hover:bg-transparent hover:text-[#314cde] disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Continue to start audit"}
              <span className="relative size-4 shrink-0">
                <Image
                  unoptimized
                  src="/images/services/nav/arrow-right-white.svg"
                  alt=""
                  fill
                  className="object-contain group-hover:opacity-0"
                />
                <Image
                  unoptimized
                  src="/images/free-seo-audit/arrow-right-314cde.svg"
                  alt=""
                  fill
                  className="object-contain opacity-0 group-hover:opacity-100"
                />
              </span>
            </button>
            <p className="text-center text-sm text-black/50">
              Next: choose a call time. Takes about 30 seconds.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
