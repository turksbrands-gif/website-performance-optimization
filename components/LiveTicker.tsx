'use client';

import React, { useEffect, useState } from 'react';

interface MarketData {
  symbol: string;
  price: string;
  change: string;
  isUp: boolean;
}

export function LiveTicker() {
  const [tickerData, setTickerData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = '/api/ticker';

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Veri çekilemedi');
        
        const rawData = await response.json();
        let data: MarketData[] = [];

        if (Array.isArray(rawData)) {
          data = rawData.map(d => d.json || d);
        } else if (rawData && typeof rawData === 'object') {
          const single = (rawData as any).json || rawData;
          data = [single];
        }

        if (data && data.length > 0) {
          const targetCryptos = ["BTC", "ETH", "SOL", "BNB", "DOGE", "LTC", "XMR", "XAUt", "PAXG"];
          
          const cryptos = data.filter(item => 
            item && item.symbol && targetCryptos.includes(item.symbol.toUpperCase())
          );
          
          if (cryptos.length > 0) {
            setTickerData(cryptos);
          } else {
            useFallback();
          }
        } else {
          useFallback();
        }
      } catch (error) {
        console.error('Ticker veri hatası:', error);
        useFallback();
      } finally {
        setLoading(false);
      }
    };

    const useFallback = () => {
      setTickerData([
        { symbol: 'BTC', price: '$58,779.78', change: '↓ -2.26%', isUp: false },
        { symbol: 'ETH', price: '$2,645.12', change: '↑ 1.15%', isUp: true },
        { symbol: 'SOL', price: '$142.50', change: '↑ 3.40%', isUp: true },
        { symbol: 'BNB', price: '$590.20', change: '↑ 1.20%', isUp: true },
        { symbol: 'DOGE', price: '$0.1050', change: '↑ 0.50%', isUp: true },
      ]);
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-[#0b0e14] border-b border-[#1a1e29] h-10 flex items-center justify-center text-xs text-gray-500 font-sans tracking-wide">
        Loading real-time market data...
      </div>
    );
  }

  const safeList = Array.isArray(tickerData) ? tickerData : [];

  return (
    <div className="w-full h-10 overflow-hidden bg-[#0b0e14]/90 backdrop-blur-sm border-b border-[#1a1e29] flex items-center justify-between select-none px-6 relative">
      
      {/* DERLEYİCİYİ BYPASS EDEN STANDART HTML ENJEKSİYONU */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ticker-scroll-production {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-live-ticker-prod {
          display: flex;
          white-space: nowrap;
          animation: ticker-scroll-production 25s linear infinite !important;
        }
        .animate-live-ticker-prod:hover {
          animation-play-state: paused !important;
        }
      `}} />

      <div className="flex-1 overflow-hidden flex items-center">
        <div className="animate-live-ticker-prod">
          {safeList.length > 0 ? (
            [...safeList, ...safeList, ...safeList].map((item, index) => (
              <div key={index} className="inline-flex items-center px-6 font-sans text-xs">
                <span className="text-gray-400 font-medium mr-8">{item?.symbol || "N/A"}</span>
                <span className="text-white font-semibold mr-8">{item?.price || "0.00"}</span>
                <span className={`text-[16px] font-medium ${item?.isUp ? 'text-[#00ffaa]' : 'text-[#ff4d4d]'}`}>
                  {item?.change || "0.00%"}
                </span>
              </div>
            ))
          ) : (
            <span className="text-gray-500 px-16 text-xs">No live feed available</span>
          )}
        </div>
      </div>
    </div>
  );
}
