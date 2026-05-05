import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ReviewCard, SectionHead } from "@/components/editorial-atoms";
import { getEditorialEntries, getPlaceBySlug, getPlaces } from "@/lib/sanity-content";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const places = await getPlaces();
  return places.map((place) => ({ slug: place.slug }));
}

export default async function PlacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = await getPlaceBySlug(slug);

  if (!place) {
    notFound();
  }

  const entries = await getEditorialEntries();
  const matching = entries
    .filter((review) => {
      const location = review.location.toLowerCase();
      return location.includes(place.country.toLowerCase()) || location.includes(place.name.toLowerCase());
    })
    .slice(0, 3);

  return (
    <main className="page">
      <section className="border-b border-[var(--ink)]">
        <div className="container py-24 lg:py-32">
          <Link href="/places" className="mono mb-12 inline-flex items-center gap-2 text-[var(--ink-3)]">
            <ArrowLeft size={13} strokeWidth={1.6} />
            Back to places
          </Link>
          <span className="mono block text-[var(--ink-3)]">— {place.country}</span>
          <h1 className="serif m-0 mt-8 text-[clamp(70px,12vw,176px)] font-normal italic leading-[0.88] tracking-[-0.05em]">
            {place.name}.
          </h1>
          <p className="mt-8 max-w-[620px] text-lg leading-[1.6] text-[var(--ink-2)]">
            {place.joTake || `Starter notes from ${place.name}, ready to edit in Sanity.`}
          </p>
        </div>
      </section>

      <section>
        <div className="container py-24 lg:py-32">
          <SectionHead kicker="Filed here" title="Notes from this place." />
          {matching.length > 0 ? (
            <div className="grid gap-12 lg:grid-cols-3">
              {matching.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="border-t border-[var(--rule)] pt-8">
              <p className="max-w-[560px] text-[var(--ink-2)]">
                This place is in Sanity now. Add or tag more entries for this location and they will
                appear here.
              </p>
              <Link href="/stays" className="btn mt-6 w-fit">
                Browse latest notes
                <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
