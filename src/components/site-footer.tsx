import Link from "next/link";
import { CurrentDate } from "@/components/current-date";
import { NewsletterSignupForm } from "@/components/newsletter-signup-form";
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
  const newsletterConfigured = Boolean(
    process.env.GOOGLE_APPS_SCRIPT_NEWSLETTER_URL &&
      process.env.NEWSLETTER_SIGNUP_SECRET,
  );
  const showNewsletter = footer.newsletterVisible && newsletterConfigured;
  const issueLabel = footer.bottomRight?.split(/[·•]/)[0]?.trim() || "Issue 047";

  return (
    <footer className="site-footer">
      <div className="container">
        <div className={`site-footer__grid ${showNewsletter ? "" : "site-footer__grid--without-newsletter"}`}>
          {showNewsletter ? (
            <div>
              <h4>{footer.newsletterKicker}</h4>
              <p className="site-footer__title">{footer.newsletterTitle}</p>
              <p className="site-footer__sig">{footer.newsletterDescription}</p>
              <NewsletterSignupForm
                placeholder={footer.emailPlaceholder}
                buttonText={footer.buttonText}
                variant="dark"
              />
            </div>
          ) : null}
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
          <span>
            {issueLabel} · <CurrentDate />
          </span>
        </div>
      </div>
    </footer>
  );
}
