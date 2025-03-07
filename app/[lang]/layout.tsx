import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Toaster } from "@/components/ui/toaster"
import { i18n } from '@/i18n/config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Darling Details - Premium Event Decoration Rentals',
  description: 'Transform your special events with our premium collection of event decorations. From elegant weddings to intimate celebrations, we provide the perfect touches to make your event truly special.',
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={lang}>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
