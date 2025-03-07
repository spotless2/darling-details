import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Header() {
  const { t, i18n } = useTranslation();
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );
  const textOpacity = useTransform(
    scrollY,
    [0, 100],
    [0.9, 1]
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ro' ? 'en' : 'ro';
    i18n.changeLanguage(newLang);
  };

  const isActive = (path: string) => location === path;

  const NavLinks = () => (
    <>
      <Link href="/">
        <motion.span
          className={`relative cursor-pointer group ${
            isActive("/") ? "text-primary" : "text-gray-600 dark:text-gray-300"
          }`}
          whileHover="hover"
          whileTap="tap"
        >
          <span className="relative z-10">{t('nav.home')}</span>
          <motion.span
            className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full -z-10"
            initial={{ scale: 0, opacity: 0 }}
            variants={{
              hover: { scale: 1.1, opacity: 1 },
              tap: { scale: 0.95 }
            }}
          />
        </motion.span>
      </Link>
      <Link href="/products">
        <motion.span
          className={`relative cursor-pointer group ${
            isActive("/products") ? "text-primary" : "text-gray-600 dark:text-gray-300"
          }`}
          whileHover="hover"
          whileTap="tap"
        >
          <span className="relative z-10">{t('nav.products')}</span>
          <motion.span
            className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full -z-10"
            initial={{ scale: 0, opacity: 0 }}
            variants={{
              hover: { scale: 1.1, opacity: 1 },
              tap: { scale: 0.95 }
            }}
          />
        </motion.span>
      </Link>
      <Link href="/about">
        <motion.span
          className={`relative cursor-pointer group ${
            isActive("/about") ? "text-primary" : "text-gray-600 dark:text-gray-300"
          }`}
          whileHover="hover"
          whileTap="tap"
        >
          <span className="relative z-10">{t('nav.about')}</span>
          <motion.span
            className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full -z-10"
            initial={{ scale: 0, opacity: 0 }}
            variants={{
              hover: { scale: 1.1, opacity: 1 },
              tap: { scale: 0.95 }
            }}
          />
        </motion.span>
      </Link>
      <Link href="/contact">
        <motion.span
          className={`relative cursor-pointer group ${
            isActive("/contact") ? "text-primary" : "text-gray-600 dark:text-gray-300"
          }`}
          whileHover="hover"
          whileTap="tap"
        >
          <span className="relative z-10">{t('nav.contact')}</span>
          <motion.span
            className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full -z-10"
            initial={{ scale: 0, opacity: 0 }}
            variants={{
              hover: { scale: 1.1, opacity: 1 },
              tap: { scale: 0.95 }
            }}
          />
        </motion.span>
      </Link>
    </>
  );

  return (
    <motion.header
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      } dark:bg-black/90`}
    >
      <div 
        className="absolute inset-0 bg-repeat opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <motion.div 
        style={{ backdropBlur }}
        className="absolute inset-0 -z-10"
      />

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div 
              className="relative cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="inline-block text-2xl md:text-3xl font-bold"
                style={{ opacity: textOpacity }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-primary bg-300% animate-gradient">
                  Darling
                </span>
                <span className="text-gray-900 dark:text-white font-serif italic">
                  Details
                </span>
              </motion.span>
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </nav>

          <div className="flex items-center space-x-4">
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                className="relative overflow-hidden"
              >
                <motion.span 
                  className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                />
                <span className="relative z-10 text-lg">
                  {i18n.language === 'ro' ? '🇷🇴' : '🇬🇧'}
                </span>
              </Button>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative overflow-hidden"
              >
                <motion.span 
                  className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                />
                <motion.span
                  className="relative z-10"
                  animate={{ rotate: theme === 'light' ? 0 : 180 }}
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </motion.span>
              </Button>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              className="md:hidden"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative overflow-hidden"
              >
                <motion.span 
                  className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                />
                <span className="relative z-10">
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg"
          >
            <motion.div 
              className="container mx-auto px-6 py-4 flex flex-col space-y-4"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <NavLinks />
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}