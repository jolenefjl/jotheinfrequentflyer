import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Bookmark, Star } from "lucide-react";
import {
  EditorialPhoto,
  ReviewCard,
  SectionHead,
} from "@/components/editorial-atoms";
import {
  editorialPhotos,
  editorialReviews,
  reviewsForCategory,
} from "@/lib/editorial-data";

export function generateStaticParams() {
  return editorialReviews.map((review) => ({ slug: review.slug }));
}

export default async function JournalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const review = editorialReviews.find((item) => item.slug === slug);

  if (!review) {
    notFound();
  }

  const related = reviewsForCategory(review.category)
    .filter((item) => item.slug !== review.slug)
    .slice(0, 3);

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
              <button className="btn">
                <Bookmark size={14} />
                Save
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--rule)]">
        <div className="container py-16 lg:py-24">
          <div className="relative aspect-[16/8] overflow-hidden">
            <EditorialPhoto
              src={editorialPhotos[review.photo]}
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

          <article className="prose max-w-none">
            <h2 id="first-impression" className="serif m-0 mb-5 text-[38px] font-normal">
              First impression
            </h2>
            <p>
              This is placeholder copy for the redesign, but it is shaped around the kind of note
              Jo will actually write: specific, opinionated, and honest about the small details that
              make a rare trip feel worth the effort.
            </p>
            <p>
              The useful question is not only whether a place is beautiful. It is whether the arrival
              feels calm, whether breakfast is worth getting out of bed for, whether the room works
              after a beach day, and whether the price still feels reasonable once the glow fades.
            </p>

            <h2 id="the-stay" className="serif mb-5 mt-14 text-[38px] font-normal">
              The stay
            </h2>
            <p>
              For the Perhentians, the fantasy is easy: clear water, slow mornings, and not much on
              the agenda beyond swimming, reading, and choosing your next plate of something spicy.
              The harder part is logistics, comfort, and whether the resort gets the everyday pieces
              right enough that you can actually switch off.
            </p>
            <blockquote>
              The best travel days are rarely packed. They are the ones where nothing dramatic
              happens, and you still remember the light.
            </blockquote>

            <h2 id="worth-it" className="serif mb-5 mt-14 text-[38px] font-normal">
              Worth it?
            </h2>
            <p>
              If this were the only proper trip you were taking this year, the answer would come down
              to how much you value ease. A good stay removes friction. A great one gives you back
              enough attention to notice where you are.
            </p>
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
