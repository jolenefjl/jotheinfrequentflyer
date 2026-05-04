import Link from "next/link";
import { Menu, Search } from "lucide-react";

const navItems = [
  ["Stays", "/stays"],
  ["Flights", "/flights"],
  ["Food", "/food"],
  ["Experiences", "/experiences"],
  ["Travel Tips", "/travel-tips"],
  ["Top Lists", "/top-lists"],
  ["About", "/about"],
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 bg-transparent">
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link href="/" className="font-serif text-2xl text-[var(--warm-brown)]">
          Jo the Infrequent Flyer
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-[var(--warm-brown)] lg:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-[var(--terracotta)]">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            aria-label="Open search"
            className="grid size-10 place-items-center text-[var(--warm-brown)]"
          >
            <Search size={18} />
          </button>
          <button
            aria-label="Open navigation"
            className="grid size-10 place-items-center text-[var(--warm-brown)] lg:hidden"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
