import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const ts = url.searchParams.get('nocache') || Date.now().toString();
    const n8nUrl = `https://n8n.brandslord.online/webhook/market-pulse-data?t=${ts}`;


    const response = await fetch(n8nUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        },
      cache: 'no-store', 
    });

    if (!response.ok) {
      return NextResponse.json({ 
        hata: "n8n_red_etti", 
        durum_kodu: response.status, 
        mesaj: response.statusText 
      });
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });

  } catch (error: any) {
    console.error('Rota hatası:', error);
    return NextResponse.json({ 
      hata: "baglanti_koptu", 
      detay: error.message 
    });
  }
}
