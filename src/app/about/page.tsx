import type { Metadata } from "next";
import { SitePageTemplate } from "@/components/site-page-template";
import { getSitePageBySlug } from "@/lib/sanity-content";
import { sitePageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePageBySlug("about");
  return sitePageMetadata(page, "Who's behind this");
}

export default function AboutPage() {
  return <SitePageTemplate slug="about" />;
}
