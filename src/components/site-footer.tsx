import Link from "next/link";
import { getSiteChrome } from "@/lib/sanity-content";

function FooterLink({ href, label }: { href: string; label: string }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {label}
      </a>
    );
  }

  return <Link href={href}>{label}</Link>;
}

export async function SiteFooter() {
  const { footer } = await getSiteChrome();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <h4>{footer.newsletterKicker}</h4>
            <p className="site-footer__title">{footer.newsletterTitle}</p>
            <p className="site-footer__sig">{footer.newsletterDescription}</p>
            {footer.newsletterVisible ? (
              <form className="mt-[18px] flex max-w-[420px]">
                <input
                  type="email"
                  placeholder={footer.emailPlaceholder}
                  className="min-w-0 flex-1 border border-r-0 border-[rgba(245,242,236,0.25)] bg-transparent px-[14px] py-3 font-mono text-xs tracking-[0.04em] text-[var(--paper)] outline-none"
                />
                <button className="border border-[var(--paper)] bg-[var(--paper)] px-5 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--ink)]">
                  {footer.buttonText}
                </button>
              </form>
            ) : null}
          </div>
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}`}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="site-footer__bot">
          <span>{footer.bottomLeft}</span>
          <span>{footer.bottomRight}</span>
        </div>
      </div>
    </footer>
  );
}
