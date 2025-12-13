import type { Metadata } from 'next'
import { Crimson_Text, Caveat } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-crimson'
})

const caveat = Caveat({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-caveat'
})

export const metadata: Metadata = {
  title: 'Dear Diary - My Personal Journal',
  description: 'Thoughts, musings, and moments from my everyday life',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${crimsonText.variable} ${caveat.variable} font-serif`}>
        <div className="min-h-screen flex flex-col bg-cream">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
