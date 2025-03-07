import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

type ContactSettings = {
  id: number;
  phone: string;
  email: string;
  address: string;
  mapUrl: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  workingHours: {
    [key: string]: string;
  };
};

export default function Contact() {
  const { toast } = useToast();

  const { data: settings, isLoading } = useQuery<ContactSettings>({
    queryKey: ["/api/admin/contact"],
  });

  const updateSettings = useMutation({
    mutationFn: async (data: Omit<ContactSettings, "id">) => {
      const res = await apiRequest("PUT", "/api/admin/contact", data);
      if (!res.ok) throw new Error("Failed to update contact settings");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact"] });
      toast({ title: "Contact settings updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      address: formData.get("address") as string,
      mapUrl: formData.get("mapUrl") as string,
      socialLinks: {
        facebook: formData.get("facebook") as string,
        instagram: formData.get("instagram") as string,
        twitter: formData.get("twitter") as string,
      },
      workingHours: {
        monday: formData.get("monday") as string,
        tuesday: formData.get("tuesday") as string,
        wednesday: formData.get("wednesday") as string,
        thursday: formData.get("thursday") as string,
        friday: formData.get("friday") as string,
        saturday: formData.get("saturday") as string,
        sunday: formData.get("sunday") as string,
      },
    };

    updateSettings.mutate(data);
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Contact Settings</h1>

        {isLoading ? (
          <p>Loading settings...</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Edit Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      name="phone"
                      defaultValue={settings?.phone}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      name="email"
                      type="email"
                      defaultValue={settings?.email}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Address</label>
                    <Textarea
                      name="address"
                      defaultValue={settings?.address}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Google Maps Embed URL</label>
                    <Input
                      name="mapUrl"
                      defaultValue={settings?.mapUrl}
                      required
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-4">Social Links</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Facebook</label>
                        <Input
                          name="facebook"
                          defaultValue={settings?.socialLinks.facebook}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Instagram</label>
                        <Input
                          name="instagram"
                          defaultValue={settings?.socialLinks.instagram}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Twitter</label>
                        <Input
                          name="twitter"
                          defaultValue={settings?.socialLinks.twitter}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-4">Working Hours</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                        <div key={day}>
                          <label className="text-sm font-medium capitalize">{day}</label>
                          <Input
                            name={day}
                            defaultValue={settings?.workingHours[day]}
                            placeholder="e.g., 9:00 AM - 5:00 PM"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </AdminLayout>
  );
}
