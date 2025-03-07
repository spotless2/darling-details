import { useTranslation } from 'react-i18next';
import Header from "@/components/layout/Header";

export default function Products() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      <Header />
      <main className="container mx-auto px-6 pt-24">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">{t('products.title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=60" 
              alt="Wedding Decorations" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('products.weddings')}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Elegant centerpieces, romantic lighting, and sophisticated table settings for your perfect wedding day.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1515816052601-210d5501d471?w=800&auto=format&fit=crop&q=60" 
              alt="Baptism Essentials" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('products.baptism')}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Beautiful decorations and essential items to make your baptism celebration truly special.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop&q=60" 
              alt="Special Events" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('products.events')}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Create unforgettable moments with our carefully curated event decorations and accessories.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}