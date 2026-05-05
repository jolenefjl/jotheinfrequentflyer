import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-05-04" });

const photos = {
  ocean: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85",
  market: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85",
  moss: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85",
  rose: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=1200&q=85",
  terracotta: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=1200&q=85",
  jungle: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85",
  sand: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=85",
};

const entries = [
  {
    id: "marriott-pulau-perhentian",
    type: "stayReview",
    title: "A week of slow mornings at the Marriott Perhentian Island",
    slug: "marriott-pulau-perhentian",
    excerpt:
      "Malaysia's newest castaway-style resort opened to a wave of expectation. After seven days, two boats, and an awful lot of nasi lemak, here's what it actually feels like to stay there.",
    image: "ocean",
    location: "Perhentian Besar, Malaysia",
    readingTime: "12 min",
    rating: 4.2,
    publishedDate: "2026-03-01",
    nights: 7,
    websiteUrl: "https://www.marriott.com/",
    price: "$$$$ - from MYR 1,650 / night",
    goodFor: "Couples, divers, slow-pace travelers",
    bestTime: "April - early October",
    loved: [
      "Reef quite literally fifteen feet from your villa",
      "Genuinely warm staff who learn your name on day one",
      "Outdoor bathrooms designed by someone who actually showers outdoors",
      "The breakfast nasi lemak is reason enough to stay",
    ],
    lessSo: [
      "Wi-Fi is... atmospheric, let's say",
      "Boat transfer logistics need a rethink",
      "Spa menu is short and prices feel KL-not-island",
      "No shade on the main pool deck until 4pm",
    ],
    disclosure:
      "Stay paid for in full. No comped nights, no press rate, no partnership. Infrequent Flyer takes no money from any place it covers.",
    heroCaption: "Fig. 01 - the view from villa 207 at first light. Coffee not pictured. Mosquito repellent applied.",
    stayScores: {
      walletCry: 3.8,
      breakfastTest: 3.6,
      gramWorthy: 4.7,
      welcomeFactor: 3.4,
      worthDaysOff: 4.0,
    },
    verdict: "Send a friend",
    bestFor: ["Slow couples", "Beach resets", "One proper trip a year"],
    avoid: "November to February",
  },
  {
    id: "kafe-koba",
    type: "foodEntry",
    title: "The unmarked masa counter in Roma that ruined other tortillas for me",
    slug: "kafe-koba",
    excerpt: "Eight stools, one griddle, and a heirloom-corn tasting that costs less than your last airport sandwich.",
    image: "market",
    location: "Colonia Roma Norte, CDMX",
    readingTime: "6 min",
    rating: 4.7,
    publishedDate: "2026-02-01",
    dish: "Blue-corn tetela",
    verdict: "Worth walking twenty minutes for",
    bestFor: ["Counter seats", "Solo lunches", "Corn obsessives"],
  },
  {
    id: "naoshima-walk",
    type: "experience",
    title: "Walking Naoshima from north to south, slowly, in the rain",
    slug: "naoshima-walk",
    excerpt: "What a quiet, soggy afternoon on Japan's art island taught me about pacing a trip.",
    image: "moss",
    location: "Naoshima, Kagawa",
    readingTime: "9 min",
    rating: 4.5,
    publishedDate: "2026-01-10",
    duration: "Half day",
    verdict: "Leave room for the slow parts",
    bestFor: ["Art islands", "Rainy walks", "Slow itineraries"],
  },
  {
    id: "lisbon-tips",
    type: "topTip",
    title: "Twelve things I'd tell a friend before their first week in Lisbon",
    slug: "lisbon-tips",
    excerpt: "From which trams to skip to the bakery you should walk twenty minutes for.",
    image: "rose",
    location: "Lisbon, Portugal",
    readingTime: "7 min",
    publishedDate: "2026-01-05",
    verdict: "Plan less, walk more, skip the obvious tram queue",
  },
  {
    id: "casa-bosques",
    type: "stayReview",
    title: "Casa Bosques: thirteen rooms above an art bookstore in Mexico City",
    slug: "casa-bosques",
    excerpt: "A residential-feeling stay that gets the small things - light, books, coffee - almost embarrassingly right.",
    image: "terracotta",
    location: "CDMX, Mexico",
    readingTime: "8 min",
    rating: 4.6,
    publishedDate: "2025-12-01",
    nights: 3,
    websiteUrl: "https://www.casabosques.com/",
    price: "$$$ - varies by season",
    goodFor: "Design people, book lovers, Roma Norte wandering",
    bestTime: "November - April",
    loved: ["Quiet rooms above a bookstore", "Excellent coffee within arm's reach"],
    lessSo: ["Not a full-service hotel", "Limited public spaces"],
    disclosure: "Starter disclosure text. Replace with Jo's actual booking details.",
    heroCaption: "Fig. 01 - courtyard light doing most of the work.",
    stayScores: {
      walletCry: 4.3,
      breakfastTest: 4.1,
      gramWorthy: 4.8,
      welcomeFactor: 4.5,
      worthDaysOff: 4.6,
    },
    verdict: "Quietly excellent",
    bestFor: ["Design people", "Book lovers", "Roma Norte wandering"],
    avoid: "If you need full-service hotel energy",
  },
  {
    id: "aman-kyoto",
    type: "stayReview",
    title: "Aman Kyoto, in shoulder season, on a budget that absolutely couldn't afford it",
    slug: "aman-kyoto",
    excerpt: "Two nights, one anniversary, and a serious look at whether the legend lives up to the price.",
    image: "jungle",
    location: "Kyoto, Japan",
    readingTime: "11 min",
    rating: 4.8,
    publishedDate: "2025-11-01",
    nights: 2,
    websiteUrl: "https://www.aman.com/resorts/aman-kyoto",
    price: "$$$$$ - serious splurge territory",
    goodFor: "Anniversaries, garden people, one big splurge",
    bestTime: "Late autumn or early spring",
    loved: ["The garden setting is extraordinary", "Service feels deeply considered"],
    lessSo: ["The price will follow you home", "Remote if you want downtown Kyoto"],
    disclosure: "Starter disclosure text. Replace with Jo's actual booking details.",
    heroCaption: "Fig. 01 - expensive garden silence.",
    stayScores: {
      walletCry: 2.8,
      breakfastTest: 4.7,
      gramWorthy: 5,
      welcomeFactor: 4.8,
      worthDaysOff: 4.7,
    },
    verdict: "Painfully expensive, annoyingly memorable",
    bestFor: ["Anniversaries", "Garden people", "One big splurge"],
    avoid: "If the price will ruin the mood",
  },
  {
    id: "puglia-with-toddler",
    type: "kidsContent",
    title: "Two weeks in Puglia with a two-year-old and what actually worked",
    slug: "puglia-with-toddler",
    excerpt: "An honest field report on traveling slowly through southern Italy with a small, opinionated human in tow.",
    image: "sand",
    readingTime: "9 min",
    rating: 4.4,
    publishedDate: "2026-04-01",
    verdict: "Slow bases beat ambitious road trips",
    bestFor: ["Toddlers", "Family apartments", "Low-stress beach days"],
    avoid: "Moving hotels every two nights",
  },
] as const;

const destinations = [
  { id: "mexico-city", name: "Mexico City", country: "Mexico", entriesCount: 7, lat: 19.4326, lng: -99.1332 },
  { id: "tokyo", name: "Tokyo", country: "Japan", entriesCount: 11, lat: 35.6762, lng: 139.6503 },
  { id: "lisbon", name: "Lisbon", country: "Portugal", entriesCount: 5, lat: 38.7223, lng: -9.1393 },
  { id: "perhentian-islands", name: "Perhentian Islands", country: "Malaysia", entriesCount: 3, lat: 5.9096, lng: 102.7376 },
  { id: "mendoza", name: "Mendoza", country: "Argentina", entriesCount: 4, lat: -32.8895, lng: -68.8458 },
  { id: "kyoto", name: "Kyoto", country: "Japan", entriesCount: 6, lat: 35.0116, lng: 135.7681 },
  { id: "imlil", name: "Imlil", country: "Morocco", entriesCount: 2, lat: 31.1358, lng: -7.9194 },
  { id: "ibiza", name: "Ibiza", country: "Spain", entriesCount: 3, lat: 38.9067, lng: 1.4206 },
];

function slug(value: string) {
  return { _type: "slug", current: value };
}

function block(text: string, style = "normal") {
  return {
    _type: "block",
    _key: `b-${Math.random().toString(36).slice(2, 10)}`,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `s-${Math.random().toString(36).slice(2, 10)}`, text, marks: [] }],
  };
}

async function uploadImage(key: keyof typeof photos) {
  const existing = await client.fetch(`*[_type == "sanity.imageAsset" && originalFilename == $filename][0]`, {
    filename: `seed-${key}.jpg`,
  });
  if (existing?._id) return existing;

  const response = await fetch(photos[key]);
  if (!response.ok) throw new Error(`Failed to fetch image ${key}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  return client.assets.upload("image", buffer, {
    filename: `seed-${key}.jpg`,
    contentType: response.headers.get("content-type") || "image/jpeg",
  });
}

function image(asset: { _id: string }, alt: string, caption: string) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt,
    caption,
    credit: "Unsplash placeholder",
  };
}

async function main() {
  const assets: Record<string, { _id: string }> = {};
  for (const key of Object.keys(photos) as (keyof typeof photos)[]) {
    assets[key] = await uploadImage(key);
  }

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: "Jo the Infrequent Flyer",
    siteDescription: "Honest, first-hand travel reviews for people who do not travel often enough to waste a trip.",
    primaryColor: "#171410",
    secondaryColor: "#F5F2EC",
  });

  await client.createOrReplace({
    _id: "socialSharingSettings",
    _type: "socialSharingSettings",
    defaultMetaDescription: "Warm, honest travel reviews from a Malaysian-born mum in Norway who makes every trip count.",
    defaultOgImage: image(assets.ocean, "Clear blue water in the Perhentian Islands", "Perhentian Besar, Malaysia"),
    instagramHandle: "",
    twitterHandle: "",
  });

  await client.createOrReplace({
    _id: "newsletterSettings",
    _type: "newsletterSettings",
    newsletterTitle: "A few times a year, when I have something worth saying.",
    description: "Newsletter - no schedule, no tracking, no fluff. Just a note when there is a place, meal, or useful mistake worth passing on.",
    subscribeButtonText: "Subscribe",
    emailPlaceholderText: "your@email.com",
  });

  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    title: "Home Page",
    hero: {
      image: image(assets.ocean, "Tropical sea in the Perhentian Islands", "Perhentian Besar, Malaysia"),
      eyebrowLeft: "Est. 2024",
      eyebrowRight: "A travel review, slowly kept",
      headline: "The Infrequent Flyer.",
      intro:
        "Because I don't get to travel often enough, every single trip is precious. These are my notes on the places I've slept, the meals I've remembered, and the days that turned out to matter.",
      currentLabel: "Currently",
      currentValue: "Lisbon ->",
      photoCredit: "Cover photo / Perhentian Besar, Malaysia",
    },
    coverStory: {
      kicker: "The cover story",
      issueLabel: "Issue 047 / May 2026",
      entry: { _type: "reference", _ref: "seed-stayReview-marriott-pulau-perhentian" },
      badge: "Cover",
      secondaryBadge: "Stay · Malaysia",
      ratingLine: "4.2 / 5 - 12 min read",
      dateLine: "March 2026 · Perhentian Besar, Malaysia",
      buttonText: "Read the review",
      stats: [
        { label: "Nights stayed", value: "7" },
        { label: "Verdict", value: "Send a friend" },
        { label: "Best for", value: "Slow couples" },
        { label: "Avoid in", value: "Nov - Feb" },
      ],
    },
    browseSection: {
      kicker: "Browse",
      title: "Five ways in.",
      tiles: [
        { label: "Stays", href: "/stays", count: "47 entries", blurb: "Hotels, inns, rentals - anywhere I've slept and have an opinion about.", visible: true },
        { label: "Food", href: "/food", count: "84 entries", blurb: "Counter seats, neighborhood spots, the one dish worth the detour.", visible: true },
        { label: "Experiences", href: "/experiences", count: "38 entries", blurb: "Walks, treks, classes, museums - the kind of days you remember.", visible: true },
        { label: "Kids", href: "/kids", count: "14 entries", blurb: "Travel with small humans: what worked, what didn't, what I'd skip.", visible: true },
        { label: "City Guides", href: "/city-guides", count: "Coming soon", blurb: "First-person city files for eating, staying, wandering, and skipping wisely.", visible: true },
      ],
    },
    latestSection: {
      kicker: "The latest",
      title: "Recently filed.",
      actionText: "See all",
      actionHref: "/stays",
      entries: [
        { _type: "reference", _ref: "seed-kidsContent-puglia-with-toddler" },
        { _type: "reference", _ref: "seed-foodEntry-kafe-koba" },
        { _type: "reference", _ref: "seed-experience-naoshima-walk" },
      ],
    },
    placeSection: {
      kicker: "Field map",
      title: "By place.",
      mapLabelLeft: "○ 38 places",
      mapLabelRight: "○ 14 countries",
      mapNote: "drawn from memory, mostly accurate",
      places: destinations.map((destination) => ({
        _type: "reference",
        _ref: `destination-${destination.id}`,
      })),
    },
    newsletterSection: {
      kicker: "Newsletter",
    },
  });

  for (const destination of destinations) {
    await client.createOrReplace({
      _id: `destination-${destination.id}`,
      _type: "destination",
      name: destination.name,
      country: destination.country,
      slug: slug(destination.id),
      entriesCount: destination.entriesCount,
      coordinates: { _type: "geopoint", lat: destination.lat, lng: destination.lng },
      joTake: `Starter placeholder notes for ${destination.name}.`,
    });
  }

  for (const entry of entries) {
    const entryLocation = "location" in entry ? entry.location : entry.title;
    const doc: { _id: string; _type: string; [key: string]: unknown } = {
      _id: `seed-${entry.type}-${entry.id}`,
      _type: entry.type,
      title: entry.title,
      slug: slug(entry.slug),
      body: [
        block("First impression", "h2"),
        block(entry.excerpt),
        block("This is starter copy seeded into Sanity so Jo can edit the article directly in Studio. Replace it with the real notes, opinions, and useful details when ready."),
        block("Jo's verdict", "h2"),
        block(entry.verdict || "A useful starter verdict to edit."),
      ],
      image: image(assets[entry.image], entry.title, entryLocation),
      coverImage: image(assets[entry.image], entry.title, entryLocation),
      excerpt: entry.excerpt,
      readingTime: entry.readingTime,
      rating: "rating" in entry ? entry.rating : undefined,
      bestFor: "bestFor" in entry ? entry.bestFor : undefined,
      verdict: entry.verdict,
      avoid: "avoid" in entry ? entry.avoid : undefined,
      author: "Jo",
      publishedDate: entry.publishedDate,
      location: "location" in entry ? entry.location : undefined,
      nights: "nights" in entry ? entry.nights : undefined,
      websiteUrl: "websiteUrl" in entry ? entry.websiteUrl : undefined,
      price: "price" in entry ? entry.price : undefined,
      goodFor: "goodFor" in entry ? entry.goodFor : undefined,
      bestTime: "bestTime" in entry ? entry.bestTime : undefined,
      loved: "loved" in entry ? entry.loved : undefined,
      lessSo: "lessSo" in entry ? entry.lessSo : undefined,
      disclosure: "disclosure" in entry ? entry.disclosure : undefined,
      heroCaption: "heroCaption" in entry ? entry.heroCaption : undefined,
      stayScores: "stayScores" in entry ? entry.stayScores : undefined,
      duration: "duration" in entry ? entry.duration : undefined,
      dish: "dish" in entry ? entry.dish : undefined,
      metadata: {
        _type: "pageMetadata",
        metaTitle: entry.title,
        metaDescription: entry.excerpt,
        ogDescription: entry.excerpt,
      },
    };

    await client.createOrReplace(doc);
  }

  console.log(`Seeded ${entries.length} entries, ${destinations.length} destinations, and 3 settings documents.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
