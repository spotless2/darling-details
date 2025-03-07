import { useAuth } from "@/hooks/use-auth";
import AdminLayout from "@/components/layout/AdminLayout";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Package, Mail, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: inquiries } = useQuery({
    queryKey: ["/api/admin/inquiries"],
  });
  const { data: products } = useQuery({
    queryKey: ["/api/admin/products"],
  });
  const { data: categories } = useQuery({
    queryKey: ["/api/admin/categories"],
  });

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Welcome back, {user?.username}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {categories?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inquiries?.length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              {!inquiries?.length ? (
                <p className="text-muted-foreground text-sm">No recent inquiries</p>
              ) : (
                <ul className="space-y-4">
                  {inquiries.slice(0, 5).map((inquiry: any) => (
                    <li key={inquiry.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <p className="font-medium">{inquiry.name}</p>
                      <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                      <p className="text-sm mt-1">{inquiry.message}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <p className="text-muted-foreground text-sm">
                Use the sidebar navigation to:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Manage products and categories</li>
                <li>View and respond to inquiries</li>
                <li>Update website content</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </AdminLayout>
  );
}