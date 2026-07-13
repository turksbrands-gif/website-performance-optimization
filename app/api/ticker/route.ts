import { NextResponse } from 'next/server';

// Bu iki satır Next.js'e bu dosyanın %100 dinamik olduğunu söyler
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) { // <-- DİKKAT: 'request' parametresini ekledik
  // Yerel ortamda SSL sertifika hatalarını kesin olarak ezmek için (Canlıdaysanız bunu silin)
  

  try {
    // 1. Next.js'in bu isteği önbelleğe almasını KESİN olarak engellemek için URL'in sonuna rastgele bir sayı ekliyoruz.
    const url = new URL(request.url);
    const ts = url.searchParams.get('nocache') || Date.now().toString();
    
    // n8n Webhook adresinizin sonuna bu zaman damgasını ekleyelim (n8n bunu görmezden gelir, ama Next.js yeni bir istek sanır)
    const n8nUrl = `https://n8n.brandslord.online/webhook/market-pulse-data?t=${ts}`;

    const response = await fetch(n8nUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store', 
    });

    if (!response.ok) {
      return NextResponse.json([]);
    }

    const data = await response.json();
    
    // 2. Tarayıcının da (Client) bu veriyi hafızasında tutmasını engellemek için özel başlıklar (headers) gönderiyoruz
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });

  } catch (error) {
    console.error('Rota hatası:', error);
    return NextResponse.json([]);
  }
}
