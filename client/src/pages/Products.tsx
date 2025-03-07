import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from "@/components/layout/Header";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useContentful, type Category, type Product } from "@/lib/contentful";

// Image optimization helper
const getOptimizedImageUrl = (url: string, width: number = 800) => {
  // If it's an Unsplash image, use their optimization API
  if (url.includes('unsplash.com')) {
    return `${url}?w=${width}&auto=format&fit=crop&q=80&fm=webp`;
  }
  // If it's a Contentful image, use their image API
  if (url.includes('ctfassets.net')) {
    return `${url}?w=${width}&fm=webp&q=80`;
  }
  return url;
};

// Loading placeholder
const ImagePlaceholder = () => (
  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 w-full h-full rounded-2xl" />
);

export default function Products() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});
  const { getCategories, getProducts } = useContentful();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const categoriesWithProducts = categories.reduce((acc, category) => {
    const categoryProducts = products.filter(product => 
      product.fields.category.sys.id === category.sys.id
    );
    acc[category.sys.id] = {
      title: category.fields.name,
      description: category.fields.description,
      mainImage: category.fields.mainImage.fields.file.url,
      gallery: categoryProducts.map(product => ({
        image: product.fields.image.fields.file.url,
        title: product.fields.title,
        description: product.fields.description
      }))
    };
    return acc;
  }, {} as Record<string, any>);

  const handleImageLoad = (imageId: string) => {
    setImageLoaded(prev => ({ ...prev, [imageId]: true }));
  };

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
              style={{ opacity: 0.25 }}
            />
            {/* Multiple Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 via-background/90 to-background" />

            {/* Animated Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.15]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.primary.DEFAULT)/0.1_1px,transparent_1px)] [background-size:40px_40px]" />
            </div>
          </div>

          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/90 via-purple-500 to-primary blur-2xl opacity-50" />
                  <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary animate-gradient bg-300%">
                    {t('products.title')}
                  </span>
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">{t('whyChooseUs.subtitle')}</p>
            </motion.div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(categoriesWithProducts).map(([key, category], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  onClick={() => setSelectedCategory(key)}
                  className="group cursor-pointer"
                >
                  <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="relative h-64 overflow-hidden">
                      {!imageLoaded[key] && <ImagePlaceholder />}
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={`
                            ${getOptimizedImageUrl(category.mainImage, 400)} 400w,
                            ${getOptimizedImageUrl(category.mainImage, 800)} 800w,
                            ${getOptimizedImageUrl(category.mainImage, 1200)} 1200w
                          `}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <img 
                          src={getOptimizedImageUrl(category.mainImage)}
                          alt={category.title}
                          loading={index < 3 ? "eager" : "lazy"}
                          className={`
                            w-full h-full object-cover transition-transform duration-300 group-hover:scale-110
                            ${imageLoaded[key] ? 'opacity-100' : 'opacity-0'}
                          `}
                          onLoad={() => handleImageLoad(key)}
                        />
                      </picture>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h2 className="text-2xl font-semibold mb-2">{category.title}</h2>
                        <p className="text-gray-200 line-clamp-2">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal for Product Details */}
        <AnimatePresence>
          {selectedCategory && categoriesWithProducts[selectedCategory] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
              onClick={() => setSelectedCategory(null)}
            >
              <div className="min-h-screen px-4 py-8">
                <div className="max-w-6xl mx-auto relative">
                  <motion.button
                    onClick={() => setSelectedCategory(null)}
                    className="absolute right-4 top-4 text-white hover:text-gray-300 z-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={24} />
                  </motion.button>
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
                  >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                      {categoriesWithProducts[selectedCategory].title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoriesWithProducts[selectedCategory].gallery.map((item: any, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group bg-gray-100 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                            {!imageLoaded[`modal-${index}`] && <ImagePlaceholder />}
                            <picture>
                              <source
                                type="image/webp"
                                srcSet={`
                                  ${getOptimizedImageUrl(item.image, 400)} 400w,
                                  ${getOptimizedImageUrl(item.image, 800)} 800w
                                `}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <img
                                src={getOptimizedImageUrl(item.image)}
                                alt={item.title}
                                loading="lazy"
                                className={`
                                  w-full h-full object-cover transition-transform duration-300 group-hover:scale-110
                                  ${imageLoaded[`modal-${index}`] ? 'opacity-100' : 'opacity-0'}
                                `}
                                onLoad={() => handleImageLoad(`modal-${index}`)}
                              />
                            </picture>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
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