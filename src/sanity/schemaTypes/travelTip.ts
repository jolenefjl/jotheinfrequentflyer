import { defineField, defineType } from "sanity";
import { seoFields } from "./shared";

export const travelTip = defineType({
  name: "travelTip",
  title: "Travel Tip",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "destinations", title: "Related destinations", type: "array", of: [{ type: "reference", to: [{ type: "destination" }] }] }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
    defineField({ name: "pinterestImage", title: "Pinterest image", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] }),
    ...seoFields,
  ],
});
