import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://abhinavkdeval.vercel.app", changeFrequency: "monthly", priority: 1 }];
}
