import { editorialReviews, type EditorialCategory, type EditorialReview } from "./editorial-data";
import { sanityQuery } from "./sanity";

type SanityMetadata = {
  metaTitle?: string;
  metaDescription?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCardDescription?: string;
  twitterCardImage?: string;
};

export type SanityEditorialEntry = EditorialReview & {
  body?: unknown[];
  metadata?: SanityMetadata;
  bestFor?: string[];
  verdict?: string;
  avoid?: string;
  nights?: number;
  duration?: string;
  dish?: string;
  author?: string;
};

export type SiteSettings = {
  siteTitle?: string;
  siteDescription?: string;
  primaryColor?: string;
  secondaryColor?: string;
  logo?: string;
  favicon?: string;
  defaultMetaDescription?: string;
  defaultOgImage?: string;
  twitterHandle?: string;
  instagramHandle?: string;
};

export type NewsletterSettings = {
  newsletterTitle?: string;
  description?: string;
  subscribeButtonText?: string;
  emailPlaceholderText?: string;
};

const categoryByType: Record<string, EditorialCategory> = {
  blogPost: "tips",
  stayReview: "stays",
  foodEntry: "food",
  experience: "experiences",
  kidsContent: "kids",
  topTip: "tips",
};

const fallbackPhotoByCategory: Record<EditorialCategory, EditorialReview["photo"]> = {
  stays: "ocean",
  food: "market",
  experiences: "moss",
  kids: "sand",
  tips: "rose",
};

const entriesQuery = `
*[_type in ["blogPost", "stayReview", "foodEntry", "experience", "kidsContent", "topTip"]] | order(coalesce(publishedDate, _createdAt) desc) {
  _id,
  _type,
  title,
  "slug": slug.current,
  excerpt,
  category,
  "imageUrl": coalesce(coverImage.asset->url, image.asset->url),
  "imageAlt": coalesce(coverImage.alt, image.alt),
  "imageCaption": coalesce(coverImage.caption, image.caption),
  readingTime,
  rating,
  bestFor,
  verdict,
  avoid,
  author,
  publishedDate,
  location,
  nights,
  duration,
  dish,
  body[]{
    ...,
    _type == "imageLayout" => {
      ...,
      images[]{
        ...,
        "url": image.asset->url
      }
    }
  },
  metadata{
    metaTitle,
    metaDescription,
    ogDescription,
    "ogImage": ogImage.asset->url,
    twitterCardDescription,
    "twitterCardImage": twitterCardImage.asset->url
  }
}
`;

function normalizeEntry(entry: Record<string, unknown>): SanityEditorialEntry | null {
  const type = String(entry._type || "");
  const rawCategory = String(entry.category || "");
  const category = (rawCategory || categoryByType[type]) as EditorialCategory;
  const title = String(entry.title || "");
  const slug = String(entry.slug || "");

  if (!title || !slug || !category) {
    return null;
  }

  const imageUrl = typeof entry.imageUrl === "string" ? entry.imageUrl : undefined;
  const location = typeof entry.location === "string" ? entry.location : "";

  return {
    id: String(entry._id || slug),
    slug,
    category,
    kicker: `${category === "tips" ? "Top tips" : category.slice(0, -1)}${location ? ` - ${location}` : ""}`,
    title,
    dek: String(entry.excerpt || entry.verdict || "Jo's notes are being drafted in Sanity."),
    date: String(entry.publishedDate || ""),
    readTime: String(entry.readingTime || "5 min"),
    location,
    photo: fallbackPhotoByCategory[category],
    imageUrl,
    photoLabel: String(entry.imageCaption || entry.imageAlt || location || title),
    rating: typeof entry.rating === "number" ? entry.rating : null,
    bestFor: Array.isArray(entry.bestFor) ? (entry.bestFor as string[]) : undefined,
    verdict: typeof entry.verdict === "string" ? entry.verdict : undefined,
    avoid: typeof entry.avoid === "string" ? entry.avoid : undefined,
    nights: typeof entry.nights === "number" ? entry.nights : undefined,
    duration: typeof entry.duration === "string" ? entry.duration : undefined,
    dish: typeof entry.dish === "string" ? entry.dish : undefined,
    author: typeof entry.author === "string" ? entry.author : undefined,
    body: Array.isArray(entry.body) ? entry.body : undefined,
    metadata: typeof entry.metadata === "object" && entry.metadata ? (entry.metadata as SanityMetadata) : undefined,
  };
}

export async function getEditorialEntries(options?: { fallback?: boolean }): Promise<SanityEditorialEntry[]> {
  const data = await sanityQuery<Record<string, unknown>[]>(entriesQuery);
  const entries = data?.map(normalizeEntry).filter(Boolean) as SanityEditorialEntry[] | undefined;

  if (entries?.length) {
    return entries;
  }

  return options?.fallback === false ? [] : (editorialReviews as SanityEditorialEntry[]);
}

export async function getEditorialEntriesByCategory(category: EditorialCategory): Promise<SanityEditorialEntry[]> {
  const entries = await getEditorialEntries();
  return entries.filter((entry) => entry.category === category);
}

export async function getEditorialEntryBySlug(slug: string): Promise<SanityEditorialEntry | undefined> {
  const entries = await getEditorialEntries();
  return entries.find((entry) => entry.slug === slug);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityQuery<SiteSettings & { favicon?: string; logo?: string; defaultOgImage?: string }>(`
    {
      "settings": *[_type == "siteSettings"][0]{
        siteTitle,
        siteDescription,
        primaryColor,
        secondaryColor,
        "logo": logo.asset->url,
        "favicon": favicon.asset->url
      },
      "social": *[_type == "socialSharingSettings"][0]{
        defaultMetaDescription,
        "defaultOgImage": defaultOgImage.asset->url,
        twitterHandle,
        instagramHandle
      }
    }
  `);

  const wrapped = data as unknown as { settings?: SiteSettings; social?: SiteSettings } | null;
  return {
    siteTitle: "Jo the Infrequent Flyer",
    siteDescription: "Honest, first-hand travel reviews for people who do not travel often enough to waste a trip.",
    ...wrapped?.settings,
    ...wrapped?.social,
  };
}

export async function getNewsletterSettings(): Promise<NewsletterSettings> {
  const data = await sanityQuery<NewsletterSettings>(`
    *[_type == "newsletterSettings"][0]{
      newsletterTitle,
      description,
      subscribeButtonText,
      emailPlaceholderText
    }
  `);

  return {
    newsletterTitle: "A few times a year, when I have something worth saying.",
    description: "Newsletter - no schedule, no tracking, no fluff.",
    subscribeButtonText: "Subscribe",
    emailPlaceholderText: "your@email.com",
    ...data,
  };
}
