"use client";

const LINKS = [
  { label: "Top", href: "#top" },
  { label: "Why us", href: "#why-us" },
  { label: "Features", href: "#features" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
];

export function StickyNav() {
  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-black/10 bg-white/95 px-6 py-4 backdrop-blur sm:px-[100px]">
      <a href="#top" aria-label="Back to top" className="shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo-icon.svg" alt="" className="h-7 w-auto" />
      </a>
      <ul className="hidden items-center gap-8 lg:flex">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm font-medium text-black transition-colors hover:text-brand-accent"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#start-your-project"
        className="rounded-full border border-brand-accent px-6 py-2.5 text-sm font-medium text-brand-accent transition-colors hover:bg-brand-accent hover:text-white"
      >
        Contact
      </a>
    </nav>
  );
}
