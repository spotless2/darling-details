import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if user has a theme preference in localStorage
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

  const isActive = (path: string) => location === path;

  return (
    <motion.header
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? "py-4 shadow-lg" : "py-6"
      } dark:bg-black/80`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <span className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer">
            Darling<span className="text-primary">Details</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/">
            <span className={`cursor-pointer transition-colors ${
              isActive("/") ? "text-primary" : "text-gray-600 dark:text-gray-300 hover:text-primary"
            }`}>
              {t('nav.home')}
            </span>
          </Link>
          <Link href="/products">
            <span className={`cursor-pointer transition-colors ${
              isActive("/products") ? "text-primary" : "text-gray-600 dark:text-gray-300 hover:text-primary"
            }`}>
              {t('nav.products')}
            </span>
          </Link>
          <Link href="/about">
            <span className={`cursor-pointer transition-colors ${
              isActive("/about") ? "text-primary" : "text-gray-600 dark:text-gray-300 hover:text-primary"
            }`}>
              {t('nav.about')}
            </span>
          </Link>
          <Link href="/contact">
            <span className={`cursor-pointer transition-colors ${
              isActive("/contact") ? "text-primary" : "text-gray-600 dark:text-gray-300 hover:text-primary"
            }`}>
              {t('nav.contact')}
            </span>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:text-primary"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
          <Button 
            variant="default" 
            className="bg-primary text-white hover:bg-primary/90"
          >
            {t('nav.contact')}
          </Button>
        </div>
      </div>
    </motion.header>
  );
}