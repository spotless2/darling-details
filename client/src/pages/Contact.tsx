import { useTranslation } from 'react-i18next';
import Header from "@/components/layout/Header";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      <Header />
      <main className="container mx-auto px-6 pt-24">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('contact.title')}</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">{t('contact.subtitle')}</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <div className="space-y-6">
                <div>
                  <h2 className="text-gray-900 dark:text-white font-semibold mb-2">{t('contact.email')}</h2>
                  <p className="text-gray-700 dark:text-gray-300">contact@darlingdetails.com</p>
                </div>
                <div>
                  <h2 className="text-gray-900 dark:text-white font-semibold mb-2">{t('contact.phone')}</h2>
                  <p className="text-gray-700 dark:text-gray-300">+40 123 456 789</p>
                </div>
                <div>
                  <h2 className="text-gray-900 dark:text-white font-semibold mb-2">{t('contact.address')}</h2>
                  <p className="text-gray-700 dark:text-gray-300">Bucharest, Romania</p>
                </div>
              </div>
            </div>

            <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d91100.56538371563!2d26.0518265!3d44.4379226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f93abf3cad4f%3A0xac0632e37c9ca628!2sBucharest%2C%20Romania!5e0!3m2!1sen!2sus!4v1709827372247!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}