import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

type Category = {
  id: number;
  name: string;
  description: string;
  mainImage: string;
  titleTranslationKey: string;
};

export default function Categories() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/admin/categories"],
  });

  const createCategory = useMutation({
    mutationFn: async (data: Omit<Category, "id">) => {
      const res = await apiRequest("POST", "/api/admin/categories", data);
      if (!res.ok) throw new Error("Failed to create category");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/categories"] });
      toast({ title: "Category created successfully" });
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateCategory = useMutation({
    mutationFn: async ({ id, ...data }: Category) => {
      const res = await apiRequest("PUT", `/api/admin/categories/${id}`, data);
      if (!res.ok) throw new Error("Failed to update category");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/categories"] });
      toast({ title: "Category updated successfully" });
      setIsDialogOpen(false);
      setSelectedCategory(null);
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteCategory = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/admin/categories/${id}`);
      if (!res.ok) throw new Error("Failed to delete category");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/categories"] });
      toast({ title: "Category deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      mainImage: formData.get("mainImage") as string,
      titleTranslationKey: `products.${formData.get("name")}`,
    };

    if (selectedCategory) {
      updateCategory.mutate({ ...data, id: selectedCategory.id });
    } else {
      createCategory.mutate(data);
    }
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setSelectedCategory(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    name="name"
                    defaultValue={selectedCategory?.name}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    name="description"
                    defaultValue={selectedCategory?.description}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Main Image URL</label>
                  <Input
                    name="mainImage"
                    defaultValue={selectedCategory?.mainImage}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {selectedCategory ? "Update" : "Create"} Category
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <p>Loading categories...</p>
          ) : !categories?.length ? (
            <p>No categories found.</p>
          ) : (
            categories?.map((category) => (
              <Card key={category.id}>
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={category.mainImage} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {category.description}
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this category?")) {
                          deleteCategory.mutate(category.id);
                        }
                      }}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </motion.div>
    </AdminLayout>
  );
}
