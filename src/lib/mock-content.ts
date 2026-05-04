import type { Destination, LatestItem, ScoreItem, StayReview } from "./types";

export const stayScoreCriteria: Omit<ScoreItem, "value">[] = [
  {
    label: "Would I Pay This Price Again?",
    description: "Honest value-for-money assessment",
  },
  {
    label: "The Breakfast Test",
    description: "Quality and experience of the hotel breakfast",
  },
  {
    label: "Gram-Worthy?",
    description: "Is it as photogenic as its own website photos suggest?",
  },
  {
    label: "Hype vs Reality",
    description: "Did it live up to its reputation and marketing?",
  },
  {
    label: "The Welcome Factor",
    description: "Did staff make Jo feel like a guest, not a room number?",
  },
  {
    label: "Worth My Precious Days Off",
    description: "The ultimate infrequent flyer question",
  },
];

export const destinations: Destination[] = [
  {
    _id: "pulau-perhentian",
    city: "Pulau Perhentian",
    country: "Malaysia",
    slug: "malaysia/pulau-perhentian",
    joTake:
      "The kind of island that makes you forgive sand in every bag for the next three months.",
    latitude: 5.9167,
    longitude: 102.7333,
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
    contentCount: "1 Stay · 1 Food · 1 Experience",
    updatedAt: "2026-04-22",
  },
  {
    _id: "shanghai",
    city: "Shanghai",
    country: "China",
    slug: "china/shanghai",
    joTake:
      "A big-city fever dream of dumplings, neon, old lanes, and one more coffee than planned.",
    latitude: 31.2304,
    longitude: 121.4737,
    heroImage:
      "https://images.unsplash.com/photo-1548919973-5cef591cdbc9?auto=format&fit=crop&w=1600&q=85",
    contentCount: "1 Stay · 2 Food",
    updatedAt: "2026-04-12",
  },
  {
    _id: "wuzhen",
    city: "Wuzhen",
    country: "China",
    slug: "china/wuzhen",
    joTake:
      "Ridiculously pretty, slightly theatrical, and still absolutely worth the slow wander.",
    latitude: 30.7467,
    longitude: 120.485,
    heroImage:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=85",
    contentCount: "1 Stay · 1 Experience",
    updatedAt: "2026-04-08",
  },
];

export const stayReviews: StayReview[] = [
  {
    _id: "perhentian-island-stay",
    title: "A Beach Stay in Pulau Perhentian: Worth the Salt, Sand and Sunscreen?",
    slug: "perhentian-island-stay",
    destination: destinations[0],
    dateVisited: "2026-04",
    datePublished: "2026-05-04",
    heroImage:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1600&q=85",
    priceRange: "mid",
    bestFor: ["Families", "Snorkellers", "Slow mornings"],
    wouldJoReturn: "maybe",
    oneLineVerdict:
      "Beautiful enough to make me forget the logistics, but not so perfect that I stopped noticing them.",
    affiliateUrl: "",
    scores: [
      { ...stayScoreCriteria[0], value: 4 },
      { ...stayScoreCriteria[1], value: 3 },
      { ...stayScoreCriteria[2], value: 5 },
      { ...stayScoreCriteria[3], value: 4 },
      { ...stayScoreCriteria[4], value: 4 },
      { ...stayScoreCriteria[5], value: 4 },
    ],
    bodyPreview: [
      "I do not get unlimited holidays, so I am deeply suspicious of any place that asks me to spend half a day just getting there. Pulau Perhentian gets away with it because the water is offensively beautiful.",
      "This is placeholder copy for now, but the rhythm is the one we will keep: personal, specific, practical, and willing to say when something was a bit much.",
    ],
    good: [
      "The beach did the heavy lifting without needing a filter.",
      "Easy snorkelling days, which matters when travelling with limited energy and actual responsibilities.",
      "The whole place had that barefoot, slightly chaotic island charm.",
    ],
    bad: [
      "Getting there is not nothing, especially if you are travelling with a child or luggage.",
      "Breakfast was fine, not a spiritual event.",
    ],
  },
];

export const latestItems: LatestItem[] = [
  {
    type: "Stay",
    title: stayReviews[0].title,
    destination: "Pulau Perhentian, Malaysia",
    href: `/stays/${stayReviews[0].slug}`,
    date: "May 2026",
  },
  {
    type: "Food",
    title: "Where I Would Eat First in Shanghai",
    destination: "Shanghai, China",
    href: "/food",
    date: "Coming soon",
  },
  {
    type: "Experience",
    title: "A Slow Day in Wuzhen",
    destination: "Wuzhen, China",
    href: "/experiences",
    date: "Coming soon",
  },
];

export function averageScore(scores: ScoreItem[]) {
  const total = scores.reduce((sum, score) => sum + score.value, 0);
  return Number((total / scores.length).toFixed(1));
}

export function getDestinationBySlug(country: string, city: string) {
  return destinations.find((destination) => destination.slug === `${country}/${city}`);
}

export function getStayBySlug(slug: string) {
  return stayReviews.find((review) => review.slug === slug);
}
