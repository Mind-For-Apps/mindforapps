"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Top", href: "#top", hideBelow: "min-[720px]:block" },
  { label: "Why us", href: "#why-us", hideBelow: "min-[670px]:block" },
  { label: "Features", href: "#features", hideBelow: "min-[590px]:block" },
  { label: "Process", href: "#process", hideBelow: "min-[480px]:block" },
  { label: "Pricing", href: "#pricing", hideBelow: "" },
];

export function StickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 120);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-30 mt-5 flex min-h-16.75 min-w-0 justify-center px-5 transition-opacity duration-300 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex min-h-16.75 w-full min-w-10 max-w-300 items-center justify-between gap-4 rounded-[50px] bg-white/90 pt-2.75 pr-2.75 pb-2.75 pl-5">
        <a href="#top" aria-label="Back to top" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-icon.svg" alt="" className="h-7 w-auto" />
        </a>
        <ul className="flex min-w-10 max-w-162.5 flex-1 items-center justify-between">
          {LINKS.map((link) => (
            <li
              key={link.href}
              className={link.hideBelow ? `hidden ${link.hideBelow}` : ""}
            >
              <a
                href={link.href}
                className="text-[18px] font-medium whitespace-nowrap text-black transition-colors hover:text-brand-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#start-your-project"
          className="flex h-11.25 w-30 shrink-0 items-center justify-center rounded-full border border-brand-accent text-[18px] font-medium text-brand-accent transition-colors hover:border-transparent hover:bg-[linear-gradient(45deg,var(--color-brand-blue),var(--color-brand-indigo),var(--color-brand-purple))] hover:text-white min-[400px]:w-42.5"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
