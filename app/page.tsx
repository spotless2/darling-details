import { getDictionary } from '@/lib/getDictionary'
import { Locale } from '@/i18n/config'

export default async function Home() {
  // Default to English for initial testing
  const dict = await getDictionary('en' as Locale)
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center">
          <span className="relative">
            <span className="absolute inset-0 bg-gradient-to-r from-primary/90 via-purple-500 to-primary blur-2xl opacity-50" />
            <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary animate-gradient bg-300%">
              {dict.hero.subtitle}
            </span>
          </span>
        </h1>
      </main>
    </div>
  )
}
