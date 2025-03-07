import { useTranslation } from 'react-i18next';
import Header from "@/components/layout/Header";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      <Header />
      <main className="container mx-auto px-6 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">{t('about.title')}</h1>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=60" 
                alt="About Us" 
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                {t('about.description')}
              </p>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Quality decorations for every event
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Professional setup and teardown
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Customizable packages
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}