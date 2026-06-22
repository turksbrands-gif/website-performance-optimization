import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Brandlord | AI Market Intelligence',
  description:
    'Brandlord scans any market or sector with AI and delivers a sharp intelligence report straight to your inbox.',
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
  {/* BLOG MENÜSÜ BURAYA EKLENDİ */}
  <nav style={{ padding: '20px', display: 'flex', justifyContent: 'flex-end' }}>
    <a 
      href="/blog" 
      style={{ 
        color: '#ffffff', 
        textDecoration: 'none', 
        fontSize: '18px', 
        fontWeight: 'bold', 
        border: '1px solid #333', 
        padding: '5px 15px', 
        borderRadius: '8px' 
      }}
    >
      Blog
    </a>
  </nav>

  {children}
  {process.env.NODE_ENV === 'production' && <Analytics />}
</body>
    </html>
  )
}
