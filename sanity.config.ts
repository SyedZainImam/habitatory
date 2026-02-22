import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";
import { deskStructure } from "./src/sanity/lib/deskStructure";

// Use environment variables for project ID and dataset, or fallback
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "heqhq5w1";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
    basePath: "/studio",
    projectId,
    dataset,
    title: "Habitatory CMS",
    schema,
    plugins: [
        structureTool({
            structure: deskStructure,
        }),
    ],
});
