import { defineField, defineType } from "sanity";
import { bodyField, imageField, seoFields, slugField, titleField } from "./shared";

export const sitePage = defineType({
  name: "sitePage",
  title: "Site Pages",
  type: "document",
  fields: [
    titleField,
    slugField,
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    imageField,
    bodyField,
    defineField({
      name: "cta",
      title: "Call to action",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "href", title: "Link", type: "string" }),
      ],
    }),
    ...seoFields,
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current", media: "image" },
  },
});
