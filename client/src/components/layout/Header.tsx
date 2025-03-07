import { useState, useEffect, memo } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Menu, X } from "lucide-react";

const NavLinks = memo(() => {
  const { t } = useTranslation();
  const [location] = useLocation();
  const isActive = (path: string) => location === path;

  return (
    <>
      {[
        { path: "/", label: "nav.home" },
        { path: "/products", label: "nav.products" },
        { path: "/about", label: "nav.about" },
        { path: "/contact", label: "nav.contact" }
      ].map(({ path, label }) => (
        <Link key={path} href={path}>
          <motion.span
            className={`relative cursor-pointer group py-3 px-6 rounded-full transition-all ${
              isActive(path) 
                ? "text-primary font-medium bg-primary/10 dark:bg-primary/20" 
                : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t(label)}
          </motion.span>
        </Link>
      ))}
    </>
  );
});

NavLinks.displayName = "NavLinks";

export default function Header() {
  const { t, i18n } = useTranslation();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const blur = useTransform(scrollY, [0, 100], [8, 12]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-3" : "py-5"
      } dark:bg-black/90`}
      style={{
        backgroundColor: `hsl(var(--background) / ${opacity.get()})`,
        backdropFilter: `blur(${blur.get()}px)`,
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-gradient bg-300% opacity-30" />

      {/* Animated border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div 
              className="relative cursor-pointer group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="inline-block text-3xl md:text-4xl font-bold"
                style={{ opacity: opacity }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary/90 via-purple-500 to-primary bg-300% animate-gradient">
                  Darling
                </span>
                <span className="text-gray-800 dark:text-white font-serif italic ml-2 tracking-wide">
                  Details
                </span>
              </motion.div>
              {/* Hover effect */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            <NavLinks />
          </nav>

          <div className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                className="relative overflow-hidden rounded-full bg-background/50 backdrop-blur-sm"
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
                className="relative overflow-hidden rounded-full bg-background/50 backdrop-blur-sm"
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
                className="relative overflow-hidden rounded-full bg-background/50 backdrop-blur-sm"
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
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-background/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-border/50"
          >
            <motion.div 
              className="container mx-auto px-6 py-4 flex flex-col space-y-2"
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