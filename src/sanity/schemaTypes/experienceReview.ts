import { defineField, defineType } from "sanity";
import { commonReviewFields, seoFields } from "./shared";

export const experienceReview = defineType({
  name: "experienceReview",
  title: "Experience Review",
  type: "document",
  fields: [
    ...commonReviewFields,
    defineField({ name: "experienceType", title: "Experience type", type: "string" }),
    defineField({ name: "dateVisited", title: "Date visited", type: "date" }),
    defineField({ name: "priceRange", title: "Price range", type: "string", options: { list: ["budget", "mid", "luxury"] } }),
    defineField({ name: "bestFor", title: "Best for", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "scoreTrek", title: "Was it Worth the Trek?", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "scoreTicket", title: "Worth the Ticket?", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "scoreFun", title: "Actual Fun Had", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "scoreSoul", title: "Did It Feed My Soul?", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    ...seoFields,
  ],
});
