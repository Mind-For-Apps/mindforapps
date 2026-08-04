"use client";

import { useState } from "react";
import Link from "next/link";

type NavLink = { label: string; href: string };

export function MobileNav({ navLinks }: { navLinks: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={open}
        className="flex size-10 shrink-0 items-center justify-center rounded-full text-black transition-colors hover:bg-brand-surface"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {open ? (
            <path d="M18 6 6 18M6 6l12 12" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+12px)] z-50 flex w-64 flex-col gap-1 rounded-3xl border border-black/5 bg-white p-4 shadow-[0px_4px_19.3px_0px_rgba(0,0,0,0.14)]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-base font-medium text-black transition-colors hover:bg-brand-surface"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="rounded-xl px-3 py-2.5 text-base font-medium text-black/60 transition-colors hover:bg-brand-surface"
          >
            Admin panel
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="bg-gradient-to-b from-black to-[#0c0c0c] mt-2 rounded-full px-7.5 py-3 text-center text-base font-medium text-white transition-opacity hover:opacity-90"
          >
            Contact Us
          </Link>
        </div>
      )}
    </div>
  );
}
