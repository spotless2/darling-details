import { useAuth } from "@/hooks/use-auth";
import AdminLayout from "@/components/layout/AdminLayout";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Welcome back, {user?.username}!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Quick Actions</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Use the sidebar navigation to manage your website content.
            </p>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
