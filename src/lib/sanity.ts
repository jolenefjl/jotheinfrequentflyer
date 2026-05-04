import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "sfes8wpi",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-05-04",
  useCdn: true,
};

export const client = createClient(sanityConfig);

const builder = createImageUrlBuilder(client);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

export async function sanityQuery<T>(query: string, params = {}) {
  try {
    return await client.fetch<T>(query, params);
  } catch {
    return null;
  }
}
