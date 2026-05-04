import { defineField, defineType } from "sanity";
import { bodyField, imageField, locationField, seoFields, slugField, titleField } from "./shared";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    titleField,
    slugField,
    bodyField,
    imageField,
    locationField,
    defineField({ name: "duration", title: "Duration", type: "string" }),
    defineField({ name: "verdict", title: "Verdict", type: "string" }),
    defineField({ name: "bestFor", title: "Best for", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "publishedDate", title: "Published date", type: "date" }),
    ...seoFields,
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
  },
});
