import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ReviewCard, SectionHead } from "@/components/editorial-atoms";
import { editorialReviews } from "@/lib/editorial-data";

const places = [
  { slug: "mexico-city", name: "Mexico City", country: "Mexico", intro: "Food, stays, and city notes from CDMX." },
  { slug: "tokyo", name: "Tokyo", country: "Japan", intro: "Tokyo notes for eating well and moving calmly." },
  { slug: "lisbon", name: "Lisbon", country: "Portugal", intro: "A first-timer file for hills, trams, and bakery detours." },
  { slug: "perhentian-islands", name: "Perhentian Islands", country: "Malaysia", intro: "Island stays, boat transfers, and sea-heavy days." },
  { slug: "mendoza", name: "Mendoza", country: "Argentina", intro: "Wine-country pacing, views, and long lunches." },
  { slug: "kyoto", name: "Kyoto", country: "Japan", intro: "Shoulder-season notes for gardens, stays, and quiet splurges." },
  { slug: "imlil", name: "Imlil", country: "Morocco", intro: "Mountain notes from the Atlas foothills." },
  { slug: "ibiza", name: "Ibiza", country: "Spain", intro: "The calmer side of Ibiza, filed slowly." },
];

export function generateStaticParams() {
  return places.map((place) => ({ slug: place.slug }));
}

export default async function PlacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = places.find((item) => item.slug === slug);

  if (!place) {
    notFound();
  }

  const matching = editorialReviews
    .filter((review) => review.location.toLowerCase().includes(place.country.toLowerCase()) || review.location.toLowerCase().includes(place.name.toLowerCase()))
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
          <p className="mt-8 max-w-[620px] text-lg leading-[1.6] text-[var(--ink-2)]">{place.intro}</p>
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
                This place is in the map, but the full notes are still being written into the new
                system.
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
