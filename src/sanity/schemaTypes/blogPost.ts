import { defineField, defineType } from "sanity";
import {
  authorField,
  bodyField,
  coverImageField,
  excerptField,
  ratingField,
  readingTimeField,
  seoFields,
  slugField,
  tagsField,
  titleField,
} from "./shared";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    titleField,
    slugField,
    excerptField,
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
      validation: (Rule) => Rule.required().warning("Choose a category before final publishing."),
    }),
    coverImageField,
    readingTimeField,
    ratingField,
    tagsField,
    defineField({ name: "bestFor", title: "Best for", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "verdict", title: "Verdict", type: "string" }),
    defineField({ name: "avoid", title: "Avoid", type: "string" }),
    authorField,
    defineField({ name: "publishedDate", title: "Published date", type: "date" }),
    ...seoFields,
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
