import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Facebook, Instagram, Twitter } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactSettings = {
  phone: string;
  email: string;
  address: string;
  mapUrl: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  workingHours: Record<string, string>;
};

export default function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { data: settings, isLoading: settingsLoading } = useQuery<ContactSettings>({
    queryKey: ["/api/contact"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: t('contact.success.title'),
        description: t('contact.success.description'),
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: t('contact.error.title'),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      <Header />
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('contact.title')}</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300">{t('contact.subtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 shadow-lg"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.name')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.namePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.email')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.emailPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.phone')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.phonePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.message')}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t('contact.form.messagePlaceholder')}
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      t('contact.form.submit')
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {settingsLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : settings ? (
                <>
                  <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 shadow-lg">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-gray-900 dark:text-white font-semibold mb-2">{t('contact.email')}</h2>
                        <p className="text-gray-700 dark:text-gray-300">{settings.email}</p>
                      </div>
                      <div>
                        <h2 className="text-gray-900 dark:text-white font-semibold mb-2">{t('contact.phone')}</h2>
                        <p className="text-gray-700 dark:text-gray-300">{settings.phone}</p>
                      </div>
                      <div>
                        <h2 className="text-gray-900 dark:text-white font-semibold mb-2">{t('contact.address')}</h2>
                        <p className="text-gray-700 dark:text-gray-300">{settings.address}</p>
                      </div>
                      <div>
                        <h2 className="text-gray-900 dark:text-white font-semibold mb-2">{t('contact.workingHours')}</h2>
                        <div className="space-y-2">
                          {Object.entries(settings.workingHours).map(([day, hours]) => (
                            <div key={day} className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400 capitalize">{day}</span>
                              <span className="text-gray-700 dark:text-gray-300">{hours}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h2 className="text-gray-900 dark:text-white font-semibold mb-4">{t('contact.social')}</h2>
                        <div className="flex space-x-4">
                          {Object.entries(settings.socialLinks).map(([platform, url]) => {
                            if (!url) return null;
                            const Icon = socialIcons[platform as keyof typeof socialIcons];
                            return (
                              <motion.a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Icon className="h-6 w-6" />
                              </motion.a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src={settings.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  {t('contact.error.loadingFailed')}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}