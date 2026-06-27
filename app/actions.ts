"use server"

export type ScanState = {
  status: "idle" | "success" | "error"
  message?: string
}

export async function submitMarketScan(prevState: ScanState, formData: FormData): Promise<ScanState> {
  // ... (Senin paylaştığın kodun tamamı buraya gelecek)
}
  const market = formData.get("market") as string
  const email = formData.get("email") as string

  // Boş gönderimleri engelle
  if (!market || !email) {
    return { status: "error", message: "Lütfen hem pazar adını hem de e-posta adresini girin." }
  }

  try {
    // DİKKAT: Buraya n8n Webhook URL'nizi yapıştırın!
    // Örnek: "https://n8n.brandslord.online/webhook/1234abcd-5678-..."
    const n8nWebhookUrl = "https://n8n.brandslord.online/webhook/site-arama"

    // n8n sunucumuza verileri arka planda (güvenli bir şekilde) gönderiyoruz
    const response = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // n8n'e gidecek JSON paketi
      body: JSON.stringify({ 
        market: market, 
        email: email,
        timestamp: new Date().toISOString()
      }),
    })

    if (!response.ok) {
      throw new Error("n8n sunucusuna ulaşılamadı")
    }

    // İşlem başarılıysa yeşil tikli başarı mesajını ekrana yansıt
    return {
      status: "success",
      message: `${market} için analiz talebiniz başarıyla alındı! Yapay zeka raporunuz kısa süre içinde ${email} adresinize iletilecektir.`,
    }
  } catch (error) {
    // Hata durumunda formu kırmızı uyarıya geçir
    return {
      status: "error",
      message: "Bağlantı hatası oluştu. Lütfen daha sonra tekrar deneyin.",
    }
  }
}
