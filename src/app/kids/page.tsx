import { CategoryLanding } from "@/components/editorial-atoms";

export const revalidate = 60;

export default async function KidsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string | string[] }>;
}) {
  const params = await searchParams;
  const filter = Array.isArray(params.filter) ? params.filter[0] : params.filter;
  return <CategoryLanding category="kids" filter={filter} />;
}
