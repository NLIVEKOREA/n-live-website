import type { MetadataRoute } from "next";

const SITE = "https://www.n-live.co.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "", priority: 1.0, freq: "weekly" as const },
    { path: "about", priority: 0.8, freq: "monthly" as const },
    { path: "for-korean-brands", priority: 0.9, freq: "weekly" as const },
    { path: "for-korean-sellers", priority: 0.9, freq: "weekly" as const },
    { path: "for-overseas-brands", priority: 0.9, freq: "weekly" as const },
    { path: "for-overseas-sellers", priority: 0.9, freq: "weekly" as const },
    { path: "network", priority: 0.7, freq: "monthly" as const },
    { path: "process", priority: 0.7, freq: "monthly" as const },
    { path: "contact", priority: 0.6, freq: "yearly" as const },
    { path: "campaign", priority: 0.8, freq: "weekly" as const },
    { path: "privacy", priority: 0.2, freq: "yearly" as const },
    { path: "terms", priority: 0.2, freq: "yearly" as const },
  ];

  return pages.map(({ path, priority, freq }) => ({
    url: path ? `${SITE}/${path}` : SITE,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));
}
