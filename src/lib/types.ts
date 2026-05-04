export type Destination = {
  _id: string;
  city: string;
  country: string;
  slug: string;
  joTake: string;
  latitude: number;
  longitude: number;
  heroImage?: string;
  contentCount?: string;
  updatedAt?: string;
};

export type ScoreItem = {
  label: string;
  description: string;
  value: number;
};

export type StayReview = {
  _id: string;
  title: string;
  slug: string;
  destination: Destination;
  dateVisited: string;
  datePublished: string;
  heroImage?: string;
  priceRange: "budget" | "mid" | "luxury";
  bestFor: string[];
  wouldJoReturn: "yes" | "no" | "maybe";
  oneLineVerdict: string;
  affiliateUrl?: string;
  scores: ScoreItem[];
  bodyPreview: string[];
  good: string[];
  bad: string[];
};

export type LatestItem = {
  type: string;
  title: string;
  destination: string;
  href: string;
  date: string;
};
