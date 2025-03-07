import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from "@/components/layout/Header";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  categoryId: number;
};

type Category = {
  id: number;
  name: string;
  description: string;
  mainImage: string;
};

export default function Products() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const categoriesWithProducts = categories.reduce((acc, category) => {
    const categoryProducts = products.filter(product => product.categoryId === category.id);
    acc[category.name] = {
      title: t(`products.${category.name}`),
      description: t(`products.desc.${category.name}`),
      mainImage: category.mainImage,
      gallery: categoryProducts.map(product => ({
        image: product.image,
        title: product.title,
        description: product.description
      }))
    };
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      <Header />
      <main className="container mx-auto px-6 pt-24">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">{t('products.title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(categoriesWithProducts).map(([key, category], index) => (
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
          {selectedCategory && categoriesWithProducts[selectedCategory] && (
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
                      {categoriesWithProducts[selectedCategory].title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoriesWithProducts[selectedCategory].gallery.map((item: any, index: number) => (
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