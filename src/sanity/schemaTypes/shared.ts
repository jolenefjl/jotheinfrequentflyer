import { defineArrayMember, defineField, defineType } from "sanity";

export const imageWithMeta = defineType({
  name: "imageWithMeta",
  title: "Image with caption",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "alt", title: "Alt text", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({ name: "credit", title: "Image credit", type: "string" }),
  ],
  preview: {
    select: { title: "alt", subtitle: "caption", media: "image" },
  },
});

export const imageLayout = defineType({
  name: "imageLayout",
  title: "Image layout",
  type: "object",
  fields: [
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      initialValue: "single",
      options: {
        layout: "radio",
        list: [
          { title: "Single photo", value: "single" },
          { title: "Two photos side-by-side", value: "two" },
          { title: "Three photos grid", value: "three" },
          { title: "Four photos 2x2 grid", value: "four" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "imageWithMeta" }],
      validation: (Rule) => Rule.required().min(1).max(4),
    }),
  ],
  preview: {
    select: { layout: "layout", images: "images" },
    prepare({ layout, images }) {
      return {
        title: `${layout || "Image"} layout`,
        subtitle: `${images?.length || 0} image${images?.length === 1 ? "" : "s"}`,
        media: images?.[0]?.image,
      };
    },
  },
});

export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "H5", value: "h5" },
        { title: "H6", value: "h6" },
        { title: "Blockquote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({ name: "href", title: "URL", type: "url", validation: (Rule) => Rule.required() }),
              defineField({ name: "blank", title: "Open in new tab", type: "boolean", initialValue: true }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: "imageLayout" }),
  ],
});

export const pageMetadata = defineType({
  name: "pageMetadata",
  title: "Page metadata",
  type: "object",
  fields: [
    defineField({ name: "metaTitle", title: "Meta title", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta description", type: "text", rows: 3 }),
    defineField({ name: "ogImage", title: "OG image", type: "image", options: { hotspot: true } }),
    defineField({ name: "ogDescription", title: "OG description", type: "text", rows: 3 }),
    defineField({ name: "twitterCardImage", title: "Twitter card image", type: "image", options: { hotspot: true } }),
    defineField({ name: "twitterCardDescription", title: "Twitter card description", type: "text", rows: 3 }),
  ],
});

export const seoFields = [
  defineField({ name: "metadata", title: "Page-level metadata", type: "pageMetadata" }),
];

export const slugField = defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  options: { source: "title", maxLength: 96 },
  validation: (Rule) => Rule.required(),
});

export const titleField = defineField({
  name: "title",
  title: "Title",
  type: "string",
  validation: (Rule) => Rule.required(),
});

export const bodyField = defineField({
  name: "body",
  title: "Body",
  type: "richText",
});

export const imageField = defineField({
  name: "image",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({ name: "alt", title: "Alt text", type: "string" }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({ name: "credit", title: "Image credit", type: "string" }),
  ],
});

export const locationField = defineField({
  name: "location",
  title: "Location",
  type: "string",
});
