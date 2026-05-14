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
  websiteUrl?: string;
  stayScores?: StayScoreValues;
  price?: string;
  goodFor?: string;
  bestTime?: string;
  loved?: string[];
  lessSo?: string[];
  disclosure?: string;
  heroCaption?: string;
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

export type SiteLink = {
  label: string;
  href: string;
  visible?: boolean;
};

export type SiteChromeContent = {
  header: {
    issueLabel: string;
    volumeLabel: string;
    brandLineOne: string;
    brandLineTwo: string;
    navigation: SiteLink[];
  };
  footer: {
    newsletterKicker: string;
    newsletterTitle: string;
    newsletterDescription: string;
    newsletterVisible: boolean;
    emailPlaceholder: string;
    buttonText: string;
    columns: { title: string; links: SiteLink[] }[];
    bottomLeft: string;
    bottomRight: string;
  };
};

export type SitePageContent = {
  title: string;
  slug: string;
  eyebrow?: string;
  intro?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  body?: unknown[];
  cta?: {
    label?: string;
    href?: string;
  };
  metadata?: SanityMetadata;
};

export type SanityPlace = {
  id: string;
  slug: string;
  name: string;
  country: string;
  entriesCount: number;
  joTake?: string;
  lat?: number;
  lng?: number;
};

export type HomeTile = {
  label: string;
  href: string;
  count: string;
  blurb: string;
  visible?: boolean;
};

export type HomePageContent = {
  hero?: {
    visible?: boolean;
    imageUrl?: string;
    eyebrowLeft?: string;
    eyebrowRight?: string;
    headline?: string;
    intro?: string;
    currentLabel?: string;
    currentValue?: string;
    photoCredit?: string;
  };
  coverStory?: {
    visible?: boolean;
    kicker?: string;
    issueLabel?: string;
    entry?: SanityEditorialEntry;
    badge?: string;
    secondaryBadge?: string;
    ratingLine?: string;
    dateLine?: string;
    buttonText?: string;
    stats?: { label?: string; value?: string }[];
  };
  browseSection?: {
    visible?: boolean;
    kicker?: string;
    title?: string;
    tiles?: HomeTile[];
  };
  latestSection?: {
    visible?: boolean;
    kicker?: string;
    title?: string;
    actionText?: string;
    actionHref?: string;
    entries?: SanityEditorialEntry[];
  };
  placeSection?: {
    visible?: boolean;
    kicker?: string;
    title?: string;
    mapLabelLeft?: string;
    mapLabelRight?: string;
    mapNote?: string;
    places?: SanityPlace[];
  };
  newsletterSection?: {
    visible?: boolean;
    kicker?: string;
  };
};

const categoryByType: Record<string, EditorialCategory> = {
  blogPost: "tips",
  stayReview: "stays",
  foodEntry: "food",
  experience: "experiences",
  kidsContent: "kids",
  topTip: "tips",
  cityGuide: "tips",
};

const fallbackPhotoByCategory: Record<EditorialCategory, EditorialReview["photo"]> = {
  stays: "ocean",
  food: "market",
  experiences: "moss",
  kids: "sand",
  tips: "rose",
};

export type StayScoreKey =
  | "walletCry"
  | "breakfastTest"
  | "gramWorthy"
  | "welcomeFactor"
  | "worthDaysOff";

export type StayScoreValues = Partial<Record<StayScoreKey, number>>;

export const stayScoreCriteria: { key: StayScoreKey; label: string; subtitle: string }[] = [
  { key: "walletCry", label: "Did My Wallet Cry?", subtitle: "value for money" },
  { key: "breakfastTest", label: "The Breakfast Test", subtitle: "because a bad breakfast ruins everything" },
  { key: "gramWorthy", label: "Gram-Worthy?", subtitle: "is it as photogenic as the website promised" },
  { key: "welcomeFactor", label: "The Welcome Factor", subtitle: "did the service live up to expectations?" },
  {
    key: "worthDaysOff",
    label: "Worth My Precious Days Off",
    subtitle: "the ultimate infrequent traveller question",
  },
];

const labelByCategory: Record<EditorialCategory, string> = {
  stays: "Stay",
  food: "Food",
  experiences: "Experience",
  kids: "Kids",
  tips: "Top tips",
};

const entryTypes = `"blogPost", "stayReview", "foodEntry", "experience", "kidsContent", "topTip", "cityGuide"`;

const entryProjection = `
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
  websiteUrl,
  stayScores,
  price,
  goodFor,
  bestTime,
  loved,
  lessSo,
  disclosure,
  heroCaption,
  body[]{
    ...,
    _type == "imageLayout" => {
      ...,
      images[]{
        ...,
        "url": image.asset->url,
        "width": image.asset->metadata.dimensions.width,
        "height": image.asset->metadata.dimensions.height,
        "aspectRatio": image.asset->metadata.dimensions.aspectRatio
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
`;

const sitePageProjection = `
  title,
  "slug": slug.current,
  eyebrow,
  intro,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  "imageCaption": image.caption,
  body[]{
    ...,
    _type == "imageLayout" => {
      ...,
      images[]{
        ...,
        "url": image.asset->url,
        "width": image.asset->metadata.dimensions.width,
        "height": image.asset->metadata.dimensions.height,
        "aspectRatio": image.asset->metadata.dimensions.aspectRatio
      }
    }
  },
  cta,
  metadata{
    metaTitle,
    metaDescription,
    ogDescription,
    "ogImage": ogImage.asset->url,
    twitterCardDescription,
    "twitterCardImage": twitterCardImage.asset->url
  }
`;

const fallbackSiteChrome: SiteChromeContent = {
  header: {
    issueLabel: "No 047",
    volumeLabel: "Vol. III",
    brandLineOne: "Infrequent",
    brandLineTwo: "Flyer",
    navigation: [
      { label: "Home", href: "/" },
      { label: "Stays", href: "/stays" },
      { label: "Food", href: "/food" },
      { label: "Experiences", href: "/experiences" },
      { label: "Kids", href: "/kids" },
    ],
  },
  footer: {
    newsletterKicker: "The newsletter",
    newsletterTitle: "A note from somewhere, every other Sunday.",
    newsletterDescription:
      "One review, one tip, one thing I'm thinking about. No sponsorships, no scrolling carousels - just a letter.",
    newsletterVisible: true,
    emailPlaceholder: "your@email.com",
    buttonText: "Subscribe",
    columns: [
      {
        title: "Sections",
        links: [
          { label: "Stays", href: "/stays" },
          { label: "Food", href: "/food" },
          { label: "Experiences", href: "/experiences" },
          { label: "Kids", href: "/kids" },
          { label: "City Guides", href: "/city-guides" },
          { label: "Destinations", href: "/places" },
        ],
      },
      {
        title: "About",
        links: [
          { label: "Who's behind this", href: "/about" },
          { label: "How I review", href: "/how-i-review" },
          { label: "Press & partnerships", href: "/press-partnerships" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Elsewhere",
        links: [
          { label: "Instagram", href: "https://instagram.com/" },
          { label: "Substack", href: "https://substack.com/" },
          { label: "Are.na", href: "https://www.are.na/" },
          { label: "RSS feed", href: "/rss.xml" },
        ],
      },
    ],
    bottomLeft: "© 2026 Infrequent Flyer · Made slowly",
    bottomRight: "Issue 047 · May 4, 2026",
  },
};

function visibleLinks(links?: SiteLink[]) {
  return (links || []).filter((link) => link.visible !== false && link.label && link.href);
}

function averageStayScores(scores: unknown) {
  if (!scores || typeof scores !== "object") {
    return null;
  }

  const values = stayScoreCriteria
    .map((item) => (scores as StayScoreValues)[item.key])
    .filter((value): value is number => typeof value === "number");

  return values.length ? Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1)) : null;
}

const entriesQuery = `
*[_type in [${entryTypes}]] | order(coalesce(publishedDate, _createdAt) desc) {
  ${entryProjection}
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
  const stayScoreAverage = averageStayScores(entry.stayScores);

  return {
    id: String(entry._id || slug),
    slug,
    category,
    kicker: `${labelByCategory[category] || "Note"}${location ? ` - ${location}` : ""}`,
    title,
    dek: String(entry.excerpt || entry.verdict || "Jo's notes are being drafted in Sanity."),
    date: String(entry.publishedDate || ""),
    readTime: String(entry.readingTime || "5 min"),
    location,
    photo: fallbackPhotoByCategory[category],
    imageUrl,
    photoLabel: String(entry.imageCaption || entry.imageAlt || location || title),
    rating: stayScoreAverage ?? (typeof entry.rating === "number" ? entry.rating : null),
    bestFor: Array.isArray(entry.bestFor) ? (entry.bestFor as string[]) : undefined,
    verdict: typeof entry.verdict === "string" ? entry.verdict : undefined,
    avoid: typeof entry.avoid === "string" ? entry.avoid : undefined,
    nights: typeof entry.nights === "number" ? entry.nights : undefined,
    duration: typeof entry.duration === "string" ? entry.duration : undefined,
    dish: typeof entry.dish === "string" ? entry.dish : undefined,
    author: typeof entry.author === "string" ? entry.author : undefined,
    websiteUrl: typeof entry.websiteUrl === "string" ? entry.websiteUrl : undefined,
    stayScores:
      typeof entry.stayScores === "object" && entry.stayScores
        ? (entry.stayScores as StayScoreValues)
        : undefined,
    price: typeof entry.price === "string" ? entry.price : undefined,
    goodFor: typeof entry.goodFor === "string" ? entry.goodFor : undefined,
    bestTime: typeof entry.bestTime === "string" ? entry.bestTime : undefined,
    loved: Array.isArray(entry.loved) ? (entry.loved as string[]) : undefined,
    lessSo: Array.isArray(entry.lessSo) ? (entry.lessSo as string[]) : undefined,
    disclosure: typeof entry.disclosure === "string" ? entry.disclosure : undefined,
    heroCaption: typeof entry.heroCaption === "string" ? entry.heroCaption : undefined,
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

export async function getSiteChrome(): Promise<SiteChromeContent> {
  const data = await sanityQuery<SiteChromeContent>(`
    *[_type == "siteChrome"][0]{
      header{
        issueLabel,
        volumeLabel,
        brandLineOne,
        brandLineTwo,
        navigation
      },
      footer{
        newsletterKicker,
        newsletterTitle,
        newsletterDescription,
        newsletterVisible,
        emailPlaceholder,
        buttonText,
        columns,
        bottomLeft,
        bottomRight
      }
    }
  `);

  return {
    header: {
      ...fallbackSiteChrome.header,
      ...data?.header,
      navigation: visibleLinks(data?.header?.navigation).length
        ? visibleLinks(data?.header?.navigation)
        : fallbackSiteChrome.header.navigation,
    },
    footer: {
      ...fallbackSiteChrome.footer,
      ...data?.footer,
      columns: data?.footer?.columns?.length
        ? data.footer.columns
            .map((column) => ({
              title: column.title,
              links: visibleLinks(column.links),
            }))
            .filter((column) => column.title && column.links.length)
        : fallbackSiteChrome.footer.columns,
    },
  };
}

export async function getSitePageBySlug(slug: string): Promise<SitePageContent | null> {
  const data = await sanityQuery<SitePageContent>(
    `
      *[_type == "sitePage" && slug.current == $slug][0]{
        ${sitePageProjection}
      }
    `,
    { slug },
  );

  return data?.title && data?.slug ? data : null;
}

export async function getSitePages(): Promise<SitePageContent[]> {
  const data = await sanityQuery<SitePageContent[]>(`
    *[_type == "sitePage" && defined(slug.current)] | order(title asc){
      ${sitePageProjection}
    }
  `);

  return (data || []).filter((page) => page.title && page.slug);
}

export async function getSitePageSlugs(): Promise<string[]> {
  const data = await sanityQuery<string[]>(`*[_type == "sitePage" && defined(slug.current)].slug.current`);
  return data || [];
}

export async function getPlaces(options?: { fallback?: boolean }): Promise<SanityPlace[]> {
  const data = await sanityQuery<Record<string, unknown>[]>(`
    *[_type == "destination"] | order(name asc) {
      _id,
      name,
      country,
      "slug": slug.current,
      entriesCount,
      joTake,
      "lat": coordinates.lat,
      "lng": coordinates.lng
    }
  `);

  const places =
    data
      ?.map((place) => ({
        id: String(place._id || place.slug),
        slug: String(place.slug || ""),
        name: String(place.name || ""),
        country: String(place.country || ""),
        entriesCount: Number(place.entriesCount || 0),
        joTake: typeof place.joTake === "string" ? place.joTake : undefined,
        lat: typeof place.lat === "number" ? place.lat : undefined,
        lng: typeof place.lng === "number" ? place.lng : undefined,
      }))
      .filter((place) => place.slug && place.name) || [];

  if (places.length || options?.fallback === false) {
    return places;
  }

  return [
    { id: "mexico-city", slug: "mexico-city", name: "Mexico City", country: "Mexico", entriesCount: 7, joTake: "Counters, courtyards, and hotel mornings.", lat: 19.4326, lng: -99.1332 },
    { id: "tokyo", slug: "tokyo", name: "Tokyo", country: "Japan", entriesCount: 11, joTake: "Tiny meals, big systems, excellent convenience.", lat: 35.6762, lng: 139.6503 },
    { id: "lisbon", slug: "lisbon", name: "Lisbon", country: "Portugal", entriesCount: 5, joTake: "Hills, pastries, and a few things to skip.", lat: 38.7223, lng: -9.1393 },
    { id: "perhentian-islands", slug: "perhentian-islands", name: "Perhentian Islands", country: "Malaysia", entriesCount: 3, joTake: "Clear water, boat logistics, rare proper switching off.", lat: 5.9096, lng: 102.7376 },
    { id: "mendoza", slug: "mendoza", name: "Mendoza", country: "Argentina", entriesCount: 4, joTake: "Wine-country pacing and long lunches.", lat: -32.8895, lng: -68.8458 },
    { id: "kyoto", slug: "kyoto", name: "Kyoto", country: "Japan", entriesCount: 6, joTake: "Gardens, shoulder season, and one expensive lesson.", lat: 35.0116, lng: 135.7681 },
    { id: "imlil", slug: "imlil", name: "Imlil", country: "Morocco", entriesCount: 2, joTake: "Mountain air, tea, and slow paths.", lat: 31.1358, lng: -7.9194 },
    { id: "ibiza", slug: "ibiza", name: "Ibiza", country: "Spain", entriesCount: 3, joTake: "Quieter corners beyond the obvious noise.", lat: 38.9067, lng: 1.4206 },
  ];
}

export async function getPlaceBySlug(slug: string): Promise<SanityPlace | undefined> {
  const places = await getPlaces();
  return places.find((place) => place.slug === slug);
}

function normalizePlace(place: Record<string, unknown>): SanityPlace {
  return {
    id: String(place._id || place.slug),
    slug: String(place.slug || ""),
    name: String(place.name || ""),
    country: String(place.country || ""),
    entriesCount: Number(place.entriesCount || 0),
    joTake: typeof place.joTake === "string" ? place.joTake : undefined,
    lat: typeof place.lat === "number" ? place.lat : undefined,
    lng: typeof place.lng === "number" ? place.lng : undefined,
  };
}

export async function getHomePageContent(): Promise<HomePageContent | null> {
  const data = await sanityQuery<HomePageContent>(`
    *[_type == "homePage"][0]{
      hero{
        visible,
        "imageUrl": image.asset->url,
        eyebrowLeft,
        eyebrowRight,
        headline,
        intro,
        currentLabel,
        currentValue,
        photoCredit
      },
      coverStory{
        visible,
        kicker,
        issueLabel,
        entry->{${entryProjection}},
        badge,
        secondaryBadge,
        ratingLine,
        dateLine,
        buttonText,
        stats
      },
      browseSection,
      latestSection{
        visible,
        kicker,
        title,
        actionText,
        actionHref,
        entries[]->{${entryProjection}}
      },
      placeSection{
        visible,
        kicker,
        title,
        mapLabelLeft,
        mapLabelRight,
        mapNote,
        places[]->{
          _id,
          name,
          country,
          "slug": slug.current,
          entriesCount,
          joTake,
          "lat": coordinates.lat,
          "lng": coordinates.lng
        }
      },
      newsletterSection
    }
  `);

  if (!data) {
    return null;
  }

  if (data.coverStory?.entry) {
    data.coverStory.entry =
      normalizeEntry(data.coverStory.entry as unknown as Record<string, unknown>) ||
      data.coverStory.entry;
  }

  if (data.latestSection?.entries?.length) {
    data.latestSection.entries = data.latestSection.entries
      .map((entry) => normalizeEntry(entry as unknown as Record<string, unknown>))
      .filter(Boolean) as SanityEditorialEntry[];
  }

  if (data.placeSection?.places?.length) {
    data.placeSection.places = data.placeSection.places.map((place) =>
      normalizePlace(place as unknown as Record<string, unknown>),
    );
  }

  return data;
}

export async function hasVisibleCityGuides() {
  const count = await sanityQuery<number>(`count(*[_type == "cityGuide" && isPublishedToMenu == true])`);
  return Boolean(count && count > 0);
}
