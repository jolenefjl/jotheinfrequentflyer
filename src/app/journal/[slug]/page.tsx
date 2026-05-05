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
  const image = review.metadata?.ogImage || review.metadata?.twitterCardImage || review.imageUrl || editorialPhotos[review.photo];

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
              <div className="border-t border-[var(--rule)] py-4">
                <div className="mono mb-1 text-[var(--ink-4)]">Filed</div>
                <div className="text-sm text-[var(--ink-2)]">{review.date}</div>
              </div>
              <div className="border-t border-[var(--rule)] py-4">
                <div className="mono mb-1 text-[var(--ink-4)]">Location</div>
                <div className="text-sm text-[var(--ink-2)]">{review.location}</div>
              </div>
              <div className="border-t border-[var(--rule)] py-4">
                <div className="mono mb-1 text-[var(--ink-4)]">Read</div>
                <div className="text-sm text-[var(--ink-2)]">{review.readTime}</div>
              </div>
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
            {review.body?.length ? (
              <RichText value={review.body} />
            ) : (
              <>
                <h2 id="first-impression" className="serif m-0 mb-5 text-[38px] font-normal">
                  First impression
                </h2>
                <p className="my-6 text-lg leading-[1.85] text-[var(--ink-2)]">
                  This is placeholder copy for the redesign, but it is shaped around the kind of note
                  Jo will actually write: specific, opinionated, and honest about the small details
                  that make a rare trip feel worth the effort.
                </p>
                <p className="my-6 text-lg leading-[1.85] text-[var(--ink-2)]">
                  The useful question is not only whether a place is beautiful. It is whether the
                  arrival feels calm, whether breakfast is worth getting out of bed for, whether the
                  room works after a beach day, and whether the price still feels reasonable once the
                  glow fades.
                </p>
              </>
            )}
          </article>

          <aside>
            <div className="sticky top-36 border border-[var(--rule)] bg-[var(--paper-2)] p-5">
              <div className="mono mb-4 text-[var(--ink-3)]">Jo&apos;s verdict</div>
              <p className="serif m-0 text-[26px] leading-[1.15]">
                Send a friend, especially if they want a soft landing before disappearing into the
                sea.
              </p>
              <div className="mt-6 grid gap-3 border-t border-[var(--rule)] pt-5">
                {["Best for slow couples", "Book the transfer early", "Avoid peak monsoon months"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-[var(--ink-2)]">
                      <span className="size-1.5 bg-[var(--accent)]" />
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section>
        <div className="container py-24 lg:py-32">
          <SectionHead
            kicker="Keep reading"
            title={`More ${review.category === "tips" ? "tips" : review.category}.`}
            action="View section"
            href={`/${review.category}`}
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

  return (
    <main className="page">
      <section className="border-b border-[var(--ink)]">
        <div className="container py-16 lg:py-24">
          <Link href="/stays" className="mono mb-12 inline-flex items-center gap-2 text-[var(--ink-3)]">
            <ArrowLeft size={13} strokeWidth={1.6} />
            Back to stays
          </Link>

          <div className="stay-review-hero grid items-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <EditorialPhoto src={image} alt={review.title} label={review.photoLabel} priority />
              <div className="absolute left-4 top-4 flex gap-1.5">
                <span className="tag solid">Stay</span>
                {review.location ? (
                  <span className="tag border-transparent bg-[rgba(245,242,236,0.92)]">
                    {review.location}
                  </span>
                ) : null}
              </div>
            </div>

            <div>
              <div className="mono mb-5 text-[var(--accent-deep)]">
                {average != null ? `${average.toFixed(1)} / 5` : "Stay review"}
                {review.readTime ? ` - ${review.readTime} read` : ""}
              </div>
              <h1 className="serif m-0 text-[clamp(48px,7vw,104px)] font-normal leading-[0.92] tracking-[-0.045em]">
                {review.title}
              </h1>
              <p className="serif mt-8 max-w-[720px] text-[clamp(22px,2.4vw,31px)] leading-[1.3] text-[var(--ink-2)]">
                {review.verdict || review.dek}
              </p>
              <div className="mono mt-8 text-[var(--ink-3)]">
                {review.date || "Draft"} {review.location ? ` · ${review.location}` : ""}
              </div>
              {review.websiteUrl ? (
                <a href={review.websiteUrl} target="_blank" rel="noreferrer" className="btn solid mt-8">
                  Visit website
                  <ExternalLink size={14} />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--rule)]">
        <div className="container grid gap-16 py-24 lg:grid-cols-[minmax(0,1.55fr)_340px] lg:py-32">
          <article className="max-w-none">
            <section className="mb-16 border-y border-[var(--rule)] py-8">
              <div className="mb-6 flex items-baseline justify-between gap-6">
                <div>
                  <div className="mono mb-2 text-[var(--ink-3)]">Jo Score</div>
                  <h2 className="serif m-0 text-[clamp(34px,4vw,56px)] font-normal leading-none">
                    {average != null ? `${average.toFixed(1)} / 5` : "Unscored"}
                  </h2>
                </div>
                <div className="mono text-[var(--ink-3)]">point system out of 5</div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {stayScoreCriteria.map((item) => {
                  const value = review.stayScores?.[item.key];
                  return (
                    <div key={item.key} className="border-t border-[var(--rule)] pt-4">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="serif m-0 text-[24px] font-normal leading-[1.1]">{item.label}</h3>
                        <span className="mono whitespace-nowrap">
                          {typeof value === "number" ? value.toFixed(1) : "-"} / 5
                        </span>
                      </div>
                      <p className="m-0 mt-2 text-sm leading-[1.45] text-[var(--ink-3)]">{item.subtitle}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {review.body?.length ? (
              <RichText value={review.body} />
            ) : (
              <>
                <h2 id="first-impression" className="serif m-0 mb-5 text-[42px] font-normal">
                  First impression
                </h2>
                <p className="my-6 text-lg leading-[1.85] text-[var(--ink-2)]">
                  This is starter copy for the stay review format. Add H2 headings in Sanity and
                  they will automatically appear in the “On this page” navigation.
                </p>
                <h2 id="worth-it" className="serif mt-14 mb-5 text-[42px] font-normal">
                  Worth it?
                </h2>
                <p className="my-6 text-lg leading-[1.85] text-[var(--ink-2)]">
                  The review should answer the infrequent traveller question directly: was this
                  stay worth using precious days off?
                </p>
              </>
            )}
          </article>

          <aside className="lg:border-l lg:border-[var(--rule)] lg:pl-8">
            <div className="sticky top-36 space-y-8">
              <div>
                <div className="mono mb-4 text-[var(--ink-3)]">On this page</div>
                {(headings.length ? headings : [{ title: "First impression", href: "#first-impression" }, { title: "Worth it?", href: "#worth-it" }]).map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block border-t border-[var(--rule)] py-3 text-sm text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
                  >
                    {item.title}
                  </a>
                ))}
              </div>

              <div className="border-t border-[var(--rule)] pt-6">
                <div className="mono mb-4 text-[var(--ink-3)]">Quick verdict</div>
                <p className="serif m-0 text-[26px] leading-[1.15]">{review.verdict || review.dek}</p>
              </div>

              <div className="grid gap-5 border-t border-[var(--rule)] pt-6">
                {review.bestFor?.length ? (
                  <div>
                    <div className="mono mb-2 text-[var(--ink-3)]">Best for</div>
                    <p className="m-0 text-sm leading-[1.6] text-[var(--ink-2)]">{review.bestFor.join(", ")}</p>
                  </div>
                ) : null}
                {review.avoid ? (
                  <div>
                    <div className="mono mb-2 text-[var(--ink-3)]">Avoid if</div>
                    <p className="m-0 text-sm leading-[1.6] text-[var(--ink-2)]">{review.avoid}</p>
                  </div>
                ) : null}
                {review.websiteUrl ? (
                  <a href={review.websiteUrl} target="_blank" rel="noreferrer" className="btn w-fit">
                    Website
                    <ExternalLink size={14} />
                  </a>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section>
        <div className="container py-24 lg:py-32">
          <SectionHead kicker="Keep reading" title="More stays." action="View stays" href="/stays" />
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
    </main>
  );
}
