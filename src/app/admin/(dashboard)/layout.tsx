import Link from "next/link";
import { signOut } from "../actions";

const navLinks = [
  { label: "Case Studies", href: "/admin/case-studies" },
  { label: "Solutions", href: "/admin/solutions" },
  { label: "Reference Data", href: "/admin/reference" },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-surface">
      <header className="flex items-center justify-between border-b border-black/10 bg-white px-6 py-4">
        <nav className="flex items-center gap-6">
          <span className="font-semibold text-black">MFA Admin</span>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-gray transition-colors hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <form action={signOut}>
          <button
            type="submit"
            className="text-sm font-medium text-brand-gray transition-colors hover:text-black"
          >
            Sign out
          </button>
        </form>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
