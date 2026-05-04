import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JoScoreCard } from "@/components/jo-score-card";
import { getStayBySlug } from "@/lib/content";

export default async function StayReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const review = await getStayBySlug(slug);

  if (!review) {
    notFound();
  }

  return (
    <main>
      <section className="relative min-h-[72vh] overflow-hidden">
        <Image
          src={review.heroImage || ""}
          alt={review.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/80 via-[#141210]/30 to-transparent" />
        <div className="container absolute inset-x-0 bottom-12 max-w-4xl text-[#FAFAF8]">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FAFAF8]/72">Stay review</p>
          <h1 className="mt-4 font-serif text-5xl font-medium leading-none md:text-7xl">{review.title}</h1>
          <Link
            href={`/destinations/${review.destination.slug}`}
            className="mt-5 inline-block text-sm font-bold"
          >
            {review.destination.city}, {review.destination.country}
          </Link>
        </div>
      </section>
      <article className="container grid gap-12 py-16 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <JoScoreCard
            scores={review.scores}
            bestFor={review.bestFor}
            wouldJoReturn={review.wouldJoReturn}
            verdict={review.oneLineVerdict}
          />
        </div>
        <div className="max-w-3xl">
          <p className="eyebrow">Visited {review.dateVisited}</p>
          <div className="mt-6 space-y-6 text-lg leading-9 text-[var(--ink)]">
            {review.bodyPreview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <section>
              <h2 className="font-serif text-3xl font-medium text-[var(--warm-brown)]">The Good</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6">
                {review.good.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-serif text-3xl font-medium text-[var(--warm-brown)]">The Bad</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6">
                {review.bad.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
          <section className="mt-10">
            <p className="eyebrow">Practical info</p>
            <div className="mt-4 grid gap-3 text-sm leading-6 md:grid-cols-2">
              <p>Price range: {review.priceRange}</p>
              <p>Affiliate button: hidden until Jo is ready</p>
              <p>Pinterest image: Sanity field ready</p>
              <p>Related cards: coming as content grows</p>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
