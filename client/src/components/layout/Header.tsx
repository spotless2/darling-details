import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location === path;

  return (
    <motion.header
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <span className="text-2xl font-bold text-white cursor-pointer">
            Darling<span className="text-primary">Details</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/">
            <span className={`cursor-pointer transition-colors ${
              isActive("/") ? "text-white" : "text-gray-300 hover:text-white"
            }`}>
              {t('nav.home')}
            </span>
          </Link>
          <Link href="/products">
            <span className={`cursor-pointer transition-colors ${
              isActive("/products") ? "text-white" : "text-gray-300 hover:text-white"
            }`}>
              {t('nav.products')}
            </span>
          </Link>
          <Link href="/about">
            <span className={`cursor-pointer transition-colors ${
              isActive("/about") ? "text-white" : "text-gray-300 hover:text-white"
            }`}>
              {t('nav.about')}
            </span>
          </Link>
          <Link href="/contact">
            <span className={`cursor-pointer transition-colors ${
              isActive("/contact") ? "text-white" : "text-gray-300 hover:text-white"
            }`}>
              {t('nav.contact')}
            </span>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:text-primary hover:bg-white/10">
            Contact Us
          </Button>
        </div>
      </div>
    </motion.header>
  );
}