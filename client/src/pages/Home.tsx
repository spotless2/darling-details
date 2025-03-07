import { useTranslation } from 'react-i18next';
import { Link } from "wouter";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";

// Lazy load the testimonials section
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection"));

// Loading fallback for images
const ImageLoader = () => (
  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 w-full h-full rounded-xl" />
);

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            {/* Primary Background Image */}
            <img 
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=2000"
              alt=""
              loading="eager" // Load hero image immediately
              className="absolute inset-0 object-cover w-full h-full"
              style={{ opacity: 0.25 }}
              fetchPriority="high"
            />
            {/* Multiple Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 via-background/90 to-background" />

            {/* Animated Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.15]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.primary.DEFAULT)/0.1_1px,transparent_1px)] [background-size:40px_40px]" />
            </div>

            {/* Decorative Blobs */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full filter blur-3xl animate-pulse" />
              <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
            </div>
          </div>

          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h1 className="font-serif italic text-6xl md:text-8xl font-bold mb-6 tracking-tight">
                  <span className="relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/90 via-purple-500 to-primary blur-2xl opacity-50" />
                    <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary animate-gradient bg-300%">
                      Darling Details
                    </span>
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                  {t('hero.subtitle')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <Link href="/products">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    {t('hero.cta')}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="w-[2px] h-16 bg-gradient-to-b from-primary/50 to-transparent rounded-full animate-pulse" />
          </motion.div>
        </section>

        {/* Featured Collections */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              {t('products.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
                  title: t('products.weddings'),
                  description: t('products.weddings.description')
                },
                {
                  image: "https://images.unsplash.com/photo-1515816052601-210d5501d471",
                  title: t('products.baptism'),
                  description: t('products.baptism.description')
                },
                {
                  image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
                  title: t('products.events'),
                  description: t('products.events.description')
                }
              ].map((collection, index) => (
                <Link href="/products" key={index}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="cursor-pointer"
                  >
                    <div className="relative h-96 rounded-xl overflow-hidden">
                      <Suspense fallback={<ImageLoader />}>
                        <img 
                          src={`${collection.image}?w=800&auto=format&fit=crop&q=60`}
                          alt={collection.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          onLoad={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.style.opacity = "1";
                          }}
                          style={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
                        />
                      </Suspense>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-2xl font-semibold text-white mb-2">
                            {collection.title}
                          </h3>
                          <p className="text-gray-200">
                            {collection.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - Lazy loaded */}
        <Suspense fallback={<div className="py-20 bg-white/50 dark:bg-gray-900/50" />}>
          <TestimonialsSection />
        </Suspense>
      </main>
    </div>
  );
}