import type { MetadataRoute } from "next";
import { getAllContentPaths } from "@/lib/content";
import { CONTENT_TYPES } from "@/config/navigation";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://killer-or-innocent.wiki";

  // Static paths that always exist: content-type listing pages (derived from
  // CONTENT_TYPES so the two can never drift apart) plus standalone pages.
  const listingPaths = CONTENT_TYPES.map((contentType) => `/${contentType}`);
  const staticPaths = [
    "/",
    ...listingPaths,
    "/privacy-policy",
    "/terms-of-service",
    "/copyright",
    "/about",
  ];
  const listingSet = new Set<string>(listingPaths);

  // Dynamic paths: scan actual MDX content files
  const contentPaths = await getAllContentPaths("en");
  const dynamicPaths = contentPaths.map((item) => `/${[item.contentType, ...item.slug].join("/")}`);

  const paths = [...staticPaths, ...dynamicPaths];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? ("daily" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : listingSet.has(path) ? 0.8 : 0.6,
    })),
  );
}
