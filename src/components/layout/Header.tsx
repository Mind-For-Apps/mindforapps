import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Templates", href: "/templates" },
  { label: "Solutions", href: "/solutions" },
];

export function Header() {
  return (
    <header className="bg-white flex items-center justify-center px-6 pt-10 pb-5 sm:px-25">
      <nav className="bg-white flex h-20 w-full max-w-300 items-center justify-between gap-4 rounded-[50px] px-6 shadow-[0px_4px_19.3px_0px_rgba(0,0,0,0.14)] sm:px-7.5">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Mind For Apps"
            width={231}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <div className="hidden items-center gap-4 lg:flex xl:gap-6">
          <ul className="flex items-center gap-4 xl:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="whitespace-nowrap text-sm font-medium text-black transition-colors hover:text-brand-accent xl:text-lg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              aria-label="Admin panel"
              className="flex size-9 shrink-0 items-center justify-center rounded-full text-black/40 transition-colors hover:bg-brand-surface hover:text-black"
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
            <Link
              href="/contact"
              className="bg-gradient-to-b from-black to-[#0c0c0c] whitespace-nowrap rounded-full px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 xl:px-7.5 xl:text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <MobileNav navLinks={navLinks} />
      </nav>
    </header>
  );
}
