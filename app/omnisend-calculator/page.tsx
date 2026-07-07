"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, MessageSquare, ArrowRight, TrendingUp, ShieldCheck, Zap } from "lucide-react";

const InfoCard = ({ title, content, className = "" }: { title: string; content: string | React.ReactNode; className?: string }) => (
  <div className={`bg-[#11151d]/60 backdrop-blur-md border border-[#1a1e29] rounded-2xl p-5 shadow-2xl transition-all hover:border-primary/40 ${className}`}>
    <h3 className="text-primary text-sm font-semibold mb-3 uppercase tracking-wider">{title}</h3>
    <div className="text-gray-400 text-sm leading-relaxed">{content}</div>
  </div>
);

export default function OmnisendCalculatorPage() {
  // Dinamik Hesaplayıcı State'leri
  const [visitors, setVisitors] = useState(50000);
  const [aov, setAov] = useState(75); // Ortalama Sepet Tutarı (AOV)

  // Basit ROI Formülü: Sektör ortalaması %70 sepet terk oranıdır. 
  // Omnisend'in otomasyonları bunun %15-20'sini geri kazanabilir.
  const abandonedCarts = visitors * 0.05; // %5 sepete ekleme oranı varsayımı
  const recoveredSales = Math.floor(abandonedCarts * 0.70 * 0.18); // %70 terk, %18 geri kazanım
  const extraRevenue = recoveredSales * aov;

  return (
    <main className="bg-[#0b0e14] bg-grid relative flex min-h-screen flex-col items-center overflow-x-hidden pt-16 pb-20">
      
      {/* Ortam Işığı / Ambient Glow */}
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-[300px] w-[1000px] max-w-[100vw] -translate-x-1/2 rounded-full bg-primary/15 blur-[150px]" />

      <div className="z-10 w-full max-w-[1200px] px-6 mt-12 flex flex-col items-center text-center">
        
        {/* Üst Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          <Zap className="size-4" />
          E-Commerce Automation Analysis
        </div>

        {/* Hero Başlık */}
        <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl max-w-4xl">
          Mevcut E-Posta Altyapınızda Ne Kadar <span className="text-primary">Para Kaybediyorsunuz?</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base lg:text-lg leading-relaxed text-gray-400">
          Shopify altyapınıza standart araçlar yerine <strong>Omnichannel (Email + SMS)</strong> bir otomasyon entegre ederek sepet terk oranlarını düşürün ve doğrudan gelirinizi artırın.
        </p>

        {/* Dinamik ROI Hesaplayıcı Kartı */}
        <div className="mt-12 w-full max-w-3xl bg-[#11151d]/80 backdrop-blur-xl border border-primary/30 rounded-3xl p-8 lg:p-12 shadow-[0_0_50px_rgba(0,255,170,0.07)] text-left relative overflow-hidden">
          
          <div className="mb-8 border-b border-[#1a1e29] pb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <TrendingUp className="text-primary" /> Dinamik Gelir Hesaplayıcı
            </h2>
            <p className="text-sm text-gray-400 mt-2">Mevcut site trafiğiniz ve sepet tutarınızla yapılabilecek ek ciro potansiyelini görün.</p>
          </div>

          <div className="space-y-8">
            {/* Slider 1: Aylık Ziyaretçi */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-medium text-gray-300">Aylık Tekil Ziyaretçi (Traffic)</label>
                <span className="text-xl font-bold text-white">{visitors.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="5000" 
                max="500000" 
                step="5000"
                value={visitors} 
                onChange={(e) => setVisitors(Number(e.target.value))}
                className="w-full h-2 bg-[#1a1e29] rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Slider 2: AOV */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-medium text-gray-300">Ortalama Sepet Tutarı (AOV)</label>
                <span className="text-xl font-bold text-white">${aov.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="500" 
                step="5"
                value={aov} 
                onChange={(e) => setAov(Number(e.target.value))}
                className="w-full h-2 bg-[#1a1e29] rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Sonuç Alanı */}
            <div className="mt-10 p-6 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-2xl flex flex-col items-center text-center">
              <span className="text-sm text-primary uppercase tracking-wider font-semibold mb-2">Omnisend ile Tahmini Ekstra Aylık Ciro</span>
              <span className="text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                ${extraRevenue.toLocaleString()}
              </span>
              <p className="text-xs text-gray-500 mt-4">*Sektör standartlarında %70 terk edilen sepetin, %18'inin çok kanallı otomasyonla kurtarıldığı varsayılmıştır.</p>
            </div>
          </div>

          {/* Aksiyon Butonu */}
          <div className="mt-8 flex justify-center">
            {/* BURAYA IMPACT.COM OMNISEND AFFILIATE LINKINIZ GELECEK */}
            <a href="HEDEFLINK" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-primary hover:bg-primary/90 text-[#0b0e14] font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,255,170,0.4)] hover:shadow-[0_0_30px_rgba(0,255,170,0.6)] hover:-translate-y-1">
              Sistemi Ücretsiz Deneyin <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Güven ve Özellik Kartları */}
        <div className="mt-16 w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <InfoCard 
            title="Neden Mevcut Aracınızı Değiştirmelisiniz?" 
            content="Standart newsletter araçları B2C kitle iletişimi içindir. E-ticaret büyümesi, ürün davranışlarına dayalı anlık tepki veren akıllı otomasyonlar gerektirir."
          />
          <InfoCard 
            title="Çok Kanallı Güç (Email + SMS)" 
            content="Müşteriye sepetini terk ettiği ilk 15 dakikada SMS, 1 saat sonra kişiselleştirilmiş e-posta göndererek geri kazanım oranınızı maksimize edin."
          />
          <InfoCard 
            title="Tek Tıkla Shopify Entegrasyonu" 
            content="Mevcut veritabanınızı içeri aktarmak ve geçmiş satın alma verilerini senkronize etmek sadece birkaç dakika sürer. Geliştirici gerektirmez."
          />
        </div>

      </div>
    </main>
  );
}
