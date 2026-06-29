"use server"

export type ScanState = {
  status: "idle" | "success" | "error"
  message?: string
}

export async function submitMarketScan(prevState: ScanState, formData: FormData): Promise<ScanState> {
  const query = formData.get("query") as string
  const email = formData.get("email") as string

  if (!query || !email) {
    return { status: "error", message: "Lütfen alanları doldurun." }
  }

  try {
    const response = await fetch("https://n8n.brandslord.online/webhook/site-arama", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, email, timestamp: new Date().toISOString() }),
    })

    if (!response.ok) throw new Error("n8n bağlantı hatası")

    return { status: "success", message: "Analiz talebiniz başarıyla alındı!" }
  } catch (error) {
    return { status: "error", message: "Bağlantı hatası oluştu. Lütfen tekrar deneyin." }
  }
}
