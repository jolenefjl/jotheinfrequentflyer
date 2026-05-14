import type { Metadata } from "next";
import { SitePageTemplate } from "@/components/site-page-template";
import { getSitePageBySlug } from "@/lib/sanity-content";
import { sitePageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePageBySlug("how-i-review");
  return sitePageMetadata(page, "How I review");
}

export default function HowIReviewPage() {
  return <SitePageTemplate slug="how-i-review" />;
}
