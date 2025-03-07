import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.products": "Products",
      "nav.about": "About",
      "nav.contact": "Contact",

      // Hero Section
      "hero.title": "Darling Details",
      "hero.subtitle": "Making Your Special Events Unforgettable",
      "hero.cta": "View Our Collection",

      // Products Section
      "products.title": "Our Collections",
      "products.weddings": "Wedding Decorations",
      "products.baptism": "Baptism Essentials",
      "products.events": "Special Events",

      // About Section
      "about.title": "About Us",
      "about.description": "At Darling Details, we specialize in creating magical moments through our carefully curated collection of event rentals. From elegant weddings to intimate celebrations, we provide the perfect touches to make your event truly special.",

      // Contact Section
      "contact.title": "Contact Us",
      "contact.subtitle": "Let's Make Your Event Special",
      "contact.email": "Email",
      "contact.phone": "Phone",
      "contact.address": "Address"
    }
  },
  ro: {
    translation: {
      // Navigation
      "nav.home": "Acasă",
      "nav.products": "Produse",
      "nav.about": "Despre",
      "nav.contact": "Contact",

      // Hero Section
      "hero.title": "Darling Details",
      "hero.subtitle": "Facem Evenimentele Tale de Neuitat",
      "hero.cta": "Vezi Colecția Noastră",

      // Products Section
      "products.title": "Colecțiile Noastre",
      "products.weddings": "Decorațiuni pentru Nunți",
      "products.baptism": "Esențiale pentru Botez",
      "products.events": "Evenimente Speciale",

      // About Section
      "about.title": "Despre Noi",
      "about.description": "La Darling Details, ne specializăm în crearea momentelor magice prin colecția noastră atent selectată de decorațiuni de închiriat. De la nunți elegante până la celebrări intime, oferim elementele perfecte pentru a face evenimentul tău cu adevărat special.",

      // Contact Section
      "contact.title": "Contactează-ne",
      "contact.subtitle": "Hai să Facem Evenimentul Tău Special",
      "contact.email": "Email",
      "contact.phone": "Telefon",
      "contact.address": "Adresă"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ro', // Set Romanian as default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;