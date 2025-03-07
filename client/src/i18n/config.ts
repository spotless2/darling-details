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
      "about.features.quality": "Quality Decorations",
      "about.desc.quality": "Our premium collection features carefully selected, high-quality pieces that transform any venue into a stunning event space.",
      "about.features.setup": "Professional Setup",
      "about.desc.setup": "Our expert team handles all the setup and teardown, ensuring a stress-free experience for you and your guests.",
      "about.features.packages": "Custom Packages",
      "about.desc.packages": "We offer flexible rental packages tailored to your specific needs and budget, making every event uniquely yours.",
      "about.experience.title": "Years of Creating Perfect Moments",
      "about.experience.description": "With over a decade of experience in event decoration, we've mastered the art of transforming spaces into unforgettable settings for life's most precious moments.",
      "about.experience.point1": "Comprehensive decoration solutions for any event type",
      "about.experience.point2": "Expert consultation and personalized design services",
      "about.experience.point3": "Reliable execution and attention to every detail",
      "about.stats.events": "Events Decorated",
      "about.stats.venues": "Partner Venues",
      "about.stats.clients": "Happy Clients",
      "about.stats.satisfaction": "Client Satisfaction",

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

      // Contact Form
      "contact.form.name": "Name",
      "contact.form.namePlaceholder": "Your name",
      "contact.form.email": "Email",
      "contact.form.emailPlaceholder": "your.email@example.com",
      "contact.form.phone": "Phone",
      "contact.form.phonePlaceholder": "Your phone number",
      "contact.form.message": "Message",
      "contact.form.messagePlaceholder": "Your message",
      "contact.form.submit": "Send Message",
      "contact.form.sending": "Sending...",

      // Contact Form Errors
      "contact.form.errors.nameRequired": "Name is required",
      "contact.form.errors.emailInvalid": "Invalid email address",
      "contact.form.errors.phoneRequired": "Phone number is required",
      "contact.form.errors.messageRequired": "Message is required",
      "contact.form.errors.submitFailed": "Failed to send message",

      // Contact Info
      "contact.info.email": "Email",
      "contact.info.phone": "Phone",
      "contact.info.address": "Address",
      "contact.info.workingHours": "Working Hours",
      "contact.info.social": "Follow Us",

      // Days
      "contact.days.monday": "Monday",
      "contact.days.tuesday": "Tuesday",
      "contact.days.wednesday": "Wednesday",
      "contact.days.thursday": "Thursday",
      "contact.days.friday": "Friday",
      "contact.days.saturday": "Saturday",
      "contact.days.sunday": "Sunday"
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
      "about.description": "La Darling Details, ne specializăm în crearea momentelor magice prin colecția noastră atent selecționată de decorațiuni pentru evenimente. De la nunți elegante până la celebrări intime, oferim elementele perfecte pentru a face evenimentul tău cu adevărat special.",
      "about.features.quality": "Decorațiuni de Calitate",
      "about.desc.quality": "Colecția noastră premium include piese atent selecționate, de înaltă calitate, care transformă orice locație într-un spațiu eveniment uimitor.",
      "about.features.setup": "Montaj Profesional",
      "about.desc.setup": "Echipa noastră de experți se ocupă de tot montajul și demontajul, asigurând o experiență fără stres pentru tine și invitații tăi.",
      "about.features.packages": "Pachete Personalizate",
      "about.desc.packages": "Oferim pachete de închiriere flexibile, adaptate nevoilor și bugetului tău specific, făcând fiecare eveniment unic.",
      "about.experience.title": "Ani de Creație a Momentelor Perfecte",
      "about.experience.description": "Cu peste un deceniu de experiență în decorarea evenimentelor, am perfecționat arta transformării spațiilor în cadre de neuitat pentru cele mai prețioase momente ale vieții.",
      "about.experience.point1": "Soluții complete de decorare pentru orice tip de eveniment",
      "about.experience.point2": "Consultanță de specialitate și servicii de design personalizate",
      "about.experience.point3": "Execuție de încredere și atenție la fiecare detaliu",
      "about.stats.events": "Evenimente Decorate",
      "about.stats.venues": "Locații Partenere",
      "about.stats.clients": "Clienți Mulțumiți",
      "about.stats.satisfaction": "Satisfacție Clienți",

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

      // Contact Form
      "contact.form.name": "Nume",
      "contact.form.namePlaceholder": "Numele tău",
      "contact.form.email": "Email",
      "contact.form.emailPlaceholder": "email@exemplu.com",
      "contact.form.phone": "Telefon",
      "contact.form.phonePlaceholder": "Numărul tău de telefon",
      "contact.form.message": "Mesaj",
      "contact.form.messagePlaceholder": "Mesajul tău",
      "contact.form.submit": "Trimite mesajul",
      "contact.form.sending": "Se trimite...",

      // Contact Form Errors
      "contact.form.errors.nameRequired": "Numele este obligatoriu",
      "contact.form.errors.emailInvalid": "Adresa de email nu este validă",
      "contact.form.errors.phoneRequired": "Numărul de telefon este obligatoriu",
      "contact.form.errors.messageRequired": "Mesajul este obligatoriu",
      "contact.form.errors.submitFailed": "Nu s-a putut trimite mesajul",

      // Contact Info
      "contact.info.email": "Email",
      "contact.info.phone": "Telefon",
      "contact.info.address": "Adresă",
      "contact.info.workingHours": "Program",
      "contact.info.social": "Urmărește-ne",

      // Days
      "contact.days.monday": "Luni",
      "contact.days.tuesday": "Marți",
      "contact.days.wednesday": "Miercuri",
      "contact.days.thursday": "Joi",
      "contact.days.friday": "Vineri",
      "contact.days.saturday": "Sâmbătă",
      "contact.days.sunday": "Duminică"
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