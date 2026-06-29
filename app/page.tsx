import Image from "next/image"
import { Activity, Radar, ShieldCheck } from "lucide-react"
import { MarketScanForm } from "@/components/market-scan-form"

const trustPoints = [
  { icon: Radar, label: "Real-time market radar" },
  { icon: Activity, label: "AI sentiment & trend signals" },
  { icon: ShieldCheck, label: "Private, report-only delivery" },
]

export default function Page() {
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

        <div className="mt-10">
          <MarketScanForm />
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
