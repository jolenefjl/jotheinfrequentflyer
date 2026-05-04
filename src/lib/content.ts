import {
  destinations as mockDestinations,
  getDestinationBySlug as getMockDestinationBySlug,
  getStayBySlug as getMockStayBySlug,
  latestItems as mockLatestItems,
  stayReviews as mockStayReviews,
  stayScoreCriteria,
} from "./mock-content";
import { sanityQuery } from "./sanity";
import type { Destination, LatestItem, StayReview } from "./types";

const destinationFields = `
  _id,
  city,
  country,
  "slug": slug.current,
  joTake,
  latitude,
  longitude,
  "heroImage": heroImage.asset->url,
  _updatedAt
`;

export async function getDestinations(): Promise<Destination[]> {
  const data = await sanityQuery<Destination[]>(
    `*[_type == "destination"] | order(_updatedAt desc) { ${destinationFields} }`,
  );

  return data?.length ? data : mockDestinations;
}

export async function getDestinationBySlug(country: string, city: string) {
  const slug = `${country}/${city}`;
  const data = await sanityQuery<Destination>(
    `*[_type == "destination" && slug.current == $slug][0] { ${destinationFields} }`,
    { slug },
  );

  return data || getMockDestinationBySlug(country, city);
}

function normalizeStayReview(review: Record<string, unknown>): StayReview {
  const scores = [
    Number(review.scoreValue || 0),
    Number(review.scoreBreakfast || 0),
    Number(review.scoreGramworthy || 0),
    Number(review.scoreHype || 0),
    Number(review.scoreWelcome || 0),
    Number(review.scoreWorthIt || 0),
  ].map((value, index) => ({
    ...stayScoreCriteria[index],
    value,
  }));

  return {
    _id: String(review._id),
    title: String(review.title),
    slug: String(review.slug),
    destination: review.destination as Destination,
    dateVisited: String(review.dateVisited || ""),
    datePublished: String(review.datePublished || ""),
    heroImage: String(review.heroImage || ""),
    priceRange: (review.priceRange as StayReview["priceRange"]) || "mid",
    bestFor: (review.bestFor as string[]) || [],
    wouldJoReturn: (review.wouldJoReturn as StayReview["wouldJoReturn"]) || "maybe",
    oneLineVerdict: String(review.oneLineVerdict || ""),
    affiliateUrl: String(review.affiliateUrl || ""),
    scores,
    bodyPreview: [
      "This review is now coming from Sanity. Add rich body rendering next once Jo starts drafting the full article.",
    ],
    good: [],
    bad: [],
  };
}

export async function getStayReviews(): Promise<StayReview[]> {
  const data = await sanityQuery<Record<string, unknown>[]>(
    `*[_type == "stayReview"] | order(datePublished desc) {
      _id,
      title,
      "slug": slug.current,
      dateVisited,
      datePublished,
      "heroImage": heroImage.asset->url,
      priceRange,
      bestFor,
      wouldJoReturn,
      oneLineVerdict,
      affiliateUrl,
      scoreValue,
      scoreBreakfast,
      scoreGramworthy,
      scoreHype,
      scoreWelcome,
      scoreWorthIt,
      destination->{ ${destinationFields} }
    }`,
  );

  return data?.length ? data.map(normalizeStayReview) : mockStayReviews;
}

export async function getStayBySlug(slug: string) {
  const data = await sanityQuery<Record<string, unknown>>(
    `*[_type == "stayReview" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      dateVisited,
      datePublished,
      "heroImage": heroImage.asset->url,
      priceRange,
      bestFor,
      wouldJoReturn,
      oneLineVerdict,
      affiliateUrl,
      scoreValue,
      scoreBreakfast,
      scoreGramworthy,
      scoreHype,
      scoreWelcome,
      scoreWorthIt,
      destination->{ ${destinationFields} }
    }`,
    { slug },
  );

  return data ? normalizeStayReview(data) : getMockStayBySlug(slug);
}

export async function getLatestItems(): Promise<LatestItem[]> {
  const reviews = await getStayReviews();
  return reviews.length
    ? reviews.slice(0, 6).map((review) => ({
        type: "Stay",
        title: review.title,
        destination: `${review.destination.city}, ${review.destination.country}`,
        href: `/stays/${review.slug}`,
        date: review.datePublished || "Draft",
      }))
    : mockLatestItems;
}
