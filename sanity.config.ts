import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemaTypes";
import { publishDocumentAction } from "@/sanity/documentActions/publish-document";

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
      const schemaType = context.schemaType as string | { name?: string };
      const schemaTypeName = typeof schemaType === "string" ? schemaType : schemaType.name;

      if (schemaTypeName) {
        const alreadyHasCustomPublish = previousActions.some(
          (action) => action.displayName === publishDocumentAction.displayName,
        );
        const withoutDefaultPublish = previousActions.filter((action) => action.action !== "publish");
        return alreadyHasCustomPublish ? previousActions : [publishDocumentAction, ...withoutDefaultPublish];
      }

      return previousActions;
    },
  },
});
