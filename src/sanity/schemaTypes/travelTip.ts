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
  tagsField,
  titleField,
} from "./shared";

export const topTip = defineType({
  name: "topTip",
  title: "Top Tip",
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
    tagsField,
    defineField({ name: "verdict", title: "Verdict", type: "string" }),
    authorField,
    defineField({ name: "publishedDate", title: "Published date", type: "date" }),
    ...seoFields,
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
  },
});
