import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { motion } from "framer-motion";

export default function Inquiries() {
  const { data: inquiries, isLoading } = useQuery({
    queryKey: ["/api/admin/inquiries"],
  });

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Inquiries</h1>

        <div className="grid grid-cols-1 gap-6">
          {isLoading ? (
            <p>Loading inquiries...</p>
          ) : inquiries?.length === 0 ? (
            <p>No inquiries found.</p>
          ) : (
            inquiries?.map((inquiry: any) => (
              <Card key={inquiry.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{inquiry.name}</CardTitle>
                      <p className="text-sm text-gray-500">{inquiry.email}</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{inquiry.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(inquiry.createdAt).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </motion.div>
    </AdminLayout>
  );
}
