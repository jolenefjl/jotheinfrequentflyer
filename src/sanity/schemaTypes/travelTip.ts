import { defineField, defineType } from "sanity";
import { bodyField, imageField, locationField, seoFields, slugField, titleField } from "./shared";

export const topTip = defineType({
  name: "topTip",
  title: "Top Tip",
  type: "document",
  fields: [
    titleField,
    slugField,
    bodyField,
    imageField,
    locationField,
    defineField({ name: "verdict", title: "Verdict", type: "string" }),
    defineField({ name: "publishedDate", title: "Published date", type: "date" }),
    ...seoFields,
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
  },
});
