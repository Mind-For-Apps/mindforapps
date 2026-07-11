import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Templates", href: "/templates" },
  { label: "Services", href: "/services" },
];

export function Header() {
  return (
    <header className="bg-white flex items-center justify-center px-6 pt-10 pb-5 sm:px-[100px]">
      <nav className="bg-white flex h-20 w-full max-w-[1200px] flex-wrap items-center justify-between gap-6 rounded-[50px] px-6 shadow-[0px_4px_19.3px_0px_rgba(0,0,0,0.14)] sm:px-[30px]">
        <Image
          src="/images/logo.svg"
          alt="Mind For Apps"
          width={231}
          height={32}
          className="h-8 w-auto"
          priority
        />
        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-lg font-medium text-black transition-colors hover:text-brand-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="bg-gradient-to-b from-black to-[#0c0c0c] rounded-full px-[30px] py-3 text-lg font-medium text-white transition-opacity hover:opacity-90"
        >
          Contact Us
        </Link>
      </nav>
    </header>
  );
}
