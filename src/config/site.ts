export interface SiteConfig {
  name: string;
  shortName: string;
  logoText: string;
  tagline: string;
  description: string;
  url: string;
  supportEmail: string;
  gameUrl?: string;
  heroVideoId?: string;
  social?: {
    robloxGroup?: string;
    discord?: string;
    youtube?: string;
    twitter?: string;
    tiktok?: string;
  };
  locales: readonly string[];
  defaultLocale: string;
}

export const siteConfig: SiteConfig = {
  name: "Killer or Innocent Wiki",
  shortName: "Killer or Innocent",
  logoText: "KI",
  tagline: "Killer & Innocent Guides, Detective Tips, Maps & Codes",
  description: "Killer or Innocent Wiki provides Roblox game guides, codes, gameplay tips, strategies, maps, and updates to help players survive and discover the truth.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://killer-or-innocent.wiki",
  supportEmail: `support@${new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://killer-or-innocent.wiki").hostname.replace(/^www\./, "")}`,
  gameUrl: "https://www.roblox.com/games/120951586797306/Killer-or-Innocent",
  heroVideoId: "hnNE4g1l-YI", // Roblox Killer or Innocent gameplay video
  social: {
    // GamesCans Productions publishes no verifiable standalone Discord/YouTube
    // channel for this game, so we link only its verified Roblox community group
    // instead of pointing at unrelated Roblox-run accounts.
    robloxGroup: "https://www.roblox.com/groups/97331962",
  },
  // 语言列表的唯一真相源是 src/i18n/routing.ts；这两个字段仅为兼容旧模板保留，
  // 全仓库已无消费者，取值必须与 routing.locales / routing.defaultLocale 保持一致。
  locales: ["en", "es", "pt", "de"],
  defaultLocale: "en",
};
