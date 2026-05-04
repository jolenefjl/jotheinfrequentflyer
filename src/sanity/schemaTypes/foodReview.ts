import { defineField, defineType } from "sanity";
import { commonReviewFields, seoFields } from "./shared";

export const foodReview = defineType({
  name: "foodReview",
  title: "Food Review",
  type: "document",
  fields: [
    ...commonReviewFields,
    defineField({ name: "restaurantName", title: "Restaurant name", type: "string" }),
    defineField({ name: "cuisineType", title: "Cuisine type", type: "string" }),
    defineField({ name: "dateVisited", title: "Date visited", type: "date" }),
    defineField({ name: "priceRange", title: "Price range", type: "string", options: { list: ["budget", "mid", "luxury"] } }),
    defineField({ name: "bestFor", title: "Best for", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "scoreHype", title: "Worth the Hype?", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "scoreValue", title: "Would I Pay This Price Again?", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "scoreTaste", title: "Did It Hit Different?", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "scoreWelcome", title: "The Welcome Factor", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "scoreInteriors", title: "Gram-Worthy Interiors?", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "scoreAuthentic", title: "The Real Deal?", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "scoreSoul", title: "Did It Feed My Soul?", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    ...seoFields,
  ],
});
