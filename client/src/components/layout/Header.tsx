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
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(8px)"]
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
          className={`cursor-pointer transition-colors ${
            isActive("/") ? "text-primary" : "text-gray-600 dark:text-gray-300 hover:text-primary"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('nav.home')}
        </motion.span>
      </Link>
      <Link href="/products">
        <motion.span
          className={`cursor-pointer transition-colors ${
            isActive("/products") ? "text-primary" : "text-gray-600 dark:text-gray-300 hover:text-primary"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('nav.products')}
        </motion.span>
      </Link>
      <Link href="/about">
        <motion.span
          className={`cursor-pointer transition-colors ${
            isActive("/about") ? "text-primary" : "text-gray-600 dark:text-gray-300 hover:text-primary"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('nav.about')}
        </motion.span>
      </Link>
      <Link href="/contact">
        <motion.span
          className={`cursor-pointer transition-colors ${
            isActive("/contact") ? "text-primary" : "text-gray-600 dark:text-gray-300 hover:text-primary"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('nav.contact')}
        </motion.span>
      </Link>
    </>
  );

  return (
    <motion.header
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4 shadow-lg" : "py-6"
      } dark:bg-black/80`}
    >
      <motion.div 
        style={{ backdropBlur }}
        className="absolute inset-0 -z-10"
      />
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <motion.span 
            className="font-bold cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Darling
            </span>
            <span className="text-2xl md:text-3xl text-gray-900 dark:text-white font-serif italic">
              Details
            </span>
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
        </nav>

        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="text-gray-600 dark:text-gray-300 hover:text-primary"
            >
              <span className="text-lg">
                {i18n.language === 'ro' ? '🇷🇴' : '🇬🇧'}
              </span>
            </Button>
          </motion.div>

          {/* Theme Switcher */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:text-primary"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            className="md:hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900"
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