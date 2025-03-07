import { useTranslation } from 'react-i18next';
import Header from "@/components/layout/Header";

export default function Products() {
  const { t } = useTranslation();
  
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <main className="container mx-auto px-6 pt-24">
        <h1 className="text-4xl font-bold text-white mb-8">{t('products.title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product categories will be added here */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">{t('products.weddings')}</h2>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">{t('products.baptism')}</h2>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">{t('products.events')}</h2>
          </div>
        </div>
      </main>
    </div>
  );
}
