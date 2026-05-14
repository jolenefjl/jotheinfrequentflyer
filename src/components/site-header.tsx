import Link from "next/link";
import { Search } from "lucide-react";
import { CurrentDate } from "@/components/current-date";
import { getSiteChrome, hasVisibleCityGuides } from "@/lib/sanity-content";

export async function SiteHeader() {
  const [chrome, showCityGuides] = await Promise.all([getSiteChrome(), hasVisibleCityGuides()]);
  const items = chrome.header.navigation.filter((item) => item.href !== "/city-guides" || showCityGuides);

  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header__bar">
          <div className="site-header__meta">
            <span className="mono">{chrome.header.issueLabel}</span>
            <span className="text-[var(--ink-4)]">·</span>
            <CurrentDate />
          </div>
          <Link href="/" className="brandmark" aria-label="Infrequent Flyer home">
            <span className="brandmark__name">
              {chrome.header.brandLineOne}
              <br />
              {chrome.header.brandLineTwo}
            </span>
          </Link>
          <div className="site-header__actions">
            <span className="mono text-[var(--ink-3)]">{chrome.header.volumeLabel}</span>
            <Link href="/search" className="iconbtn" aria-label="Search">
              <Search size={16} strokeWidth={1.6} />
            </Link>
          </div>
        </div>
      </div>
      <nav className="site-nav">
        <div className="container">
          <div className="site-nav__inner">
            {items.map((item) => (
              <Link key={item.href} href={item.href} className={`nav-item ${item.href === "/" ? "active" : ""}`}>
                {item.label}
              </Link>
            ))}
            <div className="nav-spacer" />
          </div>
        </div>
      </nav>
      <details className="mobile-menu">
        <summary className="container mobile-menu__summary">
          <span className="mono">Menu</span>
          <span aria-hidden="true">+</span>
        </summary>
        <div className="container mobile-menu__panel">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="mobile-menu__item">
              {item.label}
            </Link>
          ))}
          <Link href="/search" className="mobile-menu__item">
            Search
          </Link>
        </div>
      </details>
    </header>
  );
}
