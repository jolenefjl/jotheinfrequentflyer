export const editorialPhotos = {
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

export type EditorialCategory = "stays" | "food" | "experiences" | "kids" | "tips";

export type EditorialReview = {
  id: string;
  slug: string;
  category: EditorialCategory;
  kicker: string;
  title: string;
  dek: string;
  date: string;
  readTime: string;
  location: string;
  photo: keyof typeof editorialPhotos;
  imageUrl?: string;
  photoLabel: string;
  rating: number | null;
  featured?: boolean;
};

export const editorialReviews: EditorialReview[] = [
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

export const editorialCategoryMeta = {
  stays: {
    eyebrow: "Section 01",
    title: "Stays.",
    sub: "Hotels, inns, rentals — anywhere I've slept and have an opinion about. Small inns, big resorts, the occasional Airbnb. Honest takes only.",
    count: 47,
    blurb: "Hotels, inns, rentals — anywhere I've slept and have an opinion about.",
    tags: ["Resort", "City", "Boutique", "Rural"],
  },
  food: {
    eyebrow: "Section 02",
    title: "Food.",
    sub: "Counter seats, neighborhood spots, the one dish that justified the detour. Reservations not always required, opinions always strong.",
    count: 84,
    blurb: "Counter seats, neighborhood spots, the one dish worth the detour.",
    tags: ["Counters", "Markets", "Restaurants", "Dishes"],
  },
  experiences: {
    eyebrow: "Section 03",
    title: "Experiences.",
    sub: "The walks, treks, museums, and mornings that turned out to be the part of the trip I remember a year later.",
    count: 38,
    blurb: "Walks, treks, classes, museums — the kind of days you remember.",
    tags: ["Walks", "Museums", "Tours", "Outdoors"],
  },
  kids: {
    eyebrow: "Section 04",
    title: "Kids.",
    sub: "Traveling with small, opinionated humans. Field reports — what worked, what didn't, and what I'd skip if I had a chance to do it again.",
    count: 14,
    blurb: "Travel with small humans: what worked, what didn't, what I'd skip.",
    tags: ["Toddler", "City", "Beach", "Low-stress"],
  },
  tips: {
    eyebrow: "Section 05",
    title: "Top Tips.",
    sub: "Hard-won, opinionated, sometimes contrarian advice for specific cities. Skip the listicle — read someone's notes.",
    count: 22,
    blurb: "Hard-won, opinionated, occasionally contrarian advice by city.",
    tags: ["First time", "Money", "Transport", "What to skip"],
  },
} satisfies Record<EditorialCategory, {
  eyebrow: string;
  title: string;
  sub: string;
  count: number;
  blurb: string;
  tags: string[];
}>;

export function reviewsForCategory(category: EditorialCategory) {
  return editorialReviews.filter((review) => review.category === category);
}

export function reviewHref(review: { category: EditorialCategory; slug: string }) {
  return review.category === "stays" ? `/stays/${review.slug}` : `/journal/${review.slug}`;
}
