import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://brandslord.online'

  // Google'ın indeksleyip arama sonuçlarında göstereceği en popüler varlıklar
  // Bu kelimeler senin mevcut app/radar/[slug] yapına bağlanacak!
  const popularMarkets = [
    // Teknoloji Devleri & ABD Borsası
    'nvda', 'aapl', 'tsla', 'msft', 'amzn', 'googl', 'meta', 'nflx', 'amd', 'pltr',
    // Kripto Paralar
    'bitcoin', 'ethereum', 'solana', 'xrp', 'bnb', 'dogecoin',
    // Emtialar & Endeksler
    'gold', 'silver', 'brent-oil', 'sp500', 'nasdaq', 'dow-jones',
    // Global & Forex
    'usd-try', 'eur-usd', 'global-economy', 'ai-sector', 'semiconductors'
  ]

  // Popüler varlıklar için dinamik URL listesi üretiyoruz
  const radarUrls = popularMarkets.map((market) => ({
    url: `${baseUrl}/radar/${market}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...radarUrls,
  ]
}
