import { defineField, defineType } from "sanity";
import { commonReviewFields, seoFields } from "./shared";

export const stayReview = defineType({
  name: "stayReview",
  title: "Stay Review",
  type: "document",
  fields: [
    ...commonReviewFields,
    defineField({ name: "dateVisited", title: "Date visited", type: "date" }),
    defineField({ name: "priceRange", title: "Price range", type: "string", options: { list: ["budget", "mid", "luxury"] } }),
    defineField({ name: "bestFor", title: "Best for", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "scoreValue", title: "Would I Pay This Price Again?", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "scoreBreakfast", title: "The Breakfast Test", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "scoreGramworthy", title: "Gram-Worthy?", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "scoreHype", title: "Hype vs Reality", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "scoreWelcome", title: "The Welcome Factor", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "scoreWorthIt", title: "Worth My Precious Days Off", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    ...seoFields,
  ],
});
