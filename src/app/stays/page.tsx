import Link from "next/link";
import { getStayReviews } from "@/lib/content";

export default async function StaysPage() {
  const stayReviews = await getStayReviews();

  return (
    <main className="container py-16">
      <p className="eyebrow">Reviews</p>
      <h1 className="mt-4 font-serif text-6xl font-light text-[var(--warm-brown)]">Stays</h1>
      <div className="mt-10 grid gap-5">
        {stayReviews.map((review) => (
          <Link key={review._id} href={`/stays/${review.slug}`} className="block py-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">{review.destination.city}</p>
            <h2 className="mt-2 font-serif text-3xl font-light text-[var(--warm-brown)]">{review.title}</h2>
            <p className="mt-3 text-[var(--ink)]">{review.oneLineVerdict}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
