import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { reviewHref } from "@/lib/editorial-data";
import {
  getEditorialEntries,
  getPlaces,
  getSitePages,
  type SanityEditorialEntry,
  type SanityPlace,
  type SitePageContent,
} from "@/lib/sanity-content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Search",
  description: "Search Jo the Infrequent Flyer's stays, food notes, experiences, kids travel notes, places, and pages.",
};

type SearchResult = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  haystack: string;
};

const categoryLabel: Record<SanityEditorialEntry["category"], string> = {
  stays: "Stay",
  food: "Food",
  experiences: "Experience",
  kids: "Kids",
  tips: "Tip",
};

function cleanQuery(value?: string | string[]) {
  const raw = Array.isArray(value) ? value[0] : value;
  return (raw || "").trim().replace(/\s+/g, " ").slice(0, 80);
}

function normalize(value: string) {
  return value.toLowerCase();
}

function entryToResult(entry: SanityEditorialEntry): SearchResult {
  const category = categoryLabel[entry.category] || "Note";
  const fields = [
    entry.title,
    entry.dek,
    entry.location,
    entry.kicker,
    entry.date,
    category,
    entry.verdict,
    entry.goodFor,
    entry.bestFor?.join(" "),
  ];

  return {
    id: `entry-${entry.id}`,
    title: entry.title,
    eyebrow: `${category}${entry.location ? ` / ${entry.location}` : ""}`,
    description: entry.dek,
    href: reviewHref(entry),
    haystack: fields.filter(Boolean).join(" "),
  };
}

function placeToResult(place: SanityPlace): SearchResult {
  return {
    id: `place-${place.id}`,
    title: `${place.name}, ${place.country}`,
    eyebrow: "Place",
    description: place.joTake || `${place.entriesCount} entries filed here.`,
    href: `/places/${place.slug}`,
    haystack: [place.name, place.country, place.joTake].filter(Boolean).join(" "),
  };
}

function pageToResult(page: SitePageContent): SearchResult {
  return {
    id: `page-${page.slug}`,
    title: page.title,
    eyebrow: page.eyebrow || "Page",
    description: page.intro || page.metadata?.metaDescription || "Read more from Jo the Infrequent Flyer.",
    href: `/${page.slug}`,
    haystack: [page.title, page.eyebrow, page.intro, page.metadata?.metaDescription].filter(Boolean).join(" "),
  };
}

function rankResult(result: SearchResult, query: string) {
  const target = normalize(result.haystack);
  const title = normalize(result.title);
  const words = normalize(query).split(" ").filter(Boolean);

  if (!words.length) {
    return 0;
  }

  let score = 0;
  for (const word of words) {
    if (title.includes(word)) {
      score += 4;
    }
    if (target.includes(word)) {
      score += 1;
    }
  }

  return score;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = cleanQuery(params.q);
  const [entries, places, pages] = await Promise.all([getEditorialEntries(), getPlaces(), getSitePages()]);
  const allResults = [
    ...entries.map(entryToResult),
    ...places.map(placeToResult),
    ...pages.map(pageToResult),
  ];

  const results = query
    ? allResults
        .map((result) => ({ result, score: rankResult(result, query) }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score || a.result.title.localeCompare(b.result.title))
        .map((item) => item.result)
    : [];

  return (
    <main className="page">
      <section className="border-b border-[var(--ink)]">
        <div className="container py-16 lg:py-24">
          <div className="mono mb-8 text-[var(--ink-3)]">- Search the site</div>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h1 className="serif m-0 text-[clamp(48px,8vw,108px)] font-normal italic leading-[0.95] tracking-[-0.035em]">
              Find the note you need.
            </h1>
            <form action="/search" className="flex min-w-0 border border-[var(--ink)] bg-[var(--paper)]">
              <label htmlFor="site-search" className="sr-only">
                Search
              </label>
              <input
                id="site-search"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Search stays, cities, food, tips..."
                className="min-w-0 flex-1 bg-transparent px-4 py-4 text-base text-[var(--ink)] outline-none placeholder:text-[var(--ink-4)]"
              />
              <button
                type="submit"
                className="inline-flex w-14 items-center justify-center border-l border-[var(--ink)] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                aria-label="Submit search"
              >
                <Search size={18} strokeWidth={1.7} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-16 lg:py-24">
          {query ? (
            <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
              <p className="mono m-0 text-[var(--ink-3)]">
                {results.length} result{results.length === 1 ? "" : "s"} for "{query}"
              </p>
              <Link href="/search" className="mono text-[var(--ink-3)] underline underline-offset-4">
                Clear search
              </Link>
            </div>
          ) : (
            <p className="m-0 max-w-[620px] text-[17px] leading-[1.65] text-[var(--ink-2)]">
              Search by destination, hotel, dish, section, or the thing you half-remember reading.
            </p>
          )}

          {query && results.length ? (
            <div className="border-t border-[var(--rule)]">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.href}
                  className="grid gap-4 border-b border-[var(--rule)] py-7 transition-colors hover:bg-[var(--paper-2)] md:grid-cols-[180px_1fr_auto] md:items-center"
                >
                  <div className="mono text-[var(--ink-3)]">{result.eyebrow}</div>
                  <div>
                    <h2 className="serif m-0 mb-2 text-[clamp(26px,3vw,40px)] font-normal leading-[1.05] tracking-[-0.01em]">
                      {result.title}
                    </h2>
                    <p className="m-0 max-w-[780px] text-sm leading-[1.6] text-[var(--ink-2)]">
                      {result.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-[var(--ink)]">
                    <span className="mono">Open</span>
                    <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          ) : null}

          {query && !results.length ? (
            <div className="border border-[var(--rule)] p-8">
              <p className="serif m-0 mb-3 text-[32px] leading-[1.1]">Nothing filed under that yet.</p>
              <p className="m-0 text-sm leading-[1.6] text-[var(--ink-2)]">
                Try a broader place name, section name, or hotel name.
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
