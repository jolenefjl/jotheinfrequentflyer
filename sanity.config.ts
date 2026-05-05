import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemaTypes";
import { publishHomePageAction } from "@/sanity/documentActions/publish-home-page";

export default defineConfig({
  name: "default",
  title: "Jo the Infrequent Flyer",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "sfes8wpi",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (previousActions, context) => {
      if (context.schemaType === "homePage") {
        const withoutDefaultPublish = previousActions.filter((action) => action.action !== "publish");
        return [publishHomePageAction, ...withoutDefaultPublish];
      }

      return previousActions;
    },
  },
});
