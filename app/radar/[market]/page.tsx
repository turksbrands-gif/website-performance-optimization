import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Radar } from "lucide-react";
// Ana sayfadaki mevcut arama/tarama form bileşenimizi buraya da çağırıyoruz
import { MarketScanForm } from "@/components/market-scan-form";

interface Props {
  params: {
    market: string;
  };
}

// 1. GOOGLE İÇİN OTOMATİK DİNAMİK SEO BAŞLIKLARI (METADATA)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const marketName = decodeURIComponent(params.market).toUpperCase();
  
  return {
    title: `${marketName} AI Market Radar & Financial Analysis (2026) | Brands Lord`,
    description: `Get real-time 2026 AI market radar intelligence, competitor analysis, and 4-page institutional PDF reports for ${marketName}. Powered by live Wall Street scrapers.`,
    keywords: [marketName, `${marketName} analysis`, `${marketName} stock radar`, "AI financial intelligence", "Brands Lord"],
  };
}

// 2. DİNAMİK AÇILIŞ SAYFASI BİLEŞENİ
export default function DynamicRadarPage({ params }: Props) {
  const rawMarket = decodeURIComponent(params.market);
  const displayMarket = rawMarket.toUpperCase();

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Üst Bilgi Barı */}
      <div className="mx-auto max-w-5xl px-4 pt-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Global Terminal</span>
        </Link>
      </div>

      {/* SEO Odaklı Dinamik Kahraman (Hero) Alanı */}
      <section className="mx-auto max-w-4xl px-4 py-12 text-center">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-md">
          <Radar className="size-3.5 animate-spin" />
          <span>Live Asset Intelligence • 2026</span>
        </div>
        
        <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
          Real-Time AI Market Radar for <span className="text-primary underline decoration-primary/40 underline-offset-8">{displayMarket}</span>
        </h1>
        
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          Our algorithmic scrapers synthesize live Yahoo Finance feeds and global news to generate institutional-grade financial analysis for <strong className="text-foreground font-semibold">{displayMarket}</strong>. Request your real-time 4-page PDF intelligence report below.
        </p>
      </section>

      {/* Ana Arama Formumuzu Otomatik Olarak Bu Varlıkla Başlatıyoruz */}
      <section className="mx-auto max-w-4xl px-4 pb-24">
        <div className="rounded-2xl border border-border/50 bg-card/40 p-2 sm:p-6 backdrop-blur-xl shadow-2xl">
          {/* Eğer MarketScanForm bileşenine varsayılan değer (initialMarket) prop'u ekleyebilirsen, 
              kullanıcı bu sayfaya girdiğinde kutu doğrudan "NVDA" yazılı gelir! */}
          <MarketScanForm />
        </div>
      </section>
    </main>
  );
}
