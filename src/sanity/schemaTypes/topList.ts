import { defineField, defineType } from "sanity";
import { seoFields } from "./shared";

export const topList = defineType({
  name: "topList",
  title: "Top List",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required().warning("Add a title before final publishing.") }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required().warning("Add a slug before final publishing.") }),
    defineField({ name: "destinations", title: "Related destinations", type: "array", of: [{ type: "reference", to: [{ type: "destination" }] }] }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
    defineField({ name: "pinterestImage", title: "Pinterest image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({ name: "link", title: "Optional link", type: "url" }),
          ],
        },
      ],
    }),
    ...seoFields,
  ],
});
