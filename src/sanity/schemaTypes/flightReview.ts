import { defineField, defineType } from "sanity";
import { commonReviewFields, seoFields } from "./shared";

export const flightReview = defineType({
  name: "flightReview",
  title: "Flight Review",
  type: "document",
  fields: [
    ...commonReviewFields,
    defineField({ name: "airline", title: "Airline", type: "string" }),
    defineField({ name: "route", title: "Route", type: "string" }),
    defineField({ name: "cabinClass", title: "Cabin class", type: "string", options: { list: ["economy", "premium economy", "business", "first"] } }),
    defineField({ name: "dateFlown", title: "Date flown", type: "date" }),
    defineField({ name: "scoreFood", title: "Edible or Regrettable?", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "scoreSeats", title: "Did My Back Survive?", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "scoreCrew", title: "The Crew Vibe", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "scoreValue", title: "Pennies vs Experience", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    ...seoFields,
  ],
});
