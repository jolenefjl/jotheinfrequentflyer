import { defineField, defineType } from "sanity";
import { bodyField, seoFields, slugField, titleField } from "./shared";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    titleField,
    slugField,
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    bodyField,
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Stays", value: "stays" },
          { title: "Food", value: "food" },
          { title: "Experiences", value: "experiences" },
          { title: "Kids", value: "kids" },
          { title: "Top Tips", value: "tips" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true } }),
    defineField({ name: "readingTime", title: "Reading time", type: "string" }),
    defineField({ name: "rating", title: "Rating", type: "number", validation: (Rule) => Rule.min(0).max(5) }),
    defineField({ name: "bestFor", title: "Best for", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "verdict", title: "Verdict", type: "string" }),
    defineField({ name: "avoid", title: "Avoid", type: "string" }),
    defineField({ name: "author", title: "Author", type: "string", initialValue: "Jo" }),
    defineField({ name: "publishedDate", title: "Published date", type: "date" }),
    ...seoFields,
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
