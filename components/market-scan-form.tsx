"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  Search,
  TrendingUp,
} from "lucide-react"
import { submitMarketScan, type ScanState } from "@/app/actions"

const initialState: ScanState = { status: "idle" }

// 1. ADIM (BURAYA EKLENDİ): Ana sayfadaki terminali yöneten fonksiyon tipleri
interface MarketScanFormProps {
  onScanStart?: () => void;
  onScanComplete?: (resultText: string) => void;
}

// 2. ADIM (BURAYA EKLENDİ): Bileşene bu propları kabul etmesini söyledik
export function MarketScanForm({ onScanStart, onScanComplete }: MarketScanFormProps = {}) {
  const [step, setStep] = useState<1 | 2>(1)
  const [market, setMarket] = useState("")
  const [state, formAction, isPending] = useActionState(
    submitMarketScan,
    initialState,
  )
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (step === 2) emailRef.current?.focus()
  }, [step])

  // --- 3. ADIM (TAM OLARAK BURAYA EKLENDİ) ---
  // Form gönderilirken ana sayfadaki dönen "Taranıyor..." animasyonunu açar
  useEffect(() => {
    if (isPending && onScanStart) {
      onScanStart()
    }
  }, [isPending, onScanStart])

  // Server Action bittiğinde dönen analiz raporunu ana sayfaktaki terminale fırlatır
  useEffect(() => {
    if (state.status === "success") {
      const outputMarkdown = state.message || "### 🤖 Analiz Raporu\n\nTarama başarıyla tamamlandı."
      if (onScanComplete) {
        onScanComplete(outputMarkdown)
      }
    }
  }, [state, onScanComplete])
  // -------------------------------------------

  function goToStep2() {
    if (market.trim() === "") return
    setStep(2)
  }

  if (state.status === "success") {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-primary/30 bg-card/60 p-8 text-center backdrop-blur-xl">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </div>
        <h2 className="text-balance text-2xl font-bold text-foreground">
          Scan complete
        </h2>
        <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
          {state.message}
        </p>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      className="mx-auto max-w-2xl rounded-2xl border border-border bg-card/50 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl"
    >
      <input type="hidden" name="market" value={market} />

      {step === 1 ? (
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <label htmlFor="market" className="sr-only">
              Market or sector to analyze
            </label>
            <input
              id="market"
              type="text"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  goToStep2()
                }
              }}
              placeholder="Type an asset, sector or competitor..."
              className="w-full rounded-xl border border-input bg-background/80 py-4 pl-12 pr-4 text-lg text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            type="button"
            onClick={goToStep2}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition hover:opacity-90 active:scale-[0.98]"
          >
            Scan Market
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-2 pt-1 text-sm text-muted-foreground">
            <TrendingUp className="size-4 text-primary" aria-hidden="true" />
            <span className="truncate">
              Analyzing{" "}
              <span className="font-semibold text-foreground">{market}</span>
            </span>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="ml-auto shrink-0 text-xs font-medium text-primary underline-offset-4 hover:underline"
            >
              Change
            </button>
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Mail
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <label htmlFor="email" className="sr-only">
                Corporate email address
              </label>
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your corporate email..."
                className="w-full rounded-xl border border-primary/60 bg-background/80 py-4 pl-12 pr-4 text-lg text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                  Sending
                </>
              ) : (
                <>Send Report</>
              )}
            </button>
          </div>
        </div>
      )}

      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="px-3 pb-1 pt-3 text-sm font-medium text-destructive"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  )
}
