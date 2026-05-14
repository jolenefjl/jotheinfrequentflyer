import type { Metadata } from "next";
import type { SitePageContent } from "@/lib/sanity-content";

export function sitePageMetadata(page: SitePageContent | null, fallbackTitle: string): Metadata {
  const title = page?.metadata?.metaTitle || page?.title || fallbackTitle;
  const description = page?.metadata?.metaDescription || page?.metadata?.ogDescription || page?.intro;
  const image = page?.imageUrl || page?.metadata?.ogImage || page?.metadata?.twitterCardImage;

  return {
    title,
    description,
    openGraph: {
      title,
      description: page?.metadata?.ogDescription || description,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page?.metadata?.twitterCardDescription || description,
      images: image ? [image] : undefined,
    },
  };
}
