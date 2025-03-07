import { useTranslation } from 'react-i18next';
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            {/* Primary Background Image */}
            <div 
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=2000')] bg-cover bg-center bg-fixed"
              style={{ opacity: 0.15 }}
            />
            {/* Multiple Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 via-background/90 to-background" />
          </div>

          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                <span className="relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/90 via-purple-500 to-primary blur-2xl opacity-50" />
                  <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary animate-gradient bg-300%">
                    {t('about.title')}
                  </span>
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              >
                {t('about.description')}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "✨",
                  title: t('about.features.quality'),
                  description: t('about.desc.quality')
                },
                {
                  icon: "🎯",
                  title: t('about.features.setup'),
                  description: t('about.desc.setup')
                },
                {
                  icon: "💝",
                  title: t('about.features.packages'),
                  description: t('about.desc.packages')
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="p-8 rounded-2xl bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
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

        {/* Experience Section */}
        <section className="py-20 bg-white/50 dark:bg-gray-900/50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {t('about.experience.title')}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {t('about.experience.description')}
                </p>
                <ul className="space-y-4">
                  {[
                    t('about.experience.point1'),
                    t('about.experience.point2'),
                    t('about.experience.point3')
                  ].map((point, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-center space-x-3 text-gray-600 dark:text-gray-300"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary">✓</span>
                      </span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "500+", label: t('about.stats.events') },
                  { number: "50+", label: t('about.stats.venues') },
                  { number: "1000+", label: t('about.stats.clients') },
                  { number: "100%", label: t('about.stats.satisfaction') }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="p-6 rounded-2xl bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-lg text-center"
                  >
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}