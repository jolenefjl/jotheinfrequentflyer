import type { Metadata } from "next";
import { SitePageTemplate } from "@/components/site-page-template";
import { getSitePageBySlug } from "@/lib/sanity-content";
import { sitePageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePageBySlug("contact");
  return sitePageMetadata(page, "Contact");
}

export default function ContactPage() {
  return <SitePageTemplate slug="contact" />;
}
