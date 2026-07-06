"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Activity, Radar, ShieldCheck, Sparkles } from "lucide-react";
import { MarketScanForm } from "@/components/market-scan-form";
import { LiveTicker } from "@/components/LiveTicker";
import ReactMarkdown from "react-markdown";

interface MarketItem {
  symbol: string;
  price: string;
  change: string;
  percentChange?: string;
  isUp: boolean;
  prevClose?: string;
  dayRange?: string;
  yearRange?: string;
  asOf?: string;
}

const trustPoints = [
  { icon: Radar, label: "Real-time market radar" },
  { icon: Activity, label: "AI sentiment & trend signals" },
  { icon: ShieldCheck, label: "Private, report-only delivery" },
];

const InfoCard = ({ title, content, className = "" }: { title: string; content: string | React.ReactNode; className?: string }) => (
  <div className={`bg-[#11151d]/60 backdrop-blur-md border border-[#1a1e29] rounded-2xl p-5 shadow-2xl transition-all hover:border-primary/40 ${className}`}>
    <h3 className="text-primary text-sm font-semibold mb-3 uppercase tracking-wider">{title}</h3>
    <div className="text-gray-400 text-sm leading-relaxed">{content}</div>
  </div>
);

export default function ClientRadar({ slug }: { slug?: string }) {
  const [sp500Data, setSp500Data] = useState<MarketItem | null>(null);
  const [techGiants, setTechGiants] = useState<MarketItem[]>([]);
  const [usaIndices, setUsaIndices] = useState<MarketItem[]>([]);
  const [commodities, setCommodities] = useState<MarketItem[]>([]);
  const [euroAsiaIndices, setEuroAsiaIndices] = useState<MarketItem[]>([]);
  const [forexRates, setForexRates] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);

  // AI Analiz Raporu Stateleri
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const fetchRealTimeData = async () => {
      try {
        const response = await fetch(`/api/ticker?nocache=${Date.now()}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        if (response.ok) {
          let rawData = await response.json();
          let data: any[] = [];

          if (Array.isArray(rawData)) {
            data = rawData.map((d) => d.json || d);
          } else if (rawData && typeof rawData === "object") {
            data = [rawData.json || rawData];
          }

          const foundSp500 = data.find((item) => item && item.symbol === "S&P 500 Index");
          const now = new Date();
          const timeString = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

          if (foundSp500) {
            setSp500Data({
              ...foundSp500,
              asOf: `As of ${timeString} EDT`,
            });
          }

          const targetTechs = ["NVDA", "AAPL", "MSFT", "AMZN", "GOOG", "TSM", "TSLA", "META", "AMD", "INTC"];
          const foundTechs = data.filter((item) => item && targetTechs.includes(item.symbol?.toUpperCase()));

          if (foundTechs.length > 0) {
            setTechGiants(foundTechs);
          } else if (techGiants.length === 0) {
            setTechGiants([
              { symbol: "NVDA", price: "$193.76", change: "↓ -3.16%", isUp: false },
              { symbol: "AAPL", price: "$292.62", change: "↑ +1.13%", isUp: true },
              { symbol: "MSFT", price: "$379.01", change: "↑ +1.61%", isUp: true },
              { symbol: "AMZN", price: "$239.33", change: "↑ +0.42%", isUp: true },
            ]);
          }

          const targetUsaIndices = ["NASDAQ", "Dow Jones", "Russell 2000", "NYSE Comp", "Tech (QQQ)"];
          let usaIndicesData = data.filter((item) => item && targetUsaIndices.includes(item.symbol));

          if (usaIndicesData.length === 0) {
            usaIndicesData = [
              { symbol: "NASDAQ", price: "$17,500.20", change: "↑ 0.50%", isUp: true },
              { symbol: "Dow Jones", price: "$39,120.40", change: "↓ 0.15%", isUp: false },
              { symbol: "Russell 2000", price: "$2,050.10", change: "↑ 1.20%", isUp: true },
              { symbol: "NYSE Comp", price: "$18,200.00", change: "↑ 0.30%", isUp: true },
              { symbol: "Tech (QQQ)", price: "$445.60", change: "↑ 0.80%", isUp: true },
            ];
          }
          setUsaIndices(usaIndicesData);

          const targetCommodities = ["EUR / USD", "GBP / USD", "Gold (Ounce)", "Silver", "Brent Crude Oil", "Natural Gas"];
          let commoditiesData = data.filter((item) => item && targetCommodities.includes(item.symbol));

          if (commoditiesData.length === 0) {
            commoditiesData = [
              { symbol: "EUR / USD", price: "1.0854", change: "↑ 0.12%", isUp: true },
              { symbol: "GBP / USD", price: "1.2740", change: "↓ -0.05%", isUp: false },
              { symbol: "Gold (Ounce)", price: "$2,350.50", change: "↑ 0.45%", isUp: true },
              { symbol: "Silver", price: "$29.20", change: "↑ 1.10%", isUp: true },
              { symbol: "Brent Crude Oil", price: "$82.40", change: "↓ -0.80%", isUp: false },
              { symbol: "Natural Gas", price: "$2.65", change: "↑ 2.30%", isUp: true },
            ];
          }
          setCommodities(commoditiesData);

          const targetEuroAsia = ["DAX", "Nikkei 225", "FTSE 100", "CAC 40", "Hang Seng"];
          let euroAsiaData = data.filter((item) => item && targetEuroAsia.includes(item.symbol));

          if (euroAsiaData.length === 0) {
            euroAsiaData = [
              { symbol: "DAX", price: "$18,450.20", change: "↑ 0.40%", isUp: true },
              { symbol: "Nikkei 225", price: "$39,200.50", change: "↓ 0.60%", isUp: false },
              { symbol: "FTSE 100", price: "$8,250.10", change: "↑ 0.25%", isUp: true },
              { symbol: "CAC 40", price: "$7,980.00", change: "↑ 0.15%", isUp: true },
              { symbol: "Hang Seng", price: "$18,500.30", change: "↓ 1.10%", isUp: false },
            ];
          }
          setEuroAsiaIndices(euroAsiaData);

          const targetForex = ["USD / TRY", "EUR / TRY", "USD / JPY", "USD / CAD", "USD / CHF", "AUD / USD"];
          let forexData = data.filter((item) => item && targetForex.includes(item.symbol));

          if (forexData.length === 0) {
            forexData = [
              { symbol: "USD / TRY", price: "32.8540", change: "↑ 0.15%", isUp: true },
              { symbol: "EUR / TRY", price: "35.3410", change: "↑ 0.20%", isUp: true },
              { symbol: "USD / JPY", price: "156.4020", change: "↓ -0.10%", isUp: false },
              { symbol: "USD / CAD", price: "1.3650", change: "↑ 0.05%", isUp: true },
              { symbol: "USD / CHF", price: "0.9020", change: "↓ -0.12%", isUp: false },
              { symbol: "AUD / USD", price: "0.6650", change: "↑ 0.30%", isUp: true },
            ];
          }
          setForexRates(forexData);
        }
      } catch (error) {
        console.error("Anlık borsa veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRealTimeData();
    const interval = setInterval(fetchRealTimeData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-grid relative flex min-h-screen flex-col items-center overflow-x-hidden pt-16 pb-20">
      <style jsx global>{`
        @keyframes v-marquee {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }
        .animate-v-marquee {
          animation: v-marquee 15s linear infinite;
        }
        .animate-v-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="absolute top-0 left-0 w-full z-50 bg-[#0b0e14]/90 backdrop-blur-sm border-b border-[#1a1e29]">
        <LiveTicker />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-[250px] w-[1000px] max-w-[100vw] -translate-x-1/2 rounded-full bg-primary/10 blur-[150px]" />

      <div className="z-10 w-full max-w-[1600px] px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
        
        {/* SOL PANEL */}
        <aside className="col-span-1 lg:col-span-3 flex flex-col gap-6">
          <InfoCard
            title={sp500Data ? sp500Data.symbol : "S&P 500 INDEX"}
            content={
              <div className="flex flex-col mt-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-white font-extrabold text-3xl tracking-tight">
                    {loading ? "..." : sp500Data ? sp500Data.price : "5,495.20"}
                  </span>
                  <span className={`font-bold text-sm ${sp500Data ? (sp500Data.isUp ? "text-[#00ffaa]" : "text-[#ff4d4d]") : "text-[#00ffaa]"}`}>
                    {sp500Data ? `${sp500Data.change} (${sp500Data.percentChange})` : "+12.45 (+0.23%)"}
                  </span>
                </div>
                <div className="text-[11px] text-gray-500 mt-1 uppercase tracking-wider flex justify-between">
                  <span>INDEXSP: .INX</span>
                  <span>{sp500Data ? sp500Data.asOf : "As of Real-time"}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-[#1a1e29] space-y-2.5 text-xs text-gray-400">
                  <div className="flex justify-between border-b border-[#161a23] pb-1.5">
                    <span>Prev close</span>
                    <span className="text-gray-200 font-medium">{sp500Data?.prevClose || "5,482.75"}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#161a23] pb-1.5">
                    <span>Day range</span>
                    <span className="text-gray-200 font-medium">{sp500Data?.dayRange || "5,475.10 - 5,502.30"}</span>
                  </div>
                  <div className="flex justify-between pb-0.5">
                    <span>Year range</span>
                    <span className="text-gray-200 font-medium">{sp500Data?.yearRange || "4,350.60 - 5,600.40"}</span>
                  </div>
                </div>
              </div>
            }
          />

          <InfoCard
            title="WALL STREET"
            className="overflow-hidden"
            content={
              <div className="relative h-[150px] overflow-hidden mt-1 select-none">
                <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-[#11151d] to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-[#11151d] to-transparent z-10 pointer-events-none" />
                <div className="animate-v-marquee space-y-3 flex flex-col">
                  {[...usaIndices, ...usaIndices].map((asset, index) => (
                    <div key={index} className="flex justify-between items-center h-[35px] border-b border-[#1a1e29]/40 pb-2 shrink-0">
                      <span className="text-gray-300 font-medium text-sm">{asset?.symbol || "N/A"}</span>
                      <div className="flex flex-col items-end">
                        <span className="text-white font-bold text-sm">{asset?.price || "0.00"}</span>
                        <span className={`text-[11px] font-semibold ${asset?.isUp ? "text-[#00ffaa]" : "text-[#ff4d4d]"}`}>
                          {asset?.change || "0.00%"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          />

          <InfoCard
            title="COMMODITIES & FOREX"
            className="overflow-hidden"
            content={
              <div className="relative h-[160px] overflow-hidden mt-1 select-none">
                <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-[#11151d] to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-[#11151d] to-transparent z-10 pointer-events-none" />
                <div className="animate-v-marquee space-y-3 flex flex-col">
                  {[...commodities, ...commodities].map((asset, index) => (
                    <div key={index} className="flex justify-between items-center h-[35px] border-b border-[#1a1e29]/40 pb-2 shrink-0">
                      <span className="text-gray-300 font-medium text-sm">{asset?.symbol || "N/A"}</span>
                      <div className="flex flex-col items-end">
                        <span className="text-white font-bold text-sm">{asset?.price || "0.00"}</span>
                        <span className={`text-[11px] font-semibold ${asset?.isUp ? "text-[#00ffaa]" : "text-[#ff4d4d]"}`}>
                          {asset?.change || "0.00%"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </aside>

        {/* ORTA PANEL */}
        <section className="col-span-1 lg:col-span-6 flex flex-col items-center text-center mt-4">
          <header className="mb-8 flex flex-col items-center">
            <Image
              src="/Brands_Lord_logo_design_202606021456.png"
              alt="Brands Lord — Strategic Capital Insights"
              width={200}
              height={200}
              priority={true}
              className="h-36 w-36 rounded-2xl object-contain drop-shadow-[0_0_40px_oklch(0_0_0/0.6)]"
            />
          </header>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            AI Market Radar Online
          </div>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {slug ? `Real-Time AI Radar: ${slug.toUpperCase()}` : "What market should we analyze?"}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base lg:text-lg leading-relaxed text-muted-foreground">
            {slug 
              ? `Our AI engine is ready to run a live executive scan and generate a 4-page institutional PDF report for ${slug.toUpperCase()}.`
              : "Enter any asset, sector or competitor. Our AI scans the market in real time and delivers a sharp intelligence report straight to your inbox."}
          </p>

          <div className="mt-10 w-full">
            <MarketScanForm
              onScanStart={() => {
                setIsAnalyzing(true);
                setAiAnalysis(null);
              }}
              onScanComplete={(resultText: string) => {
                setAiAnalysis(resultText);
                setIsAnalyzing(false);
              }}
            />
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            {trustPoints.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-primary" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </section>

        {/* SAĞ PANEL */}
        <aside className="col-span-1 lg:col-span-3 flex flex-col gap-6">
          <InfoCard
            title="Tech Giants Watchlist"
            className="overflow-hidden"
            content={
              <div className="relative h-[220px] overflow-hidden mt-1 select-none">
                <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-[#11151d] to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-[#11151d] to-transparent z-10 pointer-events-none" />
                <div className="animate-v-marquee space-y-3 flex flex-col">
                  {[...techGiants, ...techGiants].map((asset, index) => (
                    <div key={index} className="flex justify-between items-center h-[40px] border-b border-[#1a1e29]/40 pb-2 shrink-0">
                      <div className="flex flex-col">
                        <span className="text-white font-bold text-sm">{asset?.symbol || "N/A"}</span>
                        <span className="text-[10px] text-gray-500 uppercase">Rank #{(index % techGiants.length) + 1} Tech</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-white font-bold text-sm">{asset?.price || "0.00"}</span>
                        <span className={`text-[11px] font-semibold ${asset?.isUp ? "text-[#00ffaa]" : "text-[#ff4d4d]"}`}>
                          {asset?.change || "0.00%"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          />

          <InfoCard
            title="GLOBAL FOREX RATES"
            className="overflow-hidden"
            content={
              <div className="relative h-[160px] overflow-hidden mt-1 select-none">
                <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-[#11151d] to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-[#11151d] to-transparent z-10 pointer-events-none" />
                <div className="animate-v-marquee space-y-3 flex flex-col">
                  {[...forexRates, ...forexRates].map((asset, index) => (
                    <div key={index} className="flex justify-between items-center h-[35px] border-b border-[#1a1e29]/40 pb-2 shrink-0">
                      <span className="text-gray-300 font-medium text-sm">{asset?.symbol || "N/A"}</span>
                      <div className="flex flex-col items-end">
                        <span className="text-white font-bold text-sm">{asset?.price || "0.00"}</span>
                        <span className={`text-[11px] font-semibold ${asset?.isUp ? "text-[#00ffaa]" : "text-[#ff4d4d]"}`}>
                          {asset?.change || "0.00%"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          />

          <InfoCard
            title="EUROPE & ASIA MARKETS"
            className="overflow-hidden"
            content={
              <div className="relative h-[160px] overflow-hidden mt-1 select-none">
                <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-[#11151d] to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-[#11151d] to-transparent z-10 pointer-events-none" />
                <div className="animate-v-marquee space-y-3 flex flex-col">
                  {[...euroAsiaIndices, ...euroAsiaIndices].map((asset, index) => (
                    <div key={index} className="flex justify-between items-center h-[35px] border-b border-[#1a1e29]/40 pb-2 shrink-0">
                      <span className="text-gray-300 font-medium text-sm">{asset?.symbol || "N/A"}</span>
                      <div className="flex flex-col items-end">
                        <span className="text-white font-bold text-sm">{asset?.price || "0.00"}</span>
                        <span className={`text-[11px] font-semibold ${asset?.isUp ? "text-[#00ffaa]" : "text-[#ff4d4d]"}`}>
                          {asset?.change || "0.00%"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </aside>
      </div>

      {/* AI TERMINAL ALANI */}
      {(isAnalyzing || aiAnalysis) && (
        <section className="z-20 w-full max-w-[1200px] px-6 mt-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="relative bg-[#11151d]/80 backdrop-blur-xl border border-primary/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,255,170,0.07)] overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#1a1e29] pb-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                  <Sparkles className="size-6 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white">BRANDS LORD — STRATEGIC AI INTELLIGENCE</h2>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Objective Market Overview & News Radar</p>
                </div>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                {isAnalyzing ? "STATUS: ANALYZING..." : "STATUS: COMPLETE"}
              </span>
            </div>

            {isAnalyzing ? (
              <div className="py-16 flex flex-col items-center justify-center space-y-4 text-center">
                <div className="size-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <p className="text-sm font-medium text-gray-300 animate-pulse">Global haber ağları taranıyor ve nesnel rapor oluşturuluyor...</p>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none text-left text-gray-300 text-sm leading-relaxed space-y-4">
                <ReactMarkdown>{aiAnalysis || ""}</ReactMarkdown>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
