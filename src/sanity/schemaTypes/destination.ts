import { defineField, defineType } from "sanity";

export const destination = defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  fields: [
    defineField({ name: "city", title: "City", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "country", title: "Country", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: (doc) => `${doc.country}/${doc.city}`, maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
    defineField({ name: "joTake", title: "Jo's one-line take", type: "string" }),
    defineField({ name: "latitude", title: "Latitude", type: "number" }),
    defineField({ name: "longitude", title: "Longitude", type: "number" }),
  ],
  preview: {
    select: { title: "city", subtitle: "country", media: "heroImage" },
  },
});
