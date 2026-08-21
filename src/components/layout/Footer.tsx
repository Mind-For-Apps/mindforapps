"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookConsultationButton } from "@/components/BookConsultationButton";
import { createClient } from "@/lib/supabase/client";
import { submitProjectInquiry } from "./inquiry-actions";

type Stage = {
  value: string;
  description: string;
  icon: string;
};

const STAGES: Stage[] = [
  {
    value: "Exploring",
    description:
      "I know the problem I'm solving — I need help building the solution.",
    icon: "/images/Exploring.svg",
  },
  {
    value: "Project Brief",
    description: "You have a brief — we'll turn it into a Bubble build plan.",
    icon: "/images/Project-Brief.svg",
  },
  {
    value: "Full Requirements",
    description:
      "Requirements defined — we'll handle UX/UI and Bubble development.",
    icon: "/images/Full-Requirements.svg",
  },
  {
    value: "Full Designs",
    description: "Designs handed off — we will help you bring it to life.",
    icon: "/images/Full-Designs.svg",
  },
];

const BUDGETS = ["$3,000", "$6,000", "$9,000+", "Not sure yet"];

const NAV_LEFT = [
  { label: "Home", href: "/" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Services", href: "/services" },
  { label: "Templates", href: "/templates" },
  { label: "Solutions", href: "/solutions" },
];

const NAV_RIGHT = [
  { label: "Contact", href: "/contact" },
  { label: "About us", href: "/about" },
  { label: "Plugins", href: "/plugins" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6v8.2h-4v-7.3c0-1.7 0-4-2.4-4s-2.8 1.9-2.8 3.9V21h-4V9Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12s0-3.4-.4-5a2.8 2.8 0 0 0-2-2C17.9 4.5 12 4.5 12 4.5s-5.9 0-7.6.5a2.8 2.8 0 0 0-2 2C2 8.6 2 12 2 12s0 3.4.4 5a2.8 2.8 0 0 0 2 2c1.7.5 7.6.5 7.6.5s5.9 0 7.6-.5a2.8 2.8 0 0 0 2-2c.4-1.6.4-5 .4-5ZM10 15.5v-7l6 3.5-6 3.5Z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.8.2-2.6l1.4-6s-.3-.7-.3-1.7c0-1.6.9-2.8 2.1-2.8 1 0 1.5.7 1.5 1.6 0 1-.6 2.5-1 3.9-.2 1.1.6 2 1.7 2 2.1 0 3.5-2.6 3.5-5.8 0-2.4-1.6-4.2-4.6-4.2-3.3 0-5.4 2.5-5.4 5.2 0 1 .3 1.6.7 2.2.2.2.2.3.1.5l-.3 1c-.1.3-.3.4-.6.3-1.5-.6-2.2-2.3-2.2-4.2 0-3.1 2.6-6.9 7.8-6.9 4.2 0 6.9 3 6.9 6.3 0 4.3-2.4 7.6-5.9 7.6-1.2 0-2.3-.6-2.6-1.4l-.7 2.8c-.3 1-.9 2.2-1.3 3A10 10 0 1 0 12 2Z" />
      </svg>
    ),
  },
  {
    label: "Behance",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.9 9.6H3v9h4c2.2 0 3.8-1 3.8-2.9 0-1.3-.7-2.1-1.7-2.5.7-.4 1.2-1.1 1.2-2.1 0-1.7-1.4-2.5-3.4-2.5Zm-.5 3.6H5v-1.8h1.4c.8 0 1.2.3 1.2.9 0 .6-.4.9-1.2.9Zm.2 3.7H5v-2h1.6c.9 0 1.4.4 1.4 1 0 .6-.5 1-1.4 1ZM15.5 9.3c-2.3 0-4 1.6-4 4.1s1.7 4 4.1 4c1.7 0 2.9-.7 3.5-2h-1.9c-.3.4-.9.7-1.6.7-1 0-1.8-.6-1.9-1.7h5.6c0-2.7-1.2-5.1-3.8-5.1Zm-1.8 3.4c.1-.9.7-1.6 1.7-1.6.9 0 1.5.6 1.6 1.6h-3.3ZM12.5 7h6v1.2h-6z" />
      </svg>
    ),
  },
  {
    label: "Dribbble",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.7 4.6a8.3 8.3 0 0 1 1.8 5c-.3 0-2.7-.5-5.4-.2-.1-.3-.2-.5-.4-.8l-.4-.9c2.9-1.2 4.2-2.9 4.4-3.1ZM12 3.7c1.9 0 3.7.7 5 1.9-.2.2-1.3 1.8-4.1 2.8a34.6 34.6 0 0 0-3.2-5.3c.7-.3 1.5-.4 2.3-.4Zm-3.8 1a33 33 0 0 1 3.2 5.3c-4 1.1-7.6 1-8 1a8.4 8.4 0 0 1 4.8-6.3Zm-4.9 7.4v-.3c.4 0 4.5.1 8.8-1.2.2.5.4 1 .6 1.4l-.3.1c-4.5 1.5-6.9 5.5-7.1 5.8a8.3 8.3 0 0 1-2-5.8Zm8.7 8.3c-1.9 0-3.6-.6-5-1.7.1-.3 2-3.8 6.9-5.6h.1c1.2 3.3 1.7 6 1.9 6.9-1.2.6-2.5.9-3.9.9v-.5Zm5.3-1.4c-.1-.6-.6-3.2-1.7-6.4 2.5-.4 4.7.3 5 .4a8.4 8.4 0 0 1-3.3 6Z" />
      </svg>
    ),
  },
];

function CloudUploadIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 18a4.5 4.5 0 0 1-1-8.9 5.5 5.5 0 0 1 10.7-2A4.5 4.5 0 0 1 17 18" />
      <path d="M12 12v7" />
      <path d="m9 15 3-3 3 3" />
    </svg>
  );
}

export function Footer({
  openContactForm = false,
  hideStartProjectCard = false,
}: {
  openContactForm?: boolean;
  hideStartProjectCard?: boolean;
}) {
  const messageId = useId();
  const [stage, setStage] = useState<string | null>(
    openContactForm ? STAGES[0].value : null,
  );
  const [budget, setBudget] = useState<string | null>(null);
  const [filePaths, setFilePaths] = useState<string[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle",
  );

  async function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    const supabase = createClient();
    const uploadedPaths: string[] = [];
    const uploadedNames: string[] = [];

    for (const file of files) {
      const ext = file.name.split(".").pop();
      const path = `inquiries/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("project-inquiry-files")
        .upload(path, file);
      if (!error) {
        uploadedPaths.push(path);
        uploadedNames.push(file.name);
      }
    }

    setFilePaths((prev) => [...prev, ...uploadedPaths]);
    setFileNames((prev) => [...prev, ...uploadedNames]);
    setUploading(false);
    e.target.value = "";
  }

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    try {
      await submitProjectInquiry(formData);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer>
      <section
        id="start-your-project"
        // className="relative bg-[#e9edf1] px-6 py-16 sm:px-25"
        // className="relative px-6 py-16 sm:px-25"
        className="relative px-6 pb-16 mt-8.5"
      >
        <Image
          // src="/images/footer-top-wave.png"
          src="/images/footer-1400.webp"
          alt=""
          fill
          className="object-cover object-top opacity-90"
        />
        {/* <div className="relative z-10 mx-auto -mb-40 flex items-center max-w-300 flex-col gap-8 rounded-[15px] bg-white/90 p-6 shadow-[0px_20px_60px_rgba(0,0,0,0.08)] sm:py-12"> */}
        {/* <div className="relative z-10 mx-auto -mb-40 flex items-center max-w-300 flex-col gap-8 rounded-[15px] p-6 shadow-[0px_20px_60px_rgba(0,0,0,0.08)] sm:py-12 bg-[#eef2f4f2]"> */}
        <div
          className={`relative z-10 mx-auto -mb-40 flex items-center max-w-300 flex-col gap-8 rounded-[15px] p-6 shadow-[0px_-3px_59px_0px_rgba(0,0,0,0.11)] sm:py-12 bg-[#eef2f4f2] ${hideStartProjectCard ? "invisible" : ""}`}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-3xl font-semibold text-black sm:text-[40px] py-5">
              Start Your Project
            </h2>
            <p className="text-lg text-black/70 text-[32px] font-medium pb-5">
              What stage are you on?
            </p>
          </div>

          {status === "done" ? (
            <p className="py-10 text-center text-lg font-medium text-black">
              Thanks — we&rsquo;ve got your project details and will be in
              touch shortly.
            </p>
          ) : (
            <form action={handleSubmit} className="flex flex-col gap-8 max-w-248.75 ">
              <input type="hidden" name="stage" value={stage ?? ""} />
              <input type="hidden" name="budget" value={budget ?? ""} />
              {filePaths.map((path) => (
                <input key={path} type="hidden" name="file_paths" value={path} />
              ))}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {STAGES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setStage(s.value)}
                    className={`flex flex-col items-start gap-3 rounded-[30px] border-2 bg-white p-6 text-left transition-colors ${
                      stage === s.value
                        ? "border-brand-accent"
                        : "border-black/10 hover:border-black/30"
                    }`}
                  >
                    <Image src={s.icon} alt="" width={36} height={36} className="h-9 w-9" />
                    <span className="font-semibold text-black text-lg">{s.value}</span>
                    <span className="text-sm/4.5 text-black/50">
                      {s.description}
                    </span>
                  </button>
                ))}
              </div>

              {stage && (
                <>
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-base font-medium text-black">
                      Choose your budget
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      {BUDGETS.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          className={`rounded-full border px-6 py-3 text-sm font-medium transition-colors ${
                            budget === b
                              ? "border-black bg-black text-white"
                              : "border-black/15 bg-white text-black hover:border-black/40"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className="text-sm text-black/50">Name</span>
                      <input
                        name="name"
                        required
                        className="border-b border-black/20 bg-transparent pb-2 text-base text-black outline-none focus:border-black"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-sm text-black/50">Email</span>
                      <input
                        name="email"
                        type="email"
                        required
                        className="border-b border-black/20 bg-transparent pb-2 text-base text-black outline-none focus:border-black"
                      />
                    </label>
                  </div>

                  <input
                    name="project_title"
                    placeholder="Project title"
                    className="border-b border-black/20 bg-transparent pb-2 text-base text-black placeholder:text-black/40 outline-none focus:border-black"
                  />

                  <label className="flex flex-col gap-2" htmlFor={messageId}>
                    <textarea
                      id={messageId}
                      name="message"
                      rows={2}
                      placeholder="Tell us more about your Project or Idea"
                      className="resize-none border-b border-black/20 bg-transparent pb-2 text-base text-black placeholder:text-black/40 outline-none focus:border-black"
                    />
                  </label>

                  <div className="flex flex-col gap-2">
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-black/25 px-6 py-4 text-sm text-black/60 hover:border-black/40">
                      <CloudUploadIcon />
                      {uploading ? "Uploading…" : "Multiple file upload"}
                      <input
                        type="file"
                        multiple
                        onChange={handleFilesChange}
                        className="hidden"
                      />
                    </label>
                    {fileNames.length > 0 && (
                      <ul className="flex flex-wrap gap-2 text-xs text-black/50">
                        {fileNames.map((n) => (
                          <li key={n} className="rounded-full bg-black/5 px-3 py-1">
                            {n}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {status === "error" && (
                    <p className="text-center text-sm text-red-600">
                      Something went wrong — please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting" || uploading}
                    className="rounded-full bg-black px-8 py-4 text-base font-medium text-white transition-opacity hover:opacity-100 disabled:opacity-50"
                  >
                    {status === "submitting" ? "Sending…" : "Send & Book a meeting"}
                  </button>
                </>
              )}
            </form>
          )}
        </div>
      </section>

      <div className="relative flex flex-col items-center gap-10 bg-black px-6 pt-42 pb-34 sm:px-25">
        <div className="flex w-full max-w-245 flex-col items-center gap-10 sm:flex-row sm:items-end sm:justify-between">
          <ul className="flex flex-col items-center gap-3 leading-tight sm:items-start">
            {NAV_LEFT.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center gap-10">
            <Image
              src="/images/mfa-logo-with-text.svg"
              alt="Mind For Apps"
              width={247}
              height={114}
              className="h-28 w-auto"
            />
            <div className="flex items-center gap-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <ul className="flex flex-col items-center gap-3 leading-tight sm:items-end">
            {NAV_RIGHT.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#start-your-project"
            className="rounded-full border border-white px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
          >
            Start Your Project
          </a>
          <BookConsultationButton className="rounded-full border border-white px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black">
            Book a Consultation
          </BookConsultationButton>
        </div>
      </div>
    </footer>
  );
}
