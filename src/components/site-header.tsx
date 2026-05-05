import Link from "next/link";
import { Search } from "lucide-react";
import { hasVisibleCityGuides } from "@/lib/sanity-content";

const navItems = [
  ["Home", "/"],
  ["Stays", "/stays"],
  ["Food", "/food"],
  ["Experiences", "/experiences"],
  ["Kids", "/kids"],
];

export async function SiteHeader() {
  const showCityGuides = await hasVisibleCityGuides();
  const items = showCityGuides ? [...navItems, ["City Guides", "/city-guides"]] : navItems;

  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header__bar">
          <div className="site-header__meta">
            <span className="mono">No 047</span>
            <span className="text-[var(--ink-4)]">·</span>
            <span className="mono">Mon, May 4</span>
          </div>
          <Link href="/" className="brandmark" aria-label="Infrequent Flyer home">
            <span className="brandmark__name">
              Infrequent
              <br />
              Flyer
            </span>
          </Link>
          <div className="site-header__actions">
            <span className="mono text-[var(--ink-3)]">Vol. III</span>
            <button className="iconbtn" aria-label="Search">
              <Search size={16} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>
      <nav className="site-nav">
        <div className="container">
          <div className="site-nav__inner">
            {items.map(([label, href]) => (
              <Link key={href} href={href} className={`nav-item ${href === "/" ? "active" : ""}`}>
                {label}
              </Link>
            ))}
            <div className="nav-spacer" />
          </div>
        </div>
      </nav>
    </header>
  );
}
