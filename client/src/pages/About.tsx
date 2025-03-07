import { useTranslation } from 'react-i18next';
import Header from "@/components/layout/Header";

export default function About() {
  const { t } = useTranslation();
  
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <main className="container mx-auto px-6 pt-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">{t('about.title')}</h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            {t('about.description')}
          </p>
        </div>
      </main>
    </div>
  );
}
