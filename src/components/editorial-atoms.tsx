import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Plus, Star } from "lucide-react";
import {
  editorialCategoryMeta,
  editorialPhotos,
  reviewHref,
  type EditorialCategory,
  type EditorialReview,
} from "@/lib/editorial-data";
import { getEditorialEntriesByCategory } from "@/lib/sanity-content";

const badgeByCategory: Record<EditorialCategory, string> = {
  stays: "Stay",
  food: "Food",
  experiences: "Experience",
  kids: "Kid",
  tips: "Tip",
};

export function EditorialPhoto({
  src,
  alt,
  label,
  priority = false,
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  label?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="photo-grain absolute inset-0">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
      {label ? (
        <div className="mono absolute bottom-3.5 left-3.5 bg-[rgba(245,242,236,0.92)] px-2 py-1 text-[var(--ink)]">
          {label}
        </div>
      ) : null}
    </div>
  );
}

export function SectionHead({
  kicker,
  title,
  action,
  href,
}: {
  kicker: string;
  title: string;
  action?: string;
  href?: string;
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <div>
        <div className="mono mb-2.5 text-[var(--ink-3)]">— {kicker}</div>
        <h2 className="serif m-0 text-[clamp(28px,3vw,40px)] font-normal leading-[1.1] tracking-[-0.01em]">
          {title}
        </h2>
      </div>
      {action && href ? (
        <Link href={href} className="btn ghost">
          {action}
          <ArrowRight size={14} strokeWidth={1.6} />
        </Link>
      ) : null}
    </div>
  );
}

export function ReviewCard({ review }: { review: EditorialReview }) {
  return (
    <article className="review-card flex cursor-pointer flex-col gap-4">
      <Link href={reviewHref(review)} className="contents">
        <div className="relative aspect-[4/5] overflow-hidden">
          <EditorialPhoto
            src={review.imageUrl || editorialPhotos[review.photo]}
            alt={review.title}
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className="absolute left-3 top-3 flex gap-1.5">
            <span className="tag solid">{badgeByCategory[review.category]}</span>
          </div>
          {review.rating != null ? (
            <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 bg-[rgba(245,242,236,0.92)] px-2 py-1 font-mono text-[11px] tracking-[0.06em]">
              <Star size={11} fill="currentColor" strokeWidth={1.4} />
              {review.rating.toFixed(1)}
            </div>
          ) : null}
        </div>
        <div>
          <div className="mono mb-2 text-[var(--ink-3)]">
            {review.kicker} · {review.readTime}
          </div>
          <h3 className="serif m-0 mb-2 text-xl font-normal leading-[1.2] tracking-[-0.005em]">
            {review.title}
          </h3>
          <p className="m-0 text-sm leading-[1.55] text-[var(--ink-2)]">{review.dek}</p>
        </div>
      </Link>
    </article>
  );
}

export function ComingNextIssue() {
  return (
    <div className="flex aspect-[4/5] items-center justify-center border border-dashed border-[var(--rule)] p-6">
      <div className="text-center">
        <Plus size={20} />
        <div className="mono mt-3 text-[var(--ink-3)]">Coming next issue</div>
      </div>
    </div>
  );
}

export async function CategoryLanding({ category }: { category: EditorialCategory }) {
  const meta = editorialCategoryMeta[category];
  const all = await getEditorialEntriesByCategory(category);
  const featured = all[0];
  const rest = all.slice(1);

  return (
    <main className="page">
      <section className="border-b border-[var(--ink)]">
        <div className="container py-24 lg:py-32">
          <div className="mb-12 flex justify-between">
            <span className="mono text-[var(--ink-3)]">— {meta.eyebrow}</span>
            <span className="mono text-[var(--ink-3)]">
              {all.length || meta.count} entries · sorted by latest
            </span>
          </div>
          <div className="grid items-end gap-16 lg:grid-cols-[1.4fr_1fr]">
            <h1 className="serif m-0 max-w-full text-[clamp(52px,18vw,180px)] font-normal italic leading-[0.9] tracking-[-0.04em] break-words lg:text-[clamp(72px,11vw,180px)]">
              {meta.title}
            </h1>
            <p className="mb-3.5 max-w-[460px] text-lg leading-[1.55] text-[var(--ink-2)]">
              {meta.sub}
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-[114px] z-20 border-b border-[var(--rule)] bg-[var(--paper)]">
        <div className="container flex min-h-14 items-center justify-between gap-4 py-2 max-sm:flex-col max-sm:items-start">
          <div className="flex flex-wrap gap-0">
            {["All", ...meta.tags].map((tag, index) => (
              <span
                key={tag}
                className={`mono px-4 py-2 ${index === 0 ? "bg-[var(--ink)] text-[var(--paper)]" : "text-[var(--ink-2)]"}`}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3.5">
            <span className="mono text-[var(--ink-3)]">Sort</span>
            <span className="mono border border-[var(--rule)] px-3 py-2">Most recent</span>
          </div>
        </div>
      </section>

      {featured ? (
        <section className="border-b border-[var(--rule)]">
          <div className="container py-24 lg:py-32">
            <Link
              href={reviewHref(featured)}
              className="grid cursor-pointer items-center gap-14 lg:grid-cols-[1.5fr_1fr]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <EditorialPhoto
                  src={featured.imageUrl || editorialPhotos[featured.photo]}
                  alt={featured.title}
                  label={featured.photoLabel}
                />
                <div className="absolute left-4 top-4">
                  <span className="tag solid">Latest</span>
                </div>
              </div>
              <div>
                <div className="mono mb-4 text-[var(--ink-3)]">
                  {featured.kicker} · {featured.readTime}
                </div>
                <h2 className="serif m-0 mb-[18px] text-[clamp(32px,4vw,52px)] font-normal leading-[1.05] tracking-[-0.015em]">
                  {featured.title}
                </h2>
                <p className="m-0 mb-6 text-[17px] leading-[1.55] text-[var(--ink-2)]">
                  {featured.dek}
                </p>
                <div className="mb-7 flex items-center gap-[18px]">
                  {featured.rating != null ? (
                    <>
                      <span className="text-[var(--accent)]">★ ★ ★ ★ ☆</span>
                      <span className="mono">{featured.rating.toFixed(1)} / 5</span>
                    </>
                  ) : null}
                  <span className="mono text-[var(--ink-3)]">· {featured.location}</span>
                </div>
                <span className="btn solid">
                  Read review <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      <section>
        <div className="container py-24 lg:py-32">
          <SectionHead kicker={`More in ${meta.title.toLowerCase().replace(".", "")}`} title="The full file." />
          <div className="grid gap-12 lg:grid-cols-3">
            {rest.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
            {rest.length < 3
              ? Array.from({ length: 3 - rest.length }).map((_, index) => (
                  <ComingNextIssue key={index} />
                ))
              : null}
          </div>
          {rest.length >= 3 ? (
            <div className="mt-16 flex justify-center">
              <button className="btn">
                Load more <ArrowDown size={14} />
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
