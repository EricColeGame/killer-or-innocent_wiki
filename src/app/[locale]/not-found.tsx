"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { routing, type Locale } from "@/i18n/routing";

// not-found.tsx 在 App Router 中拿不到 params（Next 官方行为），
// 且本模板 output: "export" 没有 middleware，requestLocale 恒为 undefined，
// 因此从 usePathname() 的首段推导当前 locale（localePrefix 恒为 "always"）。
// 非法或缺失时回退 defaultLocale，避免 404 页面跳到错误语言。
// 思路与 language-switcher.tsx 的 locale 校验保持一致。
export default function NotFoundPage() {
  const t = useTranslations("notFound");
  const pathname = usePathname();
  const segment = pathname.split("/")[1] ?? "";
  const locale: Locale = routing.locales.includes(segment as Locale)
    ? (segment as Locale)
    : routing.defaultLocale;

  return (
    <main className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-16 text-center">
      <div className="rounded-3xl border border-border bg-card/70 p-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{t("title")}</h1>
        <p className="mt-4 text-muted-foreground">{t("description")}</p>
        <Button asChild className="mt-6"><Link href={`/${locale}/guide`}>{t("cta")}</Link></Button>
      </div>
    </main>
  );
}
