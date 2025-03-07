import { useTranslation } from 'react-i18next';
import { Link } from "wouter";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 dark:opacity-5"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white dark:from-black dark:via-black/80 dark:to-black"></div>
          </div>

          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
              >
                {t('hero.title')}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
              >
                {t('hero.subtitle')}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/products">
                  <Button
                    size="lg"
                    className="bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg"
                  >
                    {t('hero.cta')}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white/80 dark:bg-gray-900/80">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t('whyChooseUs.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('whyChooseUs.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: t('features.quality.title'),
                  description: t('features.quality.description'),
                  icon: "✨"
                },
                {
                  title: t('features.setup.title'),
                  description: t('features.setup.description'),
                  icon: "🎯"
                },
                {
                  title: t('features.service.title'),
                  description: t('features.service.description'),
                  icon: "💝"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              {t('products.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              <Link href="/products">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                >
                  <div className="relative h-96 rounded-xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=60"
                      alt="Wedding Decorations"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-semibold text-white mb-2">
                          {t('products.weddings')}
                        </h3>
                        <p className="text-gray-200">
                          {t('products.weddings.description')}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>

              <Link href="/products">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                >
                  <div className="relative h-96 rounded-xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1515816052601-210d5501d471?w=800&auto=format&fit=crop&q=60"
                      alt="Baptism Essentials"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-semibold text-white mb-2">
                          {t('products.baptism')}
                        </h3>
                        <p className="text-gray-200">
                          {t('products.baptism.description')}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>

              <Link href="/products">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                >
                  <div className="relative h-96 rounded-xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop&q=60"
                      alt="Special Events"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-semibold text-white mb-2">
                          {t('products.events')}
                        </h3>
                        <p className="text-gray-200">
                          {t('products.events.description')}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white/50 dark:bg-gray-900/50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              {t('testimonials.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: t('testimonials.client1.name'),
                  role: t('testimonials.client1.role'),
                  content: t('testimonials.client1.content')
                },
                {
                  name: t('testimonials.client2.name'),
                  role: t('testimonials.client2.role'),
                  content: t('testimonials.client2.content')
                },
                {
                  name: t('testimonials.client3.name'),
                  role: t('testimonials.client3.role'),
                  content: t('testimonials.client3.content')
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                >
                  <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}