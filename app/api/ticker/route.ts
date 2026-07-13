
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Yerel ortamda SSL sertifika hatalarını kesin olarak ezmek için
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  try {
    const response = await fetch('https://n8n.brandslord.online/webhook/market-pulse-data', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',      // <--- İŞTE TAM BURAYA EKLENİYOR
      next: { revalidate: 0 } // Next.js native önbellek iptali
    });

    if (!response.ok) {
      // n8n hata verse bile 500 fırlatma, önyüzün çökmesini engellemek için boş dizi dön
      return NextResponse.json([]);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Rota hatası:', error);
    // Hata durumunda 500 fırlatmak yerine boş dizi dönerek sistemi rahatlatıyoruz
    return NextResponse.json([]);
  }
}
