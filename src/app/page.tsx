import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

type Review = {
  id: string;
  slug: string;
  category: "stays" | "food" | "experiences" | "kids" | "tips";
  kicker: string;
  title: string;
  dek: string;
  date: string;
  readTime: string;
  location: string;
  photo: keyof typeof photos;
  photoLabel: string;
  rating: number | null;
  featured?: boolean;
};

const photos = {
  ocean:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85",
  market:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85",
  moss:
    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85",
  rose:
    "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=1200&q=85",
  terracotta:
    "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=1200&q=85",
  jungle:
    "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85",
  dusk:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
  alpine:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=85",
  cobalt:
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=85",
  sand:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=85",
};

const reviews: Review[] = [
  {
    id: "marriott-perhentian",
    slug: "marriott-perhentian",
    category: "stays",
    kicker: "Stay — Malaysia",
    title: "A week of slow mornings at the Marriott Perhentian Island",
    dek: "Malaysia's newest castaway-style resort opened to a wave of expectation. After seven days, two boats, and an awful lot of nasi lemak — here's what it actually feels like to stay there.",
    date: "March 2026",
    readTime: "12 min",
    location: "Perhentian Besar, Malaysia",
    photo: "ocean",
    photoLabel: "Coast / Perhentian Besar",
    rating: 4.2,
    featured: true,
  },
  {
    id: "kafe-koba",
    slug: "kafe-koba",
    category: "food",
    kicker: "Food — Mexico City",
    title: "The unmarked masa counter in Roma that ruined other tortillas for me",
    dek: "Eight stools, one griddle, and a heirloom-corn tasting that costs less than your last airport sandwich.",
    date: "February 2026",
    readTime: "6 min",
    location: "Colonia Roma Norte, CDMX",
    photo: "market",
    photoLabel: "Counter / Roma Norte",
    rating: 4.7,
  },
  {
    id: "naoshima-walk",
    slug: "naoshima-walk",
    category: "experiences",
    kicker: "Experience — Japan",
    title: "Walking Naoshima from north to south, slowly, in the rain",
    dek: "What a quiet, soggy afternoon on Japan's art island taught me about pacing a trip.",
    date: "January 2026",
    readTime: "9 min",
    location: "Naoshima, Kagawa",
    photo: "moss",
    photoLabel: "Path / Naoshima",
    rating: 4.5,
  },
  {
    id: "lisbon-tips",
    slug: "lisbon-tips",
    category: "tips",
    kicker: "Top tips — Portugal",
    title: "Twelve things I'd tell a friend before their first week in Lisbon",
    dek: "From which trams to skip to the bakery you should walk twenty minutes for.",
    date: "January 2026",
    readTime: "7 min",
    location: "Lisbon",
    photo: "rose",
    photoLabel: "Rooftops / Alfama",
    rating: null,
  },
  {
    id: "casa-bosques",
    slug: "casa-bosques",
    category: "stays",
    kicker: "Stay — Mexico",
    title: "Casa Bosques: thirteen rooms above an art bookstore in Mexico City",
    dek: "A residential-feeling stay that gets the small things — light, books, coffee — almost embarrassingly right.",
    date: "December 2025",
    readTime: "8 min",
    location: "CDMX",
    photo: "terracotta",
    photoLabel: "Courtyard / Roma",
    rating: 4.6,
  },
  {
    id: "aman-kyoto",
    slug: "aman-kyoto",
    category: "stays",
    kicker: "Stay — Japan",
    title: "Aman Kyoto, in shoulder season, on a budget that absolutely couldn't afford it",
    dek: "Two nights, one anniversary, and a serious look at whether the legend lives up to the price.",
    date: "November 2025",
    readTime: "11 min",
    location: "Kyoto",
    photo: "jungle",
    photoLabel: "Garden / Takagamine",
    rating: 4.8,
  },
  {
    id: "puglia-with-toddler",
    slug: "puglia-with-toddler",
    category: "kids",
    kicker: "Kids — Italy",
    title: "Two weeks in Puglia with a two-year-old (and what actually worked)",
    dek: "An honest field report on traveling slowly through southern Italy with a small, opinionated human in tow.",
    date: "April 2026",
    readTime: "9 min",
    location: "Ostuni & Lecce, Italy",
    photo: "sand",
    photoLabel: "Trullo / Itria Valley",
    rating: 4.4,
  },
];

const categories = [
  {
    id: "stays",
    label: "Stays",
    count: 47,
    blurb: "Hotels, inns, rentals — anywhere I've slept and have an opinion about.",
  },
  {
    id: "food",
    label: "Food",
    count: 84,
    blurb: "Counter seats, neighborhood spots, the one dish worth the detour.",
  },
  {
    id: "experiences",
    label: "Experiences",
    count: 38,
    blurb: "Walks, treks, classes, museums — the kind of days you remember.",
  },
  {
    id: "kids",
    label: "Kids",
    count: 14,
    blurb: "Travel with small humans: what worked, what didn't, what I'd skip.",
  },
  {
    id: "tips",
    label: "Top Tips",
    count: 22,
    blurb: "Hard-won, opinionated, occasionally contrarian advice by city.",
  },
];

const destinations = [
  { name: "Mexico City", country: "Mexico", count: 7 },
  { name: "Tokyo", country: "Japan", count: 11 },
  { name: "Lisbon", country: "Portugal", count: 5 },
  { name: "Perhentian Islands", country: "Malaysia", count: 3 },
  { name: "Mendoza", country: "Argentina", count: 4 },
  { name: "Kyoto", country: "Japan", count: 6 },
  { name: "Imlil", country: "Morocco", count: 2 },
  { name: "Ibiza", country: "Spain", count: 3 },
];

const pins = [
  { x: 200, y: 290, label: "Mexico City" },
  { x: 640, y: 250, label: "Tokyo" },
  { x: 350, y: 220, label: "Lisbon" },
  { x: 660, y: 330, label: "Perhentians" },
  { x: 245, y: 410, label: "Mendoza" },
  { x: 660, y: 245, label: "Kyoto" },
  { x: 365, y: 270, label: "Imlil" },
  { x: 380, y: 215, label: "Ibiza" },
];

export default function Home() {
  const featured = reviews.find((review) => review.featured) || reviews[0];
  const latest = reviews.filter((review) => !review.featured).slice(0, 6);

  return (
    <main className="page">
      <section className="manifesto-hero">
        <Photo
          src={photos.ocean}
          alt="Tropical sea in Perhentian Besar"
          className="absolute inset-0 -z-20"
          priority
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(23,20,16,0.35) 0%, rgba(23,20,16,0.55) 60%, rgba(23,20,16,0.75) 100%)",
          }}
        />
        <div className="container manifesto-hero__inner">
          <div className="mb-9 grid grid-cols-[auto_1fr_auto] items-baseline gap-6">
            <span className="mono text-[rgba(245,242,236,0.7)]">Est. 2024</span>
            <div className="h-px bg-[rgba(245,242,236,0.3)]" />
            <span className="mono text-[rgba(245,242,236,0.7)]">
              A travel review, slowly kept
            </span>
          </div>
          <h1 className="manifesto-hero__title">The Infrequent Flyer.</h1>
          <div className="manifesto-grid">
            <p className="serif m-0 max-w-[760px] text-[clamp(22px,2.6vw,32px)] font-normal leading-[1.35] text-[var(--paper)]">
              Because I don&apos;t get to travel often enough, every single trip is precious.
              These are my notes on the places I&apos;ve slept, the meals I&apos;ve remembered, and
              the days that turned out to matter.
            </p>
            <div className="flex flex-col items-start gap-1.5 text-[var(--paper)]">
              <span className="mono text-[rgba(245,242,236,0.7)]">Currently</span>
              <span className="serif text-[22px] italic tracking-[-0.005em]">Lisbon →</span>
              <span className="mono mt-1.5 text-[rgba(245,242,236,0.55)]">
                {reviews.length} entries · {destinations.length} places
              </span>
            </div>
          </div>
          <div className="absolute bottom-6 right-8">
            <span className="mono bg-[rgba(245,242,236,0.92)] px-2 py-1 text-[var(--ink)]">
              Cover photo / Perhentian Besar, Malaysia
            </span>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--rule)]">
        <div className="container py-24 lg:py-32">
          <div className="mb-10 flex items-baseline justify-between">
            <span className="mono text-[var(--ink-3)]">— The cover story</span>
            <span className="mono text-[var(--ink-4)]">Issue 047 / May 2026</span>
          </div>
          <div className="hero-grid grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-stretch gap-14">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Photo
                src={photos[featured.photo]}
                alt={featured.title}
                label={featured.photoLabel}
                fillContainer
                sizes="(max-width: 1080px) 100vw, 56vw"
              />
              <div className="absolute left-[18px] top-[18px] flex gap-1.5">
                <span className="tag solid">Cover</span>
                <span className="tag border-transparent bg-[rgba(245,242,236,0.92)]">
                  Stay · Malaysia
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-between pt-2">
              <div>
                <div className="mono mb-[18px] text-[var(--accent-deep)]">
                  ★ ★ ★ ★ ☆ &nbsp; — &nbsp; 4.2 / 5 &nbsp; — &nbsp; 12 min read
                </div>
                <h2 className="serif m-0 mb-[22px] text-[clamp(40px,5vw,68px)] font-normal leading-none tracking-[-0.02em]">
                  A week of slow mornings at the Marriott Perhentian Island.
                </h2>
                <p className="m-0 mb-7 max-w-[520px] text-lg leading-[1.55] text-[var(--ink-2)]">
                  {featured.dek}
                </p>
                <div className="mono mb-7 tracking-[0.08em] text-[var(--ink-3)]">
                  March 2026 &nbsp;·&nbsp; Perhentian Besar, Malaysia
                </div>
                <Link href="/journal/marriott-perhentian" className="btn solid">
                  Read the review
                  <ArrowRight size={14} strokeWidth={1.6} />
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-[18px] border-t border-[var(--rule)] pt-6">
                <Stat label="Nights stayed" value="7" />
                <Stat label="Verdict" value="Send a friend" />
                <Stat label="Best for" value="Slow couples" />
                <Stat label="Avoid in" value="Nov — Feb" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--rule)]">
        <div className="container py-24 lg:py-32">
          <SectionHead kicker="Browse" title="Five ways in." />
          <div className="cat-grid">
            {categories.map((category, index) => (
              <Link key={category.id} href={`/${category.id}`} className="cat-tile flex flex-col gap-3.5">
                <div className="flex justify-between">
                  <span className="mono text-[var(--ink-3)]">0{index + 1}</span>
                  <span className="mono text-[var(--ink-3)]">{category.count} entries</span>
                </div>
                <h3 className="serif m-0 mt-auto text-[34px] font-normal leading-none tracking-[-0.01em]">
                  {category.label}
                </h3>
                <p className="m-0 text-[13px] leading-normal text-[var(--ink-2)]">{category.blurb}</p>
                <div className="mt-1.5 inline-flex items-center gap-2 text-[var(--ink)]">
                  <span className="mono">Browse</span>
                  <ArrowRight size={12} strokeWidth={1.6} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--rule)]">
        <div className="container py-24 lg:py-32">
          <SectionHead kicker="The latest" title="Recently filed." action="See all" href="/stays" />
          <div className="grid gap-10 lg:grid-cols-3">
            {latest.slice(0, 3).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--rule)]">
        <div className="container py-24 lg:py-32">
          <SectionHead kicker="Field map" title="By place." />
          <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
            <div
              className="relative aspect-[16/11] overflow-hidden border border-[var(--rule)] bg-[var(--paper-2)]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent 0, transparent 39px, rgba(23,20,16,0.05) 39px, rgba(23,20,16,0.05) 40px), repeating-linear-gradient(90deg, transparent 0, transparent 39px, rgba(23,20,16,0.05) 39px, rgba(23,20,16,0.05) 40px)",
              }}
            >
              <svg
                viewBox="0 0 800 550"
                className="absolute inset-0 size-full"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <g fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.55">
                  <path d="M80 180 Q120 140 180 150 Q220 130 260 170 Q280 220 240 240 Q200 250 160 230 Q120 240 90 220 Z" />
                  <path d="M180 290 Q210 280 240 320 Q250 380 230 430 Q200 460 180 440 Q170 380 175 340 Z" />
                  <path d="M340 160 Q380 140 420 160 Q450 200 430 230 Q400 240 370 220 Q345 200 340 180 Z" />
                  <path d="M450 200 Q500 180 560 210 Q600 240 580 280 Q540 290 500 270 Q470 240 450 220 Z" />
                  <path d="M620 240 Q660 230 700 260 Q720 300 690 320 Q650 320 620 300 Z" />
                  <path d="M580 380 Q620 370 660 400 Q670 430 640 440 Q610 430 590 410 Z" />
                  <path d="M380 290 Q420 280 460 310 Q470 350 440 360 Q400 350 380 330 Z" />
                </g>
                {pins.map((pin) => (
                  <g key={pin.label}>
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r="14"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="1"
                      opacity="0.4"
                    />
                    <circle cx={pin.x} cy={pin.y} r="4" fill="var(--accent)" />
                    <text
                      x={pin.x + 12}
                      y={pin.y + 4}
                      fontFamily="var(--f-mono)"
                      fontSize="10"
                      fill="var(--ink)"
                      letterSpacing="0.5"
                    >
                      {pin.label.toUpperCase()}
                    </text>
                  </g>
                ))}
              </svg>
              <div className="absolute left-4 top-4 flex gap-2">
                <span className="tag bg-[var(--paper)]">○ 38 places</span>
                <span className="tag bg-[var(--paper)]">○ 14 countries</span>
              </div>
              <div className="mono absolute bottom-4 right-4">— drawn from memory, mostly accurate</div>
            </div>
            <div>
              {destinations.map((destination, index) => (
                <Link
                  key={destination.name}
                  href="/places"
                  className="grid grid-cols-[44px_1fr_auto_auto] items-center gap-4 border-t border-[var(--rule)] py-3.5 transition-[padding] hover:pl-2"
                >
                  <span className="mono text-[var(--ink-3)]">0{index + 1}</span>
                  <div>
                    <div className="serif text-[22px] leading-[1.1] tracking-[-0.005em]">
                      {destination.name}
                    </div>
                    <div className="mono mt-1 text-[var(--ink-3)]">{destination.country}</div>
                  </div>
                  <span className="mono text-[var(--ink-3)]">{destination.count} entries</span>
                  <ArrowRight size={13} strokeWidth={1.6} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--rule)] bg-[var(--paper-2)]">
        <div className="container py-28 lg:py-36">
          <div className="mx-auto max-w-[880px] text-center">
            <div className="mono mb-6 text-[var(--ink-3)]">— Newsletter</div>
            <h3 className="serif m-0 mb-7 text-[clamp(28px,3.4vw,44px)] font-normal italic leading-[1.15] tracking-[-0.01em]">
              A few times a year, when I have something worth saying.
            </h3>
            <p className="mx-auto mb-7 max-w-[620px] text-base leading-[1.65] text-[var(--ink-2)]">
              Newsletter — no schedule, no tracking, no fluff. Just a note when there is a place,
              meal, or useful mistake worth passing on.
            </p>
            <form className="mx-auto flex max-w-[520px] justify-center">
              <input
                type="email"
                placeholder="your@email.com"
                className="min-w-0 flex-1 border border-r-0 border-[var(--ink)] bg-transparent px-4 py-3 font-mono text-[11px] uppercase tracking-[0.08em] outline-none"
              />
              <button className="btn">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function Photo({
  src,
  alt,
  label,
  className = "",
  priority = false,
  fillContainer = false,
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
  fillContainer?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`photo-grain ${fillContainer ? "absolute inset-0" : className}`}>
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mono mb-1 text-[var(--ink-3)]">{label}</div>
      <div className="serif text-lg tracking-[-0.005em]">{value}</div>
    </div>
  );
}

function SectionHead({
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
    <div className="mb-12 flex items-end justify-between gap-6">
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

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="review-card flex cursor-pointer flex-col gap-4">
      <Link href={`/journal/${review.slug}`} className="contents">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Photo
            src={photos[review.photo]}
            alt={review.title}
            fillContainer
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className="absolute left-3 top-3 flex gap-1.5">
            <span className="tag solid">
              {review.category === "tips" ? "Tip" : review.category.slice(0, -1)}
            </span>
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
