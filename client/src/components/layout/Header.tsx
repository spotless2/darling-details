import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Menu, X } from "lucide-react";

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

  const isActive = (path: string) => location === path;

  const NavLinks = () => (
    <>
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
    </>
  );

  return (
    <motion.header
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? "py-4 shadow-lg" : "py-6"
      } dark:bg-black/80`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <span className="font-bold cursor-pointer">
            <span className="text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Darling
            </span>
            <span className="text-2xl md:text-3xl text-gray-900 dark:text-white font-serif italic">
              Details
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
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

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.nav
        initial={false}
        animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
          <NavLinks />
        </div>
      </motion.nav>
    </motion.header>
  );
}