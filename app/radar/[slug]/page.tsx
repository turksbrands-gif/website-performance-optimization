
// app/radar/[slug]/page.tsx
import type { Metadata } from 'meta';
import { notFound } from 'next/navigation';

// 1. n8n veya Veritabanından Dinamik Veri Çekme Fonksiyonu
async function getAssetData(slug: string) {
  // Örnek: slug = "nvda-ai-analysis" -> ticker = "NVDA"
  const ticker = slug.split('-')[0].toUpperCase();
  
  try {
    // n8n webhook'unuzdan veya veritabanından o varlığın analizini çekiyoruz
    // ISR (Next.js önbellek) için 3600 saniyede (1 saat) bir yenileme kuralı ekliyoruz
    const res = await fetch(`https://api.brandslord.online/ticker?symbol=${ticker}`, {
      next: { revalidate: 3600 } 
    });
    
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Veri çekilemedi:", error);
    return null;
  }
}

// 2. Google İçin Dinamik SEO Metadata Üretimi
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getAssetData(params.slug);
  if (!data) return { title: 'Varlık Bulunamadı | Brands Lord' };

  return {
    title: `${data.name} (${data.ticker}) AI Market Radar & Yapay Zeka Analizi | Brands Lord`,
    description: `${data.name} hisse senedi/kripto varlığı için anlık TradingView grafikleri, kurumsal para akışı sinyalleri ve yapay zeka destekli 4 sayfalık derinlemesine finansal istihbarat raporu.`,
    openGraph: {
      title: `${data.ticker} Yapay Zeka Piyasa Analizi | Brands Lord`,
      description: `Yapay zeka motorumuzun ${data.name} için hazırladığı güncel destek/direnç ve trend raporuna göz atın.`,
      url: `https://brandslord.online/radar/${params.slug}`,
      siteName: 'Brands Lord AI Market Radar',
      type: 'article',
    },
  };
}

// 3. Sayfanın Ana Bileşeni (Server Component)
export default async function AssetRadarPage({ params }: { params: { slug: string } }) {
  const data = await getAssetData(params.slug);
  if (!data) notFound();

  // Google botlarının okuması için Yapılandırılmış Veri (JSON-LD Schema)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: `${data.name} (${data.ticker}) Analysis`,
    description: `Brands Lord AI Market Radar comprehensive report for ${data.ticker}`,
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
  };

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Üst Başlık Alanı */}
      <div className="max-w-4xl mx-auto border-b border-gray-800 pb-8 mb-8">
        <span className="text-blue-500 font-semibold tracking-wider uppercase text-sm">AI Market Radar</span>
        <h1 className="text-3xl md:text-5xl font-bold mt-2 text-white">
          {data.name} <span className="text-gray-400">({data.ticker})</span>
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Gerçek zamanlı Yahoo Finance veri akışı ve Brands Lord yapay zeka motoru ile sentezlenmiş piyasa analizi.
        </p>
      </div>

      {/* Yapay Zeka Rapor Özet Paneli (Glassmorphism) */}
      <div className="max-w-4xl mx-auto bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-xl p-6 md:p-8 mb-12 shadow-2xl">
        <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
          <span>⚡</span> Yapay Zeka Stratejik Özet Raporu
        </h2>
        
        {/* OpenAI'dan gelen zengin HTML/Metin içeriği buraya basılır */}
        <div 
          className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: data.aiSummaryHtml || data.summary }}
        />
      </div>

      {/* PDF İndirme Aksiyon Alanı (Etkileşim Tuzağı) */}
      <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-white mb-2">4 Sayfalık Detaylı Kurumsal Raporu İndirin</h3>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto text-sm">
          Bu varlığa ait temel/teknik analiz tabloları, hareketli ortalamalar ve gelecek projeksiyonlarını içeren tam PDF dokümanını e-posta adresinize anında gönderelim.
        </p>
        <a 
          href="/dashboard" 
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-8 rounded-lg shadow-lg shadow-blue-500/25 transition-all"
        >
          📄 Raporu Hazırla ve PDF İndir
        </a>
      </div>
    </main>
  );
}
