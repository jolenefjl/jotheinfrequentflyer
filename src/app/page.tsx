import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { getDestinations, getLatestItems } from "@/lib/content";

export default async function Home() {
  const destinations = await getDestinations();
  const latestItems = await getLatestItems();
  const heroImage = destinations[0]?.heroImage;

  return (
    <main>
      <section className="relative -mt-20 min-h-[94vh] overflow-hidden">
        {heroImage ? (
          <Image
            src={heroImage}
            alt="Featured Jo the Infrequent Flyer destination"
            fill
            priority
            className="object-cover object-center"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#141210]/20 to-[#141210]/75" />
        <div className="container absolute inset-x-0 bottom-12 text-[#FAFAF8]">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FAFAF8]/75">
            Honest travel · Real opinions
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-6xl font-light italic leading-[0.95] md:text-7xl">
            Make every trip count.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#FAFAF8]/78 md:text-lg">
            First-hand travel reviews from a Malaysian-born mum in Norway who does not travel
            often enough to waste a trip.
          </p>
          <Link
            href="#destinations"
            className="mt-8 inline-flex bg-[#FAFAF8] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#1E1C1A]"
          >
            Start exploring
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">The map starts small</p>
            <h2 className="mt-3 font-serif text-5xl font-light text-[var(--warm-brown)]">
              Destinations Jo has actually been to.
            </h2>
            <p className="mt-5 leading-8 text-[var(--ink)]">
              This is intentionally not a giant magazine grid. The site should feel full with a
              handful of useful reviews, then grow slowly as Jo publishes more.
            </p>
          </div>
          <div className="relative min-h-[330px] p-6">
            {destinations.map((destination) => (
              <Link
                key={destination._id}
                href={`/destinations/${destination.slug}`}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--ink)]"
                style={{
                  left: `${((destination.longitude + 180) / 360) * 100}%`,
                  top: `${((90 - destination.latitude) / 180) * 100}%`,
                }}
              >
                <MapPin size={14} className="text-[var(--muted)]" />
                {destination.city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="destinations" className="container py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Browse by place</p>
            <h2 className="mt-3 font-serif text-5xl font-light text-[var(--warm-brown)]">
              First destinations
            </h2>
          </div>
          <p className="max-w-md leading-7 text-[var(--muted)]">
            Placeholder photography for now; Sanity will own the final images and copy.
          </p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {destinations.map((destination) => (
            <Link
              key={destination._id}
              href={`/destinations/${destination.slug}`}
              className="group overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={destination.heroImage || ""}
                  alt={`${destination.city}, ${destination.country}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                  {destination.country}
                </p>
                <h3 className="mt-1 font-serif text-3xl font-light text-[var(--warm-brown)]">
                  {destination.city}
                </h3>
                <p className="mt-3 min-h-20 text-sm leading-6 text-[var(--ink)]">
                  {destination.joTake}
                </p>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                  {destination.contentCount}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container grid gap-12 lg:grid-cols-[1fr_0.78fr]">
          <div>
            <p className="eyebrow">Latest notes</p>
            <div className="mt-5 divide-y divide-[var(--line)]">
              {latestItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="grid gap-3 py-6 md:grid-cols-[130px_1fr_120px]"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                    {item.type}
                  </p>
                  <div>
                    <h3 className="font-serif text-3xl font-light text-[var(--warm-brown)]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">{item.destination}</p>
                  </div>
                  <p className="text-sm text-[var(--muted)]">{item.date}</p>
                </Link>
              ))}
            </div>
          </div>
          <aside>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/jo-headshot.jpg"
                alt="Jo smiling outdoors in Norway"
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-6 font-serif text-3xl font-light leading-tight text-[var(--warm-brown)]">
              &ldquo;I do not travel often enough to pretend every place is magical.&rdquo;
            </p>
            <p className="mt-4 leading-7 text-[var(--ink)]">
              Jo reviews the little details because those are usually what make a trip feel worth
              the annual leave.
            </p>
          </aside>
        </div>
      </section>

      <section className="container py-20">
        <div className="bg-[#1E1C1A] p-8 text-[#FAFAF8] md:p-12">
          <p className="eyebrow text-[#FAFAF8]/65">Newsletter</p>
          <h2 className="mt-3 max-w-3xl font-serif text-5xl font-light">
            Worth-it travel notes, eventually in your inbox.
          </h2>
          <form className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-[1fr_auto]">
            <input
              type="email"
              placeholder="Email address"
              className="h-12 bg-[#FAFAF8] px-5 text-[var(--ink)] outline-none"
            />
            <button className="h-12 bg-[#FAFAF8] px-6 text-sm font-bold uppercase tracking-[0.12em] text-[#1E1C1A]">
              Join the list
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
