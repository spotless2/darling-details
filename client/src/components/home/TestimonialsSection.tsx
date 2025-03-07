import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const { t } = useTranslation();

  return (
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
  );
}
