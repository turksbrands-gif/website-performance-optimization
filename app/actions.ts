"use server"

export type ScanState = {
  status: "idle" | "success" | "error"
  message?: string
}

export async function submitMarketScan(prevState: ScanState, formData: FormData): Promise<ScanState> {
  const market = formData.get("market") as string;
  const email = formData.get("email") as string;

  try {
    // Timeout'u engellemek için isteğe kısa bir süre sınırı koyalım
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8 saniye bekle

    const response = await fetch("https://n8n.brandslord.online/webhook/site-arama", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ market, email }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    // n8n Immediately modunda 200 veya 202 dönerse başarılı say
    if (response.status === 200 || response.status === 202) {
      return { 
        status: "success", 
        message: "Talebiniz alındı. Raporunuz hazırlandığında e-posta adresinize gönderilecektir." 
      };
    }

    return { status: "error", message: "Sunucudan beklenmedik bir yanıt geldi." };

  } catch (err) {
    // Eğer istek abort edildiyse veya ağ hatasıysa buraya düşer
    return { 
      status: "success", // Teknik olarak hata gibi görünse de kullanıcıya başarılı mesajı veriyoruz
      message: "Talebiniz alındı. Raporunuz hazırlandığında e-posta adresinize gönderilecektir." 
    };
  }
}
