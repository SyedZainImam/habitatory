import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1, "Sanity project ID is required"),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1, "Sanity dataset is required"),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().min(1, "Sanity API version is required"),
  SANITY_API_WRITE_TOKEN: z.string().min(1, "Sanity write token is required"),
  SANITY_REVALIDATE_SECRET: z.string().optional(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  SANITY_API_WRITE_TOKEN: process.env.SANITY_API_WRITE_TOKEN,
  SANITY_REVALIDATE_SECRET: process.env.SANITY_REVALIDATE_SECRET,
});
