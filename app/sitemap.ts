// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Sabit (statik) sayfalarınız
  const staticRoutes = [
    { url: 'https://brandslord.online', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: 'https://brandslord.online/dashboard', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
  ];

  // Hedeflediğimiz popüler varlıklar listesi (Bunu n8n'den veya veritabanınızdan da çekebilirsiniz)
  const popularTickers = [
    'nvda-ai-analysis', 'aapl-market-radar', 'btc-crypto-report', 
    'eth-market-analysis', 'tsla-stock-radar', 'msft-ai-report',
    'amd-stock-analysis', 'sol-crypto-radar', 'amzn-market-report'
  ];

  // Her varlık için dinamik sitemap rotası oluşturuyoruz
  const dynamicRoutes = popularTickers.map((slug) => ({
    url: `https://brandslord.online/radar/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const, // Veriler saatlik yenilendiği için Google'a saatlik gel diyoruz
    priority: 0.8,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
