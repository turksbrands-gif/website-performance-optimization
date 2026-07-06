"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  Search,
  TrendingUp,
} from "lucide-react"

interface MarketScanFormProps {
  onScanStart?: () => void;
  onScanComplete?: (resultText: string) => void;
}

export function MarketScanForm({ onScanStart, onScanComplete }: MarketScanFormProps = {}) {
  const [step, setStep] = useState<1 | 2>(1)
  const [market, setMarket] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [isPending, setIsPending] = useState(false)
  
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (step === 2) {
      emailRef.current?.focus()
    }
  }, [step])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!market.trim() || !email.trim() || isPending) return;

    setIsPending(true);
    if (onScanStart) onScanStart();

    try {
      const response = await fetch("https://n8n.brandslord.online/webhook/site-arama", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ market, email }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // --- AKILLI VERİ AYIKLAYICI ---
        let aiResultText = "";

        // 1. Durum: n8n'den dizi [{ content: [{ text: "..." }] }] formatında geldiyse
        if (Array.isArray(data) && data.length > 0) {
          const firstItem = data[0];
          if (firstItem?.content && Array.isArray(firstItem.content) && firstItem.content.length > 0) {
            aiResultText = firstItem.content[0].text || firstItem.content[0].output_text || "";
          } else if (typeof firstItem === "string") {
            aiResultText = firstItem;
          }
        }

        // 2. Durum: Standart JSON nesnesi olarak geldiyse
        if (!aiResultText && typeof data === "object" && data !== null) {
          if (data.content && Array.isArray(data.content) && data.content.length > 0) {
            aiResultText = data.content[0].text || "";
          } else {
            aiResultText = data.output || data.text || data.ai_analysis || data.message || "";
          }
        }

        // 3. Durum: Hiçbiri değilse ve doğrudan metinse al, yoksa JSON string bas
        if (!aiResultText) {
          aiResultText = typeof data === "string" ? data : JSON.stringify(data, null, 2);
        }
        // ------------------------------

        setStatus("success");
        
        if (onScanComplete) {
          onScanComplete(aiResultText);
        }
      } else {
        setStatus("error");
        setErrorMessage("An unexpected response was received from the server. Please try again.");
        if (onScanComplete) onScanComplete("### ⚠️ Connection Error\nServer returned an error status.");
      }
    } catch (err) {
      console.error("n8n tarama hatası:", err);
      setStatus("error");
      setErrorMessage("Could not connect to the AI radar network. Please check your connection.");
      if (onScanComplete) onScanComplete("### ⚠️ System Error\nFailed to fetch live AI report.");
    } finally {
      setIsPending(false);
    }
  };

  function goToStep2() {
    if (market.trim() === "") return
    setStep(2)
  }

 if (status === "success") {
    // Paylaşım için önceden hazırlanmış viral metinler
    const tweetText = encodeURIComponent(
      `🚨 I just ran a live strategic AI market scan for "${market.toUpperCase()}" using Brands Lord AI Radar!\n\nHere are the real-time financial intelligence signals 👇`
    );
    const shareUrl = encodeURIComponent("https://brandslord.online");
    const twitterShareLink = `https://twitter.com/intent/tweet?text=${tweetText}&url=${shareUrl}`;
    const linkedinShareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;

    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-primary/30 bg-card/60 p-8 text-center backdrop-blur-xl animate-in fade-in duration-500">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </div>
        <h2 className="text-balance text-2xl font-bold text-foreground">
          Scan complete for <span className="text-primary uppercase">{market}</span>
        </h2>
        <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
          Your strategic market radar analysis has been generated successfully and displayed below. A copy has also been dispatched to your corporate inbox.
        </p>

        {/* --- VİRAL PAYLAŞIM ALANI --- */}
        <div className="mt-6 rounded-xl border border-border/60 bg-background/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            🔥 Share this insight with your network
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              href={twitterShareLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1DA1F2]/10 px-4 py-2 text-xs font-bold text-[#1DA1F2] transition hover:bg-[#1DA1F2]/20"
            >
              <span>Share on X (Twitter)</span>
            </a>
            <a
              href={linkedinShareLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0A66C2]/10 px-4 py-2 text-xs font-bold text-[#0A66C2] transition hover:bg-[#0A66C2]/20"
            >
              <span>Post on LinkedIn</span>
            </a>
          </div>
        </div>
        {/* ----------------------------- */}

        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setStep(1);
            setMarket("");
            setEmail("");
          }}
          className="mt-6 inline-flex items-center text-xs font-semibold text-primary underline underline-offset-4 hover:opacity-80"
        >
          Analyze another market
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-2xl border border-border bg-card/50 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl"
    >
      {step === 1 ? (
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
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
              Analyzing <span className="font-semibold text-foreground">{market}</span>
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
              <input
                ref={emailRef}
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  Analyzing Market...
                </>
              ) : (
                <>Send & Show Report</>
              )}
            </button>
          </div>
        </div>
      )}

      {status === "error" && errorMessage ? (
        <p role="alert" className="px-3 pb-1 pt-3 text-sm font-medium text-destructive">
          {errorMessage}
        </p>
      ) : null}
    </form>
  )
}
