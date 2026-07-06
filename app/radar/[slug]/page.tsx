import type { Metadata } from "next";
import ClientRadar from "./ClientRadar";

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. GOOGLE BOTLARI İÇİN DİNAMİK SEO BAŞLIĞI ÜRETİCİSİ
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const ticker = decodeURIComponent(resolvedParams.slug).toUpperCase();

  return {
    title: `${ticker} AI Market Radar & Financial Analysis (2026) | Brands Lord`,
    description: `Get real-time 2026 AI market radar intelligence, competitor analysis, and 4-page institutional PDF reports for ${ticker}. Powered by live Wall Street scrapers.`,
    keywords: [ticker, `${ticker} stock analysis`, `${ticker} price radar`, "AI financial intelligence", "Brands Lord"],
  };
}

// 2. SUNUCU BİLEŞENİ ARKA PLANDA GÖRSEL TERMİNALİMİZİ ÇAĞIRIR
export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);

  return <ClientRadar slug={slug} />;
}
