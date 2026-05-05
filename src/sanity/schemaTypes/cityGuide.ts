import { defineField, defineType } from "sanity";
import { bodyField, imageField, locationField, seoFields, slugField, titleField } from "./shared";

export const cityGuide = defineType({
  name: "cityGuide",
  title: "City Guide",
  type: "document",
  fields: [
    titleField,
    slugField,
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    bodyField,
    imageField,
    locationField,
    defineField({ name: "bestFor", title: "Best for", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "whenToGo", title: "When to go", type: "string" }),
    defineField({ name: "stayLength", title: "Ideal stay length", type: "string" }),
    defineField({ name: "publishedDate", title: "Published date", type: "date" }),
    defineField({ name: "isPublishedToMenu", title: "Show in menu", type: "boolean", initialValue: false }),
    ...seoFields,
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
  },
});
