import type { MetadataRoute } from "next";

const BASE_URL = "https://cleaning-services-webpage-production.up.railway.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/book", priority: 0.95, changeFrequency: "daily" },
    { path: "/services/standard", priority: 0.85, changeFrequency: "monthly" },
    { path: "/services/deep", priority: 0.85, changeFrequency: "monthly" },
    { path: "/services/move-in-out", priority: 0.85, changeFrequency: "monthly" },
  ];
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
