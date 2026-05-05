import { defineField, defineType } from "sanity";
import {
  authorField,
  bodyField,
  coverImageField,
  excerptField,
  imageField,
  locationField,
  ratingField,
  readingTimeField,
  seoFields,
  slugField,
  titleField,
} from "./shared";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    titleField,
    slugField,
    excerptField,
    bodyField,
    imageField,
    coverImageField,
    locationField,
    readingTimeField,
    ratingField,
    defineField({ name: "duration", title: "Duration", type: "string" }),
    defineField({ name: "verdict", title: "Verdict", type: "string" }),
    defineField({ name: "bestFor", title: "Best for", type: "array", of: [{ type: "string" }] }),
    authorField,
    defineField({ name: "publishedDate", title: "Published date", type: "date" }),
    ...seoFields,
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
  },
});
