import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Package, 
  Mail, 
  LogOut,
  Menu,
  X,
  FolderTree
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logoutMutation } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const NavLinks = () => (
    <>
      <Link href="/admin">
        <span className={`flex items-center space-x-2 cursor-pointer ${
          isActive("/admin") ? "text-primary" : "text-gray-600 hover:text-primary"
        }`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </span>
      </Link>
      <Link href="/admin/categories">
        <span className={`flex items-center space-x-2 cursor-pointer ${
          isActive("/admin/categories") ? "text-primary" : "text-gray-600 hover:text-primary"
        }`}>
          <FolderTree size={20} />
          <span>Categories</span>
        </span>
      </Link>
      <Link href="/admin/products">
        <span className={`flex items-center space-x-2 cursor-pointer ${
          isActive("/admin/products") ? "text-primary" : "text-gray-600 hover:text-primary"
        }`}>
          <Package size={20} />
          <span>Products</span>
        </span>
      </Link>
      <Link href="/admin/inquiries">
        <span className={`flex items-center space-x-2 cursor-pointer ${
          isActive("/admin/inquiries") ? "text-primary" : "text-gray-600 hover:text-primary"
        }`}>
          <Mail size={20} />
          <span>Inquiries</span>
        </span>
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xl font-semibold text-gray-800 dark:text-white">Admin Panel</span>
          </div>
          <nav className="flex-1 p-6 space-y-6">
            <NavLinks />
          </nav>
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-center space-x-2"
              onClick={() => logoutMutation.mutate()}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
        className="fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r border-gray-200 md:hidden dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xl font-semibold text-gray-800 dark:text-white">Admin Panel</span>
          </div>
          <nav className="flex-1 p-6 space-y-6">
            <NavLinks />
          </nav>
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-center space-x-2"
              onClick={() => logoutMutation.mutate()}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="md:ml-64 p-8">
        {children}
      </div>
    </div>
  );
}