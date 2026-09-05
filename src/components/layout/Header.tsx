"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Templates", href: "/templates" },
  { label: "Solutions", href: "/solutions" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isContact = pathname === "/contact";

  return (
    <header
      className={`flex min-h-25 min-w-70 items-center justify-center pt-10 pr-5 pb-9 pl-5 ${isHome ? "bg-white" : ""}`}
    >
      <nav
        className={`flex h-20 w-full min-w-68 max-w-300 items-center justify-between gap-5 rounded-[50px] bg-white pr-6.25 pl-6.25 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.14)] min-[768px]:min-w-70 min-[980px]:gap-12.5`}
      >
      {/* <nav
        className={`flex h-20 w-full min-w-68 max-w-300 items-center justify-between gap-5 rounded-[50px] bg-white pr-6.25 pl-6.25 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.14)] min-[768px]:min-w-70 min-[980px]:gap-12.5 ${
          !isHome
            ? "max-[599px]:bg-transparent max-[599px]:pl-3.75 max-[599px]:shadow-none"
            : ""
        }`}
      > */}
        <Link
          href="/"
          className="mr-2.5 shrink-0 min-[501px]:max-w-47.5 min-[501px]:min-w-42.5 min-[951px]:mr-5 min-[951px]:max-w-none min-[951px]:min-w-0"
        >
          <Image
            unoptimized
            src="/images/logo.svg"
            alt="Mind For Apps"
            width={231}
            height={32}
            priority
            className="hidden h-8 w-auto min-[501px]:block"
          />
          <Image
            unoptimized
            src="/images/logo-icon.svg"
            alt="Mind For Apps"
            width={54}
            height={32}
            priority
            className="block h-8 w-auto min-[501px]:hidden"
          />
        </Link>

        <div
          className={`flex min-w-35 items-center justify-end gap-3 ${isContact ? "max-w-130" : "max-w-200"}`}
        >
          <ul className="hidden min-h-10 min-w-72.5 shrink-0 items-center gap-4 bg-white min-[865px]:flex xl:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="whitespace-nowrap text-[16px] leading-[1.125] font-medium text-black transition-colors hover:text-brand-accent min-[1150px]:text-[18px]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/admin"
            aria-label="Admin panel"
            className="hidden size-9 shrink-0 items-center justify-center rounded-full text-black/40 transition-colors hover:bg-brand-surface hover:text-black min-[865px]:flex"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </Link>

          {!isContact && (
            <Link
              href="/contact"
              className="hidden max-w-40 min-h-12 min-w-27.5 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-black px-5 text-[16px] font-medium text-white transition-[background] duration-300 hover:bg-[radial-gradient(ellipse_farthest-corner_at_10%_10%,var(--color-brand-blue),var(--color-brand-indigo),var(--color-brand-purple))] min-[865px]:flex min-[1150px]:h-13 min-[1150px]:max-w-58.25 min-[1150px]:px-15 min-[1150px]:text-[18px]"
            >
              Contact Us
            </Link>
          )}

          <MobileNav navLinks={navLinks} />
        </div>
      </nav>
    </header>
  );
}
