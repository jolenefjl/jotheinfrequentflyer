import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <h4>The newsletter</h4>
            <p className="site-footer__title">A note from somewhere, every other Sunday.</p>
            <p className="site-footer__sig">
              One review, one tip, one thing I&apos;m thinking about. No sponsorships, no scrolling
              carousels — just a letter.
            </p>
            <form className="mt-[18px] flex max-w-[420px]">
              <input
                type="email"
                placeholder="your@email.com"
                className="min-w-0 flex-1 border border-r-0 border-[rgba(245,242,236,0.25)] bg-transparent px-[14px] py-3 font-mono text-xs tracking-[0.04em] text-[var(--paper)] outline-none"
              />
              <button className="border border-[var(--paper)] bg-[var(--paper)] px-5 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--ink)]">
                Subscribe
              </button>
            </form>
          </div>
          <div>
            <h4>Sections</h4>
            <ul>
              <li><Link href="/stays">Stays</Link></li>
              <li><Link href="/food">Food</Link></li>
              <li><Link href="/experiences">Experiences</Link></li>
              <li><Link href="/kids">Kids</Link></li>
              <li><Link href="/tips">Top Tips</Link></li>
              <li><Link href="/places">Destinations</Link></li>
            </ul>
          </div>
          <div>
            <h4>About</h4>
            <ul>
              <li><Link href="/about">Who&apos;s behind this</Link></li>
              <li><Link href="/about">How we review</Link></li>
              <li><Link href="/about">Press & partnerships</Link></li>
              <li><Link href="/about">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Elsewhere</h4>
            <ul>
              <li><span>Instagram</span></li>
              <li><span>Substack</span></li>
              <li><span>Are.na</span></li>
              <li><span>RSS feed</span></li>
            </ul>
          </div>
        </div>
        <div className="site-footer__bot">
          <span>© 2026 Infrequent Flyer · Made slowly</span>
          <span>Issue 047 · May 4, 2026</span>
        </div>
      </div>
    </footer>
  );
}
