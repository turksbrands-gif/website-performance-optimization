use client'

import { useState } from 'react'



export function MarketScanForm() {

  const [query, setQuery] = useState('')

  const [email, setEmail] = useState('')

  const [loading, setLoading] = useState(false)



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    setLoading(true)



    const webhookUrl = 'https://n8n.brandslord.online/webhook/site-arama'



    try {

      const response = await fetch(webhookUrl, {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({

          query: query,

          email: email

        }) // <--- Parantezleri buraya kapattık

      }) // <--- Fetch fonksiyonunu burada kapattık



      if (response.ok) {

        alert('Your intelligence request has been received. Your report will be sent to your email as soon as possible.')

      }

    } catch (error) {

      console.error('Hata:', error)

      alert('The system is currently busy; please try again.')

    } finally {

      setLoading(false)

    }

  }



  return (

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

    </form>

  )

}
