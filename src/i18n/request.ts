import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import en from "@/locales/en.json";
import es from "@/locales/es.json";
import pt from "@/locales/pt.json";
import de from "@/locales/de.json";

type Messages = typeof en;

// 每种语言对应的消息包：键集合必须与 routing.locales 完全一致。
// 非英语文件目前为空对象 {}，deepMerge 会自动回退到 en，待后续阶段补齐译文。
const messagesMap: Record<string, Partial<Messages>> = {
  "en": en,
  "es": es,
  "pt": pt,
  "de": de,
};

function deepMerge<T>(base: T, override: Partial<T>): T {
  if (
    typeof base !== "object" ||
    base === null ||
    typeof override !== "object" ||
    override === null
  ) {
    return (override as T) ?? base;
  }

  if (Array.isArray(base)) {
    return (Array.isArray(override) ? override : base) as T;
  }

  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };

  for (const key of Object.keys(override as Record<string, unknown>)) {
    const baseValue = (base as Record<string, unknown>)[key];
    const overrideValue = (override as Record<string, unknown>)[key];
    if (overrideValue === undefined) continue;
    result[key] = deepMerge(baseValue as never, overrideValue as never);
  }

  return result as T;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const localeMessages: Partial<Messages> = messagesMap[locale] ?? {};

  const messages = deepMerge(en, localeMessages);
  return { locale, messages };
});
