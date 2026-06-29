"use server"

export type ScanState = {
  status: "idle" | "success" | "error"
  message?: string
}

export async function submitMarketScan(prevState: ScanState, formData: FormData) {
  const market = formData.get("market");
  const email = formData.get("email");

  try {
    // Timeout süresini kontrol edin veya asenkron tetikleyin
    const response = await fetch("https://n8n.brandslord.online/webhook/site-arama", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ market, email }),
      // 'signal' ekleyerek süreyi manuel yönetebilirsiniz
    });

    if (response.ok) {
      return { 
        status: "success", 
        message: "Talebiniz alındı. Raporunuz hazırlandığında e-posta adresinize gönderilecektir." 
      };
    }
    
    return { status: "error", message: "Bağlantı hatası oluştu." };
  } catch (error) {
    return { status: "error", message: "Sunucuya bağlanılamadı." };
  }
}
