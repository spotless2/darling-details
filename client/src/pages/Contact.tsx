import { useTranslation } from 'react-i18next';
import Header from "@/components/layout/Header";

export default function Contact() {
  const { t } = useTranslation();
  
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <main className="container mx-auto px-6 pt-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">{t('contact.title')}</h1>
          <p className="text-xl text-gray-300 mb-8">{t('contact.subtitle')}</p>
          <div className="grid gap-6 bg-gray-900/50 backdrop-blur-sm rounded-lg p-8">
            <div>
              <h2 className="text-white font-semibold mb-2">{t('contact.email')}</h2>
              <p className="text-gray-300">contact@darlingdetails.com</p>
            </div>
            <div>
              <h2 className="text-white font-semibold mb-2">{t('contact.phone')}</h2>
              <p className="text-gray-300">+40 123 456 789</p>
            </div>
            <div>
              <h2 className="text-white font-semibold mb-2">{t('contact.address')}</h2>
              <p className="text-gray-300">Bucharest, Romania</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
