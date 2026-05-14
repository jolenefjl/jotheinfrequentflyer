import type { Metadata } from "next";
import { SitePageTemplate } from "@/components/site-page-template";
import { getSitePageBySlug } from "@/lib/sanity-content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePageBySlug("press-partnerships");
  return {
    title: page?.metadata?.metaTitle || page?.title || "Press & partnerships",
    description: page?.metadata?.metaDescription || page?.intro,
  };
}

export default function PressPartnershipsPage() {
  return <SitePageTemplate slug="press-partnerships" />;
}
