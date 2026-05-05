import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Star } from "lucide-react";
import {
  EditorialPhoto,
  ReviewCard,
  SectionHead,
} from "@/components/editorial-atoms";
import { RichText, slugifyHeading } from "@/components/rich-text";
import {
  editorialPhotos,
  reviewsForCategory,
} from "@/lib/editorial-data";
import {
  getEditorialEntries,
  getEditorialEntryBySlug,
  stayScoreCriteria,
  type SanityEditorialEntry,
} from "@/lib/sanity-content";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const entries = await getEditorialEntries();
  return entries.map((review) => ({ slug: review.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const review = await getEditorialEntryBySlug(slug);

  if (!review) {
    return {};
  }

  const title = review.metadata?.metaTitle || review.title;
  const description = review.metadata?.metaDescription || review.metadata?.ogDescription || review.dek;
  const image =
    review.metadata?.ogImage ||
    review.metadata?.twitterCardImage ||
    review.imageUrl ||
    editorialPhotos[review.photo];

  return {
    title,
    description,
    openGraph: {
      title,
      description: review.metadata?.ogDescription || description,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: review.metadata?.twitterCardDescription || description,
      images: review.metadata?.twitterCardImage || image ? [review.metadata?.twitterCardImage || image] : undefined,
    },
  };
}

export default async function JournalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const review = await getEditorialEntryBySlug(slug);

  if (!review) {
    notFound();
  }

  const related = reviewsForCategory(review.category)
    .filter((item) => item.slug !== review.slug)
    .slice(0, 3);

  if (review.category === "stays") {
    return <StayReviewJournalPage review={review} related={related} />;
  }

  return (
    <main className="page">
      <section className="border-b border-[var(--ink)]">
        <div className="container py-20 lg:py-28">
          <Link
            href={`/${review.category}`}
            className="mono mb-12 inline-flex items-center gap-2 text-[var(--ink-3)]"
          >
            <ArrowLeft size={13} strokeWidth={1.6} />
            Back to {review.category === "tips" ? "tips" : review.category}
          </Link>

          <div className="grid gap-14 lg:grid-cols-[0.72fr_1.65fr_0.7fr]">
            <div className="pt-2">
              <div className="mono mb-4 text-[var(--ink-3)]">{review.kicker}</div>
              <MetaItem label="Filed" value={review.date} />
              <MetaItem label="Location" value={review.location} />
              <MetaItem label="Read" value={review.readTime} />
            </div>

            <div>
              <h1 className="serif m-0 text-[clamp(54px,7.4vw,118px)] font-normal leading-[0.92] tracking-[-0.045em]">
                {review.title}
              </h1>
              <p className="serif mt-8 max-w-[760px] text-[clamp(22px,2.5vw,32px)] leading-[1.3] text-[var(--ink-2)]">
                {review.dek}
              </p>
            </div>

            <div className="flex flex-col justify-between gap-8 border-l border-[var(--rule)] pl-6">
              <div>
                <div className="mono mb-3 text-[var(--ink-3)]">Jo Score</div>
                {review.rating != null ? (
                  <>
                    <div className="serif text-[72px] italic leading-none tracking-[-0.04em]">
                      {review.rating.toFixed(1)}
                    </div>
                    <div className="mt-3 flex gap-1 text-[var(--accent)]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={15}
                          fill={index < Math.round(review.rating || 0) ? "currentColor" : "none"}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="serif text-[42px] italic">Notes</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--rule)]">
        <div className="container py-16 lg:py-24">
          <div className="relative aspect-[16/8] overflow-hidden">
            <EditorialPhoto
              src={review.imageUrl || editorialPhotos[review.photo]}
              alt={review.title}
              label={review.photoLabel}
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--rule)]">
        <div className="container grid gap-14 py-24 lg:grid-cols-[0.7fr_1.45fr_0.75fr] lg:py-32">
          <aside className="hidden lg:block">
            <div className="sticky top-36">
              <div className="mono mb-4 text-[var(--ink-3)]">In this note</div>
              {["First impression", "The stay", "Worth it?", "Jo's verdict"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replaceAll(" ", "-").replace("'", "")}`}
                  className="block border-t border-[var(--rule)] py-3 text-sm text-[var(--ink-2)]"
                >
                  {item}
                </a>
              ))}
            </div>
          </aside>

          <article className="max-w-none">
            {review.body?.length ? <RichText value={review.body} /> : <FallbackBody />}
          </article>

          <aside>
            <div className="sticky top-36 border border-[var(--rule)] bg-[var(--paper-2)] p-5">
              <div className="mono mb-4 text-[var(--ink-3)]">Jo's verdict</div>
              <p className="serif m-0 text-[26px] leading-[1.15]">{review.verdict || review.dek}</p>
            </div>
          </aside>
        </div>
      </section>

      <RelatedSection related={related} category={review.category} />
    </main>
  );
}

function extractH2Links(body?: unknown[]) {
  if (!Array.isArray(body)) {
    return [];
  }

  return body
    .filter((block): block is { style?: string; children?: { text?: string }[] } => {
      return (
        typeof block === "object" &&
        block !== null &&
        (block as { _type?: string })._type === "block" &&
        (block as { style?: string }).style === "h2"
      );
    })
    .map((block) => {
      const title = block.children?.map((child) => child.text || "").join("") || "";
      return { title, href: `#${slugifyHeading(title)}` };
    })
    .filter((item) => item.title && item.href !== "#");
}

function scoreAverage(review: SanityEditorialEntry) {
  const values = stayScoreCriteria
    .map((item) => review.stayScores?.[item.key])
    .filter((value): value is number => typeof value === "number");

  if (values.length) {
    return Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1));
  }

  return review.rating;
}

function formatMonthYear(value?: string) {
  if (!value) {
    return "";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function getCountryFromLocation(value?: string) {
  if (!value) {
    return "";
  }

  const parts = value.split(",").map((part) => part.trim()).filter(Boolean);
  return parts.at(-1) || value;
}

function StayReviewJournalPage({
  review,
  related,
}: {
  review: SanityEditorialEntry;
  related: ReturnType<typeof reviewsForCategory>;
}) {
  const headings = extractH2Links(review.body);
  const average = scoreAverage(review);
  const image = review.imageUrl || editorialPhotos[review.photo];
  const monthYear = formatMonthYear(review.date);
  const country = getCountryFromLocation(review.location);
  const onThisPage = headings.length
    ? headings
    : [
        { title: "First impression", href: "#first-impression" },
        { title: "Worth it?", href: "#worth-it" },
      ];

  return (
    <main className="page">
      <section className="border-b border-[var(--rule)]">
        <div className="container pt-8">
          <div className="mono mb-12 text-[var(--ink-3)]">
            <Link href="/">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/stays">Stays</Link>
            {review.location ? (
              <>
                <span className="mx-2">/</span>
                <span>{review.location}</span>
              </>
            ) : null}
          </div>

          <div className="mx-auto max-w-[1080px] pb-16 text-center lg:pb-20">
            <div className="mono mb-7 text-[var(--accent-deep)]">
              * Stay
              {country ? ` - ${country}` : ""}
              {monthYear ? ` - ${monthYear}` : ""}
            </div>
            <h1 className="serif mx-auto m-0 max-w-[980px] text-[48px] font-normal leading-[1.04] tracking-[-0.02em]">
              {review.title}
            </h1>
            <p className="serif mx-auto mt-7 max-w-[720px] text-[22px] italic leading-[1.4] text-[var(--ink-2)]">
              {review.dek}
            </p>
            <div className="mono mt-9 flex flex-wrap items-center justify-center gap-4 text-[var(--ink-3)]">
              {average != null ? (
                <RatingStars rating={average} />
              ) : null}
            </div>
          </div>

          <figure className="m-0">
            <div className="relative aspect-[16/8] overflow-hidden bg-[var(--paper-2)]">
              <EditorialPhoto src={image} alt={review.title} priority />
            </div>
            <figcaption className="mono py-3 text-center text-[var(--ink-3)]">
              {review.heroCaption || review.photoLabel}
            </figcaption>
          </figure>
        </div>
      </section>

      <section>
        <div className="container grid gap-14 py-20 lg:grid-cols-[260px_minmax(0,1fr)_280px] lg:py-28">
          <aside className="order-2 lg:order-1">
            <div className="sticky top-36">
              <UsefulInfo review={review} />
            </div>
          </aside>

          <article className="order-1 max-w-none lg:order-2">
            {review.body?.length ? <RichText value={review.body} /> : <FallbackBody />}
            <StayReviewBottom review={review} average={average} />
          </article>

          <aside className="order-3 lg:border-l lg:border-[var(--rule)] lg:pl-8">
            <div className="sticky top-36">
              <div className="mono mb-4 text-[var(--ink-3)]">On this page</div>
              {onThisPage.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="grid grid-cols-[28px_1fr] gap-2 border-t border-[var(--rule)] py-3 text-sm text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
                >
                  <span className="mono text-[var(--ink-4)]">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item.title}</span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <RelatedSection related={related} category="stays" />
    </main>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-3 text-[var(--accent-deep)]">
      <span className="inline-flex items-center gap-1.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={13}
            fill={index < Math.round(rating) ? "currentColor" : "none"}
            strokeWidth={1.5}
          />
        ))}
      </span>
      <span>{rating.toFixed(1)} / 5</span>
    </span>
  );
}

function UsefulInfo({ review }: { review: SanityEditorialEntry }) {
  return (
    <div className="border-b border-dashed border-[var(--rule)] pb-6">
      <InfoLine label="Price" value={review.price || "Add price in Sanity"} />
      <InfoLine label="Good for" value={review.goodFor || review.bestFor?.join(", ") || "Add good-for note in Sanity"} />
      <InfoLine label="Best time" value={review.bestTime || "Add best time in Sanity"} />
      <InfoLine label="Avoid" value={review.avoid || "Add avoid note in Sanity"} />
      <div className="mb-0">
        <div className="mono mb-2 text-[var(--ink-3)]">Website</div>
        {review.websiteUrl ? (
          <a href={review.websiteUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm leading-[1.55] text-[var(--ink-2)] underline decoration-[var(--accent)] underline-offset-4">
            Hotel website
            <ExternalLink size={13} />
          </a>
        ) : (
          <p className="m-0 text-sm leading-[1.55] text-[var(--ink-2)]">Add website in Sanity</p>
        )}
      </div>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value?: string }) {
  if (!value) {
    return null;
  }

  return (
    <div className="mb-7 last:mb-0">
      <div className="mono mb-2 text-[var(--ink-3)]">{label}</div>
      <p className="m-0 text-sm leading-[1.55] text-[var(--ink-2)]">{value}</p>
    </div>
  );
}

function StayReviewBottom({
  review,
  average,
}: {
  review: SanityEditorialEntry;
  average: number | null;
}) {
  const loved = review.loved?.length ? review.loved : ["Add loved notes in Sanity"];
  const lessSo = review.lessSo?.length ? review.lessSo : ["Add less-so notes in Sanity"];

  return (
    <div className="mt-16">
      <div className="grid border border-[var(--rule)] lg:grid-cols-2">
        <ListPanel title="+ Loved" items={loved} tone="positive" />
        <ListPanel title="- Less so" items={lessSo} />
      </div>

      <div className="mt-12 border border-[var(--rule)] p-7 lg:p-9">
        <div className="mb-9 flex items-center justify-between gap-6">
          <div className="mono text-[var(--ink-3)]">- By the numbers</div>
          <div className="mono">Overall {average != null ? average.toFixed(1) : "-"}</div>
        </div>
        <div className="grid gap-7">
          {stayScoreCriteria.map((item) => {
            const value = review.stayScores?.[item.key];
            return <ScoreBar key={item.key} label={item.label} subtitle={item.subtitle} value={value} />;
          })}
        </div>
      </div>

      {review.disclosure ? (
        <div className="mt-14">
          <div className="mono mb-5 text-[var(--ink-3)]">- Disclosure</div>
          <p className="m-0 text-sm leading-[1.75] text-[var(--ink-3)]">
            {review.disclosure}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function ListPanel({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone?: "positive";
}) {
  return (
    <div className="border-b border-[var(--rule)] p-8 lg:border-b-0 lg:border-r lg:p-10 last:border-r-0">
      <div className="mono mb-7 text-[var(--ink-3)]">{title}</div>
      <div className="space-y-0">
        {items.length ? (
          items.map((item) => (
            <div
              key={item}
              className="grid grid-cols-[24px_1fr] gap-4 border-b border-dashed border-[var(--rule)] py-4 text-xl leading-[1.45] text-[var(--ink-2)] last:border-b-0"
            >
              <span className={tone === "positive" ? "text-[var(--accent-deep)]" : "text-[var(--ink-3)]"}>
                {tone === "positive" ? "+" : "-"}
              </span>
              <span>{item}</span>
            </div>
          ))
        ) : (
          <p className="m-0 text-sm text-[var(--ink-3)]">Add notes in Sanity.</p>
        )}
      </div>
    </div>
  );
}

function ScoreBar({
  label,
  subtitle,
  value,
}: {
  label: string;
  subtitle: string;
  value?: number;
}) {
  const width = typeof value === "number" ? Math.max(0, Math.min(100, (value / 5) * 100)) : 0;

  return (
    <div className="grid items-center gap-4 sm:grid-cols-[230px_1fr_42px]">
      <div>
        <div className="mono text-[var(--ink-2)]">{label}</div>
        <p className="m-0 mt-1 text-xs leading-[1.45] text-[var(--ink-3)]">{subtitle}</p>
      </div>
      <div className="h-2 bg-[var(--rule-soft)]">
        <div className="h-full bg-[var(--ink)]" style={{ width: `${width}%` }} />
      </div>
      <div className="mono text-right">{typeof value === "number" ? value.toFixed(1) : "-"}</div>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="border-t border-[var(--rule)] py-4">
      <div className="mono mb-1 text-[var(--ink-4)]">{label}</div>
      <div className="text-sm text-[var(--ink-2)]">{value || "-"}</div>
    </div>
  );
}

function FallbackBody() {
  return (
    <>
      <h2 id="first-impression" className="serif m-0 mb-5 text-[42px] font-normal">
        First impression
      </h2>
      <p className="my-6 text-lg leading-[1.85] text-[var(--ink-2)]">
        This is starter copy for the stay review format. Add H2 headings in Sanity and they will
        automatically appear in the On this page navigation.
      </p>
      <h2 id="worth-it" className="serif mt-14 mb-5 text-[42px] font-normal">
        Worth it?
      </h2>
      <p className="my-6 text-lg leading-[1.85] text-[var(--ink-2)]">
        The review should answer the infrequent traveller question directly: was this stay worth
        using precious days off?
      </p>
    </>
  );
}

function RelatedSection({
  related,
  category,
}: {
  related: ReturnType<typeof reviewsForCategory>;
  category: SanityEditorialEntry["category"];
}) {
  return (
    <section>
      <div className="container py-24 lg:py-32">
        <SectionHead
          kicker="Keep reading"
          title={`More ${category === "tips" ? "tips" : category}.`}
          action="View section"
          href={`/${category}`}
        />
        <div className="grid gap-12 lg:grid-cols-3">
          {related.length > 0 ? (
            related.map((item) => <ReviewCard key={item.id} review={item} />)
          ) : (
            <Link href="/" className="btn solid w-fit">
              Back home
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
