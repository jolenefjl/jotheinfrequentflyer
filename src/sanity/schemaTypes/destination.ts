import { defineField, defineType } from "sanity";

export const destination = defineType({
  name: "destination",
  title: "Destination / Place",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required().warning("Add a place name before final publishing.") }),
    defineField({ name: "country", title: "Country", type: "string", validation: (Rule) => Rule.required().warning("Add a country before final publishing.") }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required().warning("Add a slug before final publishing."),
    }),
    defineField({ name: "entriesCount", title: "Entries count", type: "number", validation: (Rule) => Rule.min(0) }),
    defineField({
      name: "coordinates",
      title: "Coordinates for map",
      type: "geopoint",
    }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
    defineField({ name: "joTake", title: "Jo's one-line take", type: "string" }),
  ],
  preview: {
    select: { title: "name", subtitle: "country", media: "heroImage" },
  },
});
