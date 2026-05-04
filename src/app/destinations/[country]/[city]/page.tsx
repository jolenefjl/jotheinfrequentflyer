import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDestinationBySlug, getStayReviews } from "@/lib/content";

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ country: string; city: string }>;
}) {
  const { country, city } = await params;
  const destination = await getDestinationBySlug(country, city);
  const stays = await getStayReviews();

  if (!destination) {
    notFound();
  }

  const relatedStays = stays.filter(
    (review) => review.destination.slug === destination.slug,
  );

  return (
    <main>
      <section className="relative min-h-[68vh] overflow-hidden">
        <Image
          src={destination.heroImage || ""}
          alt={`${destination.city}, ${destination.country}`}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/75 via-[#141210]/20 to-transparent" />
        <div className="container absolute inset-x-0 bottom-12 text-[#FAFAF8]">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FAFAF8]/72">
            {destination.country}
          </p>
          <h1 className="mt-3 font-serif text-7xl font-medium">{destination.city}</h1>
          <p className="mt-5 max-w-2xl text-xl leading-8">{destination.joTake}</p>
        </div>
      </section>
      <section className="container py-16">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <aside>
            <p className="eyebrow">Destination score</p>
            <p className="mt-3 font-serif text-5xl font-medium text-[var(--terracotta)]">4.0</p>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Mock average across published reviews. This will be calculated from Sanity content.
            </p>
          </aside>
          <div>
            <p className="eyebrow">Published here</p>
            <h2 className="mt-3 font-serif text-5xl font-medium text-[var(--warm-brown)]">Stays</h2>
            <div className="mt-6 grid gap-5">
              {relatedStays.length ? (
                relatedStays.map((review) => (
                  <Link
                    key={review._id}
                    href={`/stays/${review.slug}`}
                    className="block py-5 transition opacity-90 hover:opacity-100"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                      Stay review
                    </p>
                    <h3 className="mt-2 font-serif text-3xl font-medium text-[var(--warm-brown)]">
                      {review.title}
                    </h3>
                    <p className="mt-3 text-[var(--ink)]">{review.oneLineVerdict}</p>
                  </Link>
                ))
              ) : (
                <p className="py-5 text-[var(--muted)]">
                  No stays published yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
