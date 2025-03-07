import { useTranslation } from 'react-i18next';
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              >
                {t('hero.title')}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
              >
                {t('hero.subtitle')}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  {t('hero.cta')}
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              {t('products.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('products.weddings')}
                  </h3>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('products.baptism')}
                  </h3>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('products.events')}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}