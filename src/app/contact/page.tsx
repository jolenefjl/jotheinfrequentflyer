import type { Metadata } from "next";
import { SitePageTemplate } from "@/components/site-page-template";
import { getSitePageBySlug } from "@/lib/sanity-content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePageBySlug("contact");
  return {
    title: page?.metadata?.metaTitle || page?.title || "Contact",
    description: page?.metadata?.metaDescription || page?.intro,
  };
}

export default function ContactPage() {
  return <SitePageTemplate slug="contact" />;
}
