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

export const stayReview = defineType({
  name: "stayReview",
  title: "Stay",
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
    defineField({ name: "nights", title: "Nights", type: "number", validation: (Rule) => Rule.min(0) }),
    defineField({ name: "verdict", title: "Verdict", type: "string" }),
    defineField({ name: "bestFor", title: "Best for", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "avoid", title: "Avoid", type: "string" }),
    authorField,
    defineField({ name: "publishedDate", title: "Published date", type: "date" }),
    ...seoFields,
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
  },
});
