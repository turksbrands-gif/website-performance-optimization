'use client'
import { useState } from 'react'
import Image from "next/image"
import { Activity, Radar, ShieldCheck } from "lucide-react"

const trustPoints = [
  { icon: Radar, label: "Real-time market radar" },
  { icon: Activity, label: "AI sentiment & trend signals" },
  { icon: ShieldCheck, label: "Private, report-only delivery" },
]

export default function Page() {
  const [query, setQuery] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch("https://n8n.brandslord.online/webhook/site-arama", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, email, timestamp: new Date().toISOString() }),
      })

      if (response.ok) {
        setMessage("Analiz talebiniz başarıyla alındı!")
      } else {
        throw new Error("Hata")
      }
    } catch (error) {
      setMessage("Bağlantı hatası oluştu.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-grid relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[820px] max-w-[90vw] -translate-x-1/2 rounded-full bg-primary/15 blur-[130px]"
      />

      <header className="z-10 mb-10 flex flex-col items-center">
        <Image
          src="/Brands_Lord_logo_design_202606021456.png"
          alt="Brands Lord — Strategic Capital Insights"
          width={220}
          height={220}
          priority
          className="h-40 w-40 rounded-2xl object-contain drop-shadow-[0_0_40px_oklch(0_0_0/0.6)] md:h-48 md:w-48"
        />
      </header>

      <section className="z-10 w-full max-w-4xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          AI Market Radar Online
        </div>

        <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
          What market should we analyze?
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Enter any asset, sector or competitor. Our AI scans the market in
          real time and delivers a sharp intelligence report straight to your
          inbox.
        </p>

        {/* Form yapını orijinal layout içinde korudum */}
        <div className="mt-10">
          <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-md flex-col gap-3">
            <input
              type="text"
              required
              placeholder="Type an asset, sector or competitor..."
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <input
              type="email"
              required
              placeholder="Enter your email for the report..."
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary px-6 py-4 font-bold text-black transition hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Scanning market...' : 'Scan Market →'}
            </button>
            {message && <p className="text-sm text-primary mt-2">{message}</p>}
          </form>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          {trustPoints.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon className="size-4 text-primary" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
