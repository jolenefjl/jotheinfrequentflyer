import { defineField, defineType } from "sanity";

const entryTypes = [
  { type: "blogPost" },
  { type: "stayReview" },
  { type: "foodEntry" },
  { type: "experience" },
  { type: "kidsContent" },
  { type: "topTip" },
  { type: "cityGuide" },
];

const sectionVisibilityField = defineField({
  name: "visible",
  title: "Show this section",
  type: "boolean",
  initialValue: true,
  description: "Turn this off to hide the section on the homepage without deleting its content.",
});

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Internal title", type: "string", initialValue: "Home Page" }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        sectionVisibilityField,
        defineField({ name: "image", title: "Hero image", type: "image", options: { hotspot: true } }),
        defineField({ name: "eyebrowLeft", title: "Left eyebrow", type: "string" }),
        defineField({ name: "eyebrowRight", title: "Right eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "intro", title: "Intro", type: "text", rows: 4 }),
        defineField({ name: "currentLabel", title: "Current label", type: "string" }),
        defineField({ name: "currentValue", title: "Current value", type: "string" }),
        defineField({ name: "photoCredit", title: "Photo credit label", type: "string" }),
      ],
    }),
    defineField({
      name: "coverStory",
      title: "Cover story",
      type: "object",
      fields: [
        sectionVisibilityField,
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "issueLabel", title: "Issue label", type: "string" }),
        defineField({ name: "entry", title: "Entry", type: "reference", to: entryTypes }),
        defineField({ name: "badge", title: "Badge", type: "string" }),
        defineField({ name: "secondaryBadge", title: "Secondary badge", type: "string" }),
        defineField({ name: "ratingLine", title: "Rating line", type: "string" }),
        defineField({ name: "dateLine", title: "Date/location line", type: "string" }),
        defineField({ name: "buttonText", title: "Button text", type: "string" }),
        defineField({
          name: "stats",
          title: "Stats",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "value", title: "Value", type: "string" }),
              ],
            },
          ],
          validation: (Rule) => Rule.max(4).warning("The layout is designed for up to four stats."),
        }),
      ],
    }),
    defineField({
      name: "browseSection",
      title: "Browse section",
      type: "object",
      fields: [
        sectionVisibilityField,
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "tiles",
          title: "Tiles",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "href", title: "Link", type: "string" }),
                defineField({ name: "count", title: "Entries count label", type: "string" }),
                defineField({ name: "blurb", title: "Blurb", type: "text", rows: 2 }),
                defineField({ name: "visible", title: "Visible", type: "boolean", initialValue: true }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "latestSection",
      title: "Recently filed section",
      type: "object",
      fields: [
        sectionVisibilityField,
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "actionText", title: "Action text", type: "string" }),
        defineField({ name: "actionHref", title: "Action link", type: "string" }),
        defineField({ name: "entries", title: "Manual entries", type: "array", of: [{ type: "reference", to: entryTypes }] }),
      ],
    }),
    defineField({
      name: "placeSection",
      title: "By place section",
      type: "object",
      fields: [
        sectionVisibilityField,
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "mapLabelLeft", title: "Map label left", type: "string" }),
        defineField({ name: "mapLabelRight", title: "Map label right", type: "string" }),
        defineField({ name: "mapNote", title: "Map note", type: "string" }),
        defineField({ name: "places", title: "Manual places", type: "array", of: [{ type: "reference", to: [{ type: "destination" }] }] }),
      ],
    }),
    defineField({
      name: "newsletterSection",
      title: "Newsletter section",
      type: "object",
      fields: [
        sectionVisibilityField,
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
      ],
    }),
  ],
});
