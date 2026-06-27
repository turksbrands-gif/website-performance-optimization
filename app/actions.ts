"use server"

// Veri tipi tanımlaması
export type ScanState = {
  status: "idle" | "success" | "error"
  message?: string
}

/**
 * Pazar analizi talebini n8n webhook'una gönderen Server Action
 */
export async function submitMarketScan(
  prevState: ScanState,
  formData: FormData
): Promise<ScanState> {
  // Formdan gelen verileri al
  const market = formData.get("market") as string
  const email = formData.get("email") as string

  // 1. Basit validasyon kontrolü
  if (!market || !email) {
    return { 
      status: "error", 
      message: "Lütfen hem pazar adını hem de e-posta adresini girin." 
    }
  }

  // E-posta formatı basit kontrolü
  if (!email.includes("@")) {
    return { status: "error", message: "Lütfen geçerli bir e-posta adresi girin." }
  }

  try {
    const n8nWebhookUrl = "https://n8n.brandslord.online/webhook/site-arama"

    // 2. n8n'e POST isteği at
    const response = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        market: market, 
        email: email,
        timestamp: new Date().toISOString()
      }),
    })

    // Yanıt başarılı değilse hata fırlat
    if (!response.ok) {
      throw new Error("n8n sunucusundan yanıt alınamadı")
    }

    // 3. Başarılı sonuç dönüşü
    return {
      status: "success",
      message: `${market} için analiz talebiniz başarıyla alındı! Yapay zeka raporunuz kısa süre içinde ${email} adresinize iletilecektir.`,
    }

  } catch (error) {
    console.error("Action Hatası:", error)
    
    // 4. Hata durumunda kullanıcıya bilgilendirme
    return {
      status: "error",
      message: "Bağlantı hatası oluştu. Lütfen daha sonra tekrar deneyin.",
    }
  }
}
