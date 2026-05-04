import Link from "next/link";
import { ArrowRight } from "lucide-react";

const places = [
  { slug: "mexico-city", name: "Mexico City", country: "Mexico", count: 7, note: "Counters, courtyards, and hotel mornings." },
  { slug: "tokyo", name: "Tokyo", country: "Japan", count: 11, note: "Tiny meals, big systems, excellent convenience." },
  { slug: "lisbon", name: "Lisbon", country: "Portugal", count: 5, note: "Hills, pastries, and a few things to skip." },
  { slug: "perhentian-islands", name: "Perhentian Islands", country: "Malaysia", count: 3, note: "Clear water, boat logistics, rare proper switching off." },
  { slug: "mendoza", name: "Mendoza", country: "Argentina", count: 4, note: "Wine-country pacing and long lunches." },
  { slug: "kyoto", name: "Kyoto", country: "Japan", count: 6, note: "Gardens, shoulder season, and one expensive lesson." },
  { slug: "imlil", name: "Imlil", country: "Morocco", count: 2, note: "Mountain air, tea, and slow paths." },
  { slug: "ibiza", name: "Ibiza", country: "Spain", count: 3, note: "Quieter corners beyond the obvious noise." },
];

export default function PlacesPage() {
  return (
    <main className="page">
      <section className="border-b border-[var(--ink)]">
        <div className="container py-24 lg:py-32">
          <div className="mb-12 flex justify-between">
            <span className="mono text-[var(--ink-3)]">— Field map</span>
            <span className="mono text-[var(--ink-3)]">{places.length} places · 14 countries</span>
          </div>
          <div className="grid items-end gap-16 lg:grid-cols-[1.35fr_1fr]">
            <h1 className="serif m-0 text-[clamp(76px,12vw,190px)] font-normal italic leading-[0.88] tracking-[-0.05em]">
              By place.
            </h1>
            <p className="mb-3 max-w-[500px] text-lg leading-[1.6] text-[var(--ink-2)]">
              A living index of cities, islands, and little pockets of the world Jo has filed notes
              from. Some are full guides. Some are only one very specific opinion so far.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-24 lg:py-32">
          <div className="grid gap-x-12 lg:grid-cols-2">
            {places.map((place, index) => (
              <Link
                key={place.slug}
                href={`/places/${place.slug}`}
                className="grid grid-cols-[54px_1fr_auto] items-center gap-5 border-t border-[var(--rule)] py-7 transition-[padding] hover:pl-2"
              >
                <span className="mono text-[var(--ink-3)]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="serif m-0 text-[clamp(28px,3vw,42px)] font-normal leading-none tracking-[-0.015em]">
                    {place.name}
                  </h2>
                  <p className="m-0 mt-2 text-sm leading-[1.55] text-[var(--ink-2)]">
                    {place.country} · {place.count} entries · {place.note}
                  </p>
                </div>
                <ArrowRight size={15} strokeWidth={1.6} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
