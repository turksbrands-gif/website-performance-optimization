'use client'
import { useState } from 'react'

export function MarketScanForm() {
  const [query, setQuery] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  // Form gönderimi (Submit mantığı)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // ... (n8n fetch isteği burada kalacak)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
      <input 
        value={query} onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white"
        placeholder="Type an asset, sector or competitor..." required 
      />
      <input 
        value={email} onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white"
        type="email" placeholder="Enter your email..." required 
      />
      <button type="submit" disabled={loading} className="bg-primary p-4 rounded-xl font-bold">
        {loading ? 'Scanning...' : 'Scan Market →'}
      </button>
    </form>
  )
}
