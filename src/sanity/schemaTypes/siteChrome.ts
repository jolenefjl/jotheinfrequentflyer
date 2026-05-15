import { defineField, defineType } from "sanity";

const linkField = defineField({
  name: "links",
  title: "Links",
  type: "array",
  of: [
    {
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "href", title: "URL or path", type: "string" }),
        defineField({ name: "visible", title: "Visible", type: "boolean", initialValue: true }),
      ],
      preview: {
        select: { title: "label", subtitle: "href" },
      },
    },
  ],
});

export const siteChrome = defineType({
  name: "siteChrome",
  title: "Header & Footer",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Internal title", type: "string", initialValue: "Header & Footer" }),
    defineField({
      name: "categoryFilterBarVisible",
      title: "Show category filter bars",
      type: "boolean",
      initialValue: false,
      description:
        "Shows the filter/sort strip on Stays, Food, Experiences, Kids, and Tips pages. Keep off while sections have only a few posts.",
    }),
    defineField({
      name: "header",
      title: "Header",
      type: "object",
      fields: [
        defineField({ name: "issueLabel", title: "Issue label", type: "string", initialValue: "No 047" }),
        defineField({ name: "volumeLabel", title: "Volume label", type: "string", initialValue: "Vol. III" }),
        defineField({ name: "brandLineOne", title: "Brand line 1", type: "string", initialValue: "Infrequent" }),
        defineField({ name: "brandLineTwo", title: "Brand line 2", type: "string", initialValue: "Flyer" }),
        defineField({ ...linkField, name: "navigation", title: "Navigation" }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({ name: "newsletterKicker", title: "Newsletter kicker", type: "string", initialValue: "The newsletter" }),
        defineField({ name: "newsletterTitle", title: "Newsletter title", type: "string" }),
        defineField({ name: "newsletterDescription", title: "Newsletter description", type: "text", rows: 3 }),
        defineField({ name: "newsletterVisible", title: "Show newsletter form", type: "boolean", initialValue: true }),
        defineField({ name: "emailPlaceholder", title: "Email placeholder", type: "string", initialValue: "your@email.com" }),
        defineField({ name: "buttonText", title: "Button text", type: "string", initialValue: "Subscribe" }),
        defineField({
          name: "columns",
          title: "Footer columns",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", title: "Column title", type: "string" }),
                defineField({ ...linkField, name: "links", title: "Links" }),
              ],
              preview: {
                select: { title: "title" },
              },
            },
          ],
        }),
        defineField({ name: "bottomLeft", title: "Bottom left text", type: "string" }),
        defineField({ name: "bottomRight", title: "Bottom right text", type: "string" }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
