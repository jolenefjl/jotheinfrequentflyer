import type { Metadata } from "next";
import { SitePageTemplate } from "@/components/site-page-template";
import { getSitePageBySlug } from "@/lib/sanity-content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePageBySlug("how-i-review");
  return {
    title: page?.metadata?.metaTitle || page?.title || "How I review",
    description: page?.metadata?.metaDescription || page?.intro,
  };
}

export default function HowIReviewPage() {
  return <SitePageTemplate slug="how-i-review" />;
}
