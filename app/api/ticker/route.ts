import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const ts = url.searchParams.get('nocache') || Date.now().toString();
    const n8nUrl = `https://n8n.brandslord.online/webhook/market-pulse-data?t=${ts}`;

    // --- N8N GİRİŞ BİLGİLERİNİZİ BURAYA YAZIN ---
    // n8n paneline girerken kullandığınız e-posta ve şifreyi buraya girin:
    const username = 'turksbrands@gmail.com'; 
    const password = 'Elaoguz2024.';
    
    // Bilgileri n8n'in anlayacağı Basic Auth formatına şifreliyoruz
    const authBuffer = Buffer.from(`${username}:${password}`).toString('base64');

    const response = await fetch(n8nUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${authBuffer}` // <--- KAPIDAKİ GÜVENLİĞE KİMLİK GÖSTERİYORUZ
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
