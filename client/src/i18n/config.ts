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

      // Why Choose Us Section
      "whyChooseUs.title": "Why Choose Darling Details",
      "whyChooseUs.subtitle": "We bring your vision to life with our premium event rental collection",
      "features.quality.title": "Premium Quality",
      "features.quality.description": "Carefully curated, high-quality decorations that make your event stand out",
      "features.setup.title": "Expert Setup",
      "features.setup.description": "Professional installation and removal service for a stress-free experience",
      "features.service.title": "Personalized Service",
      "features.service.description": "Dedicated support to help you create your perfect event aesthetic",

      // Products Section
      "products.title": "Our Collections",
      "products.weddings": "Wedding Decorations",
      "products.baptism": "Baptism Essentials",
      "products.events": "Special Events",
      "products.weddings.description": "Discover our elegant wedding collection",
      "products.baptism.description": "Beautiful essentials for baptism celebrations",
      "products.events.description": "Create memorable special events",
      "products.desc.wedding": "Elegant centerpieces, romantic lighting, and sophisticated table settings for your perfect wedding day",
      "products.desc.baptism": "Beautiful decorations and essential items to make your baptism celebration truly special",
      "products.desc.events": "Create unforgettable moments with our carefully curated event decorations and accessories",

      // About Section
      "about.title": "About Us",
      "about.description": "At Darling Details, we specialize in creating magical moments through our carefully curated collection of event rentals. From elegant weddings to intimate celebrations, we provide the perfect touches to make your event truly special.",
      "about.features.quality": "Quality decorations for every event",
      "about.features.setup": "Professional setup and teardown",
      "about.features.packages": "Customizable packages",

      // Testimonials Section
      "testimonials.title": "What Our Clients Say",
      "testimonials.client1.name": "Maria P.",
      "testimonials.client1.role": "Bride",
      "testimonials.client1.content": "The decorations were absolutely stunning. Everyone at my wedding was amazed by the attention to detail.",
      "testimonials.client2.name": "Alexandru D.",
      "testimonials.client2.role": "Event Planner",
      "testimonials.client2.content": "Working with Darling Details has been a pleasure. Their professionalism and quality of service is outstanding.",
      "testimonials.client3.name": "Elena M.",
      "testimonials.client3.role": "Mother",
      "testimonials.client3.content": "They made my daughter's baptism truly special. The setup was perfect and the cleanup was quick and efficient.",

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

      // Why Choose Us Section
      "whyChooseUs.title": "De Ce Să Alegi Darling Details",
      "whyChooseUs.subtitle": "Îți aducem viziunea la viață cu colecția noastră premium de decorațiuni",
      "features.quality.title": "Calitate Premium",
      "features.quality.description": "Decorațiuni atent selecționate, de înaltă calitate, care fac evenimentul tău să iasă în evidență",
      "features.setup.title": "Montaj Expert",
      "features.setup.description": "Serviciu profesional de instalare și demontare pentru o experiență fără stres",
      "features.service.title": "Serviciu Personalizat",
      "features.service.description": "Suport dedicat pentru a crea estetica perfectă pentru evenimentul tău",

      // Products Section
      "products.title": "Colecțiile Noastre",
      "products.weddings": "Decorațiuni pentru Nunți",
      "products.baptism": "Esențiale pentru Botez",
      "products.events": "Evenimente Speciale",
      "products.weddings.description": "Descoperă colecția noastră elegantă pentru nunți",
      "products.baptism.description": "Elemente esențiale pentru celebrări de botez",
      "products.events.description": "Creează momente de neuitat",
      "products.desc.wedding": "Aranjamente elegante, iluminat romantic și decorațiuni sofisticate pentru masa perfectă în ziua nunții tale",
      "products.desc.baptism": "Decorațiuni frumoase și articole esențiale pentru a face celebrarea botezului cu adevărat specială",
      "products.desc.events": "Creează momente de neuitat cu decorațiunile noastre atent selecționate pentru evenimente",

      // About Section
      "about.title": "Despre Noi",
      "about.description": "La Darling Details, ne specializăm în crearea momentelor magice prin colecția noastră atent selectată de decorațiuni de închiriat. De la nunți elegante până la celebrări intime, oferim elementele perfecte pentru a face evenimentul tău cu adevărat special.",
      "about.features.quality": "Decorațiuni de calitate pentru orice eveniment",
      "about.features.setup": "Montaj și demontaj profesional",
      "about.features.packages": "Pachete personalizabile",

      // Testimonials Section
      "testimonials.title": "Ce Spun Clienții Noștri",
      "testimonials.client1.name": "Maria P.",
      "testimonials.client1.role": "Mireasă",
      "testimonials.client1.content": "Decorațiunile au fost absolut uimitoare. Toată lumea de la nunta mea a fost impresionată de atenția la detalii.",
      "testimonials.client2.name": "Alexandru D.",
      "testimonials.client2.role": "Organizator de Evenimente",
      "testimonials.client2.content": "A lucra cu Darling Details a fost o plăcere. Profesionalismul și calitatea serviciilor lor sunt remarcabile.",
      "testimonials.client3.name": "Elena M.",
      "testimonials.client3.role": "Mamă",
      "testimonials.client3.content": "Au făcut botezul fiicei mele cu adevărat special. Aranjamentul a fost perfect, iar curățenia rapidă și eficientă.",

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