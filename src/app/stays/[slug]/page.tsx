import { redirect } from "next/navigation";

export default async function StayReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/journal/${slug}`);
}
