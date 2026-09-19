import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // 唯一真相源：最终语言集合在此维护，request.ts / language-switcher.tsx / locales/*.json 必须与之一致
  locales: ["en", "es", "pt", "de"],
  // 注意：defineRouting 使用 const 类型参数，locales 会被推断为字面量元组，
  // 因此 defaultLocale 必须是字面量；写成 siteConfig.defaultLocale（string）会类型报错。
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
