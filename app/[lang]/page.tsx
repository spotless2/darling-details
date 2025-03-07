import { Suspense } from 'react'
import Header from "@/components/layout/Header"
import { getDictionary } from '@/lib/getDictionary'
import { Locale } from '@/i18n/config'
import FeaturedCollections from '@/components/home/FeaturedCollections'
import Hero from '@/components/home/Hero'
import TestimonialsSection from '@/components/home/TestimonialsSection'

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      <Header lang={lang} dict={dict} />
      <main>
        <Hero dict={dict} />
        <Suspense fallback={<div>Loading collections...</div>}>
          <FeaturedCollections dict={dict} />
        </Suspense>
        <Suspense fallback={<div>Loading testimonials...</div>}>
          <TestimonialsSection dict={dict} />
        </Suspense>
      </main>
    </div>
  )
}
