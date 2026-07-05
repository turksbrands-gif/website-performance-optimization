"use server"

export type ScanState = {
  status: "idle" | "success" | "error"
  message?: string
  reportText?: string // AI raporunu taşımak için yeni alan
}

export async function submitMarketScan(prevState: ScanState, formData: FormData): Promise<ScanState> {
  // Bu fonksiyon artık form bileşeni içindeki doğrudan n8n fetch mimarisiyle destekleneceği için 
  // formun temel doğrulamasını ve state yönetimini simüle eder.
  return { 
    status: "success", 
    message: "Your request has been received. Your report will be sent to your e-mail address once it is prepared." 
  };
}
