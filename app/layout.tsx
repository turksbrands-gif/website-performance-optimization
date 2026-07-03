import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Brands Lord - AI Market Radar',
  description: 'Brandlord scans any market or sector with AI and delivers a sharp intelligence report...',
  verification: {
    google: 'ECHrIzzgXsBKVs26cca2xc1DLJFiV9wHbeUGeLqoSww',
  },
};
  
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0f19',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        
        {/* --- ÜST MENÜ (NAVBAR) BAŞLANGICI --- */}
        <nav style={{ padding: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <a 
            href="https://terminal.brandslord.online/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#050505",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "15px",
              borderRadius: "6px",
              border: "1px solid #333333",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            📡 Live Market Pulse
          </a>
        </nav>
        {/* --- ÜST MENÜ (NAVBAR) BİTİŞİ --- */}

        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
