import type { Metadata } from "next";
import { SitePageTemplate } from "@/components/site-page-template";
import { getSitePageBySlug } from "@/lib/sanity-content";
import { sitePageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePageBySlug("press-partnerships");
  return sitePageMetadata(page, "Press & partnerships");
}

export default function PressPartnershipsPage() {
  return <SitePageTemplate slug="press-partnerships" />;
}
