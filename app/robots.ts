import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/", "/booking/"],
      },
    ],
    sitemap: "https://cleaning-services-webpage-production.up.railway.app/sitemap.xml",
  };
}
