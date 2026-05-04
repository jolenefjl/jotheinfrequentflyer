import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "favicon", title: "Favicon", type: "image" }),
    defineField({ name: "siteTitle", title: "Site title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "siteDescription", title: "Site description", type: "text", rows: 3 }),
    defineField({ name: "primaryColor", title: "Primary color", type: "string", description: "Hex, CSS color, or token value." }),
    defineField({ name: "secondaryColor", title: "Secondary color", type: "string", description: "Hex, CSS color, or token value." }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
  ],
  preview: {
    select: { title: "siteTitle", subtitle: "siteDescription", media: "logo" },
  },
});

export const socialSharingSettings = defineType({
  name: "socialSharingSettings",
  title: "SEO & Social Sharing",
  type: "document",
  fields: [
    defineField({ name: "defaultMetaDescription", title: "Default meta description", type: "text", rows: 3 }),
    defineField({ name: "defaultOgImage", title: "Default OG image", type: "image", options: { hotspot: true } }),
    defineField({ name: "twitterHandle", title: "Twitter handle", type: "string" }),
    defineField({ name: "instagramHandle", title: "Instagram handle", type: "string" }),
  ],
});

export const newsletterSettings = defineType({
  name: "newsletterSettings",
  title: "Newsletter Settings",
  type: "document",
  fields: [
    defineField({ name: "newsletterTitle", title: "Newsletter title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "subscribeButtonText", title: "Subscribe button text", type: "string", initialValue: "Subscribe" }),
    defineField({ name: "emailPlaceholderText", title: "Email placeholder text", type: "string", initialValue: "your@email.com" }),
  ],
});
