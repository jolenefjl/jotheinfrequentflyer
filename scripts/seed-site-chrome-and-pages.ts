import { getCliClient } from "sanity/cli";
import { randomUUID } from "node:crypto";

const client = getCliClient({ apiVersion: "2026-05-04" });

function block(text: string, style = "normal") {
  return {
    _type: "block",
    _key: randomUUID(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: randomUUID(), text, marks: [] }],
  };
}

const pages = [
  {
    _id: "sitePage-about",
    title: "A Malaysian mum in Norway, making the annual leave count.",
    slug: "about",
    eyebrow: "Who's behind this",
    intro:
      "I have a full-time job, a family, and a finite number of days I can disappear somewhere with a suitcase. That is the whole point of this site.",
    body: [
      block("The point of view", "h2"),
      block(
        "I grew up with a Malaysian instinct for value, good food, and calling things as they are. If a place is lovely but overpriced, I will say so. If breakfast unexpectedly saves the whole stay, I will definitely say so.",
      ),
      block(
        "Jo the Infrequent Flyer is for travellers who are not trying to be everywhere all the time. They just want the trips they do take to feel genuinely worth it.",
      ),
      block(
        "The reviews here are slow, detailed, and personal because that is how I travel. I care about the transfer, the towels, the first coffee, the kid logistics, and whether I would send a real friend there with their own money.",
      ),
    ],
    cta: { label: "Start with the stay reviews", href: "/stays" },
  },
  {
    _id: "sitePage-how-i-review",
    title: "How I review, without pretending every trip is a perfect one.",
    slug: "how-i-review",
    eyebrow: "How I review",
    intro:
      "These reviews are opinionated, self-funded where noted, and written for people who need their limited holidays to work hard.",
    body: [
      block("What I pay attention to", "h2"),
      block(
        "I review the small things that decide whether a trip feels easy or expensive in all the wrong ways: arrival logistics, sleep, breakfast, service, location, child-friendliness when relevant, and whether the experience matches the promise.",
      ),
      block("The stay score", "h2"),
      block(
        "Stay reviews use five criteria: value for money, breakfast, photogenic reality, welcome and service, and whether the stay was worth precious days off. The overall score is an average, not a vibe pulled out of the air.",
      ),
      block("What I will disclose", "h2"),
      block(
        "If something is gifted, discounted, hosted, affiliated, or otherwise not paid in the usual way, it should be disclosed clearly in the review. The goal is useful honesty, not pretending nobody notices.",
      ),
    ],
    cta: { label: "Read the latest reviews", href: "/stays" },
  },
  {
    _id: "sitePage-press-partnerships",
    title: "Press, partnerships, and the rare yes.",
    slug: "press-partnerships",
    eyebrow: "Press & partnerships",
    intro:
      "Infrequent Flyer is small by design. That means partnerships need to be genuinely useful for readers, not just convenient content.",
    body: [
      block("What fits", "h2"),
      block(
        "Hotels, destinations, restaurants, and travel brands may be a fit when the offer is relevant to thoughtful, time-poor travellers who care about detail and honest recommendations.",
      ),
      block("What does not fit", "h2"),
      block(
        "Generic listicles, forced positivity, undisclosed freebies, high-volume content packages, or anything that asks Jo to recommend something she would not tell a friend about are not a fit.",
      ),
      block("Editorial independence", "h2"),
      block(
        "A partnership does not buy a good review. It buys consideration, time, and clear disclosure if the collaboration goes ahead.",
      ),
    ],
    cta: { label: "Get in touch", href: "/contact" },
  },
  {
    _id: "sitePage-contact",
    title: "Contact Jo.",
    slug: "contact",
    eyebrow: "Contact",
    intro: "For tips, questions, corrections, invitations, or a very good food recommendation, this is the place.",
    body: [
      block("General notes", "h2"),
      block(
        "For now, use this page as placeholder copy while Jo decides the best inbox, form, or social link to publish. Keep the bar high and the admin low.",
      ),
      block("What to include", "h2"),
      block(
        "If you are recommending a place, include the city, why it is worth Jo's limited days off, and whether you have been yourself. If you are pitching a partnership, include dates, expectations, and what is being offered.",
      ),
    ],
  },
];

async function main() {
  await client.createOrReplace({
    _id: "siteChrome",
    _type: "siteChrome",
    title: "Header & Footer",
    header: {
      issueLabel: "No 047",
      volumeLabel: "Vol. III",
      brandLineOne: "Infrequent",
      brandLineTwo: "Flyer",
      navigation: [
        { _key: "home", _type: "object", label: "Home", href: "/", visible: true },
        { _key: "stays", _type: "object", label: "Stays", href: "/stays", visible: true },
        { _key: "food", _type: "object", label: "Food", href: "/food", visible: true },
        { _key: "experiences", _type: "object", label: "Experiences", href: "/experiences", visible: true },
        { _key: "kids", _type: "object", label: "Kids", href: "/kids", visible: true },
        { _key: "city-guides", _type: "object", label: "City Guides", href: "/city-guides", visible: false },
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
          _key: "sections",
          _type: "object",
          title: "Sections",
          links: [
            { _key: "stays", _type: "object", label: "Stays", href: "/stays", visible: true },
            { _key: "food", _type: "object", label: "Food", href: "/food", visible: true },
            { _key: "experiences", _type: "object", label: "Experiences", href: "/experiences", visible: true },
            { _key: "kids", _type: "object", label: "Kids", href: "/kids", visible: true },
            { _key: "city-guides", _type: "object", label: "City Guides", href: "/city-guides", visible: false },
            { _key: "destinations", _type: "object", label: "Destinations", href: "/places", visible: true },
          ],
        },
        {
          _key: "about",
          _type: "object",
          title: "About",
          links: [
            { _key: "who", _type: "object", label: "Who's behind this", href: "/about", visible: true },
            { _key: "review", _type: "object", label: "How I review", href: "/how-i-review", visible: true },
            { _key: "press", _type: "object", label: "Press & partnerships", href: "/press-partnerships", visible: true },
            { _key: "contact", _type: "object", label: "Contact", href: "/contact", visible: true },
          ],
        },
        {
          _key: "elsewhere",
          _type: "object",
          title: "Elsewhere",
          links: [
            { _key: "instagram", _type: "object", label: "Instagram", href: "https://instagram.com/", visible: true },
            { _key: "substack", _type: "object", label: "Substack", href: "https://substack.com/", visible: true },
            { _key: "arena", _type: "object", label: "Are.na", href: "https://www.are.na/", visible: true },
            { _key: "rss", _type: "object", label: "RSS feed", href: "/rss.xml", visible: true },
          ],
        },
      ],
      bottomLeft: "© 2026 Infrequent Flyer · Made slowly",
      bottomRight: "Issue 047 · May 4, 2026",
    },
  });

  for (const page of pages) {
    await client.createOrReplace({
      _id: page._id,
      _type: "sitePage",
      title: page.title,
      slug: { _type: "slug", current: page.slug },
      eyebrow: page.eyebrow,
      intro: page.intro,
      body: page.body,
      cta: page.cta,
      metadata: {
        metaTitle: page.eyebrow,
        metaDescription: page.intro,
      },
    });
  }

  console.log("Seeded site chrome and editable site pages.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
