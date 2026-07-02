"use client";

import React, { useEffect, useRef } from 'react';

export function TradingViewChart({ symbol }: { symbol: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    // Her render'da mükerrer grafik oluşmaması için temizlik yapıyoruz
    container.current.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbol": symbol,
      "width": "100%",
      "height": "100%",
      "locale": "tr",
      "dateRange": "12M",
      "colorTheme": "dark",
      "isTransparent": true,
      "autosize": true,
      "largeChartUrl": ""
    });

    container.current.appendChild(script);
  }, [symbol]);

  return (
    <div className="bg-[#11151d]/40 backdrop-blur-md border border-[#1a1e29] rounded-2xl p-2 h-48 w-full overflow-hidden flex items-center justify-center">
      <div className="tradingview-widget-container w-full h-full" ref={container}>
        <div className="tradingview-widget-container__widget w-full h-full"></div>
      </div>
    </div>
  );
}
