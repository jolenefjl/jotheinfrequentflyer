import type { Metadata } from "next";
import { ReviewPage, generateMetadata as generateReviewMetadata } from "@/app/journal/[slug]/page";
import { getEditorialEntries } from "@/lib/sanity-content";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const entries = await getEditorialEntries();
  return entries.filter((review) => review.category === "stays").map((review) => ({ slug: review.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return generateReviewMetadata({ params });
}

export default async function StayReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ReviewPage params={params} expectedCategory="stays" />;
}
