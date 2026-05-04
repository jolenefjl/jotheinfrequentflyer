import { defineField, defineType } from "sanity";
import { bodyField, imageField, seoFields, slugField, titleField } from "./shared";

export const kidsContent = defineType({
  name: "kidsContent",
  title: "Kids Content",
  type: "document",
  fields: [
    titleField,
    slugField,
    bodyField,
    imageField,
    defineField({ name: "verdict", title: "Verdict", type: "string" }),
    defineField({ name: "bestFor", title: "Best for", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "avoid", title: "Avoid", type: "string" }),
    defineField({ name: "publishedDate", title: "Published date", type: "date" }),
    ...seoFields,
  ],
  preview: {
    select: { title: "title", subtitle: "verdict", media: "image" },
  },
});
