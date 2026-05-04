import { defineField } from "sanity";

export const seoFields = [
  defineField({ name: "metaTitle", title: "SEO title", type: "string" }),
  defineField({ name: "metaDescription", title: "SEO description", type: "text", rows: 3 }),
];

export const commonReviewFields = [
  defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
  defineField({
    name: "slug",
    title: "Slug",
    type: "slug",
    options: { source: "title", maxLength: 96 },
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "destination",
    title: "Destination",
    type: "reference",
    to: [{ type: "destination" }],
    validation: (Rule) => Rule.required(),
  }),
  defineField({ name: "datePublished", title: "Date published", type: "date" }),
  defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
  defineField({ name: "pinterestImage", title: "Pinterest image", type: "image", options: { hotspot: true } }),
  defineField({
    name: "wouldJoReturn",
    title: "Would Jo return?",
    type: "string",
    options: { list: ["yes", "no", "maybe"], layout: "radio" },
  }),
  defineField({ name: "oneLineVerdict", title: "One-line verdict", type: "string" }),
  defineField({ name: "affiliateUrl", title: "Affiliate URL", type: "url" }),
  defineField({
    name: "body",
    title: "Body",
    type: "array",
    of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
  }),
];
