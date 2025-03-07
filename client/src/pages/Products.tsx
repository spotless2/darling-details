import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Header from "@/components/layout/Header";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type GalleryItem = {
  image: string;
  title: string;
  description: string;
};

type ProductCategory = {
  title: string;
  description: string;
  mainImage: string;
  gallery: GalleryItem[];
};

export default function Products() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: Record<string, ProductCategory> = {
    weddings: {
      title: t('products.weddings'),
      description: t('products.desc.wedding'),
      mainImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=60",
      gallery: [
        {
          image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=60",
          title: "Wedding Centerpiece",
          description: "Elegant floral arrangements"
        },
        {
          image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=60",
          title: "Table Setting",
          description: "Sophisticated dining experience"
        },
        {
          image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&auto=format&fit=crop&q=60",
          title: "Lighting",
          description: "Romantic atmosphere"
        }
      ]
    },
    baptism: {
      title: t('products.baptism'),
      description: t('products.desc.baptism'),
      mainImage: "https://images.unsplash.com/photo-1515816052601-210d5501d471?w=800&auto=format&fit=crop&q=60",
      gallery: [
        {
          image: "https://images.unsplash.com/photo-1513875528452-39400945934d?w=800&auto=format&fit=crop&q=60",
          title: "Baptism Setup",
          description: "Complete ceremony decoration"
        },
        {
          image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop&q=60",
          title: "Party Decoration",
          description: "Celebration essentials"
        },
        {
          image: "https://images.unsplash.com/photo-1516714819001-8ee7a13b88d0?w=800&auto=format&fit=crop&q=60",
          title: "Special Moments",
          description: "Photo opportunities"
        }
      ]
    },
    events: {
      title: t('products.events'),
      description: t('products.desc.events'),
      mainImage: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop&q=60",
      gallery: [
        {
          image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&auto=format&fit=crop&q=60",
          title: "Party Setup",
          description: "Festive arrangements"
        },
        {
          image: "https://images.unsplash.com/photo-1508461641940-2c564a50ed97?w=800&auto=format&fit=crop&q=60",
          title: "Corporate Events",
          description: "Professional settings"
        },
        {
          image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=60",
          title: "Special Celebrations",
          description: "Memorable decorations"
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      <Header />
      <main className="container mx-auto px-6 pt-24">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">{t('products.title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(categories).map(([key, category], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              onClick={() => setSelectedCategory(key)}
              className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:scale-105"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={category.mainImage}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors"></div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{category.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {category.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 overflow-y-auto"
              onClick={() => setSelectedCategory(null)}
            >
              <div className="min-h-screen px-4 py-8">
                <div className="max-w-6xl mx-auto relative">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="absolute right-4 top-4 text-white hover:text-gray-300 z-10"
                  >
                    <X size={24} />
                  </button>
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl"
                  >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      {categories[selectedCategory].title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categories[selectedCategory].gallery.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden"
                        >
                          <div className="aspect-w-16 aspect-h-9">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">
                              {item.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}