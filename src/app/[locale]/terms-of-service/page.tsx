import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/legal-page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.terms" });
  const site = await getTranslations({ locale, namespace: "site" });
  return {
    title: `${t("title")} | ${site("name")}`,
    description: t("metaDescription"),
    alternates: { canonical: `/${locale}/terms-of-service` },
  };
}

export default async function TermsOfServicePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.terms" });
  const paragraphs = t.raw("paragraphs") as string[];
  return (
    <LegalPage title={t("title")}>
      {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </LegalPage>
  );
}
