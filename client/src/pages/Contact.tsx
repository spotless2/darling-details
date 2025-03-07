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
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Facebook, Instagram, Twitter } from "lucide-react";
import { useContentful, type ContactInfo } from "@/lib/contentful";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "contact.form.errors.nameRequired"
  }),
  email: z.string().email({
    message: "contact.form.errors.emailInvalid"
  }),
  phone: z.string().min(10, {
    message: "contact.form.errors.phoneRequired"
  }),
  message: z.string().min(10, {
    message: "contact.form.errors.messageRequired"
  }),
});

export default function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { getContactInfo } = useContentful();

  const { data: contactInfo, isLoading: settingsLoading } = useQuery<ContactInfo>({
    queryKey: ["contactInfo"],
    queryFn: getContactInfo,
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          ...values,
        }),
      });

      if (response.ok) {
        toast({
          title: t('contact.success.title'),
          description: t('contact.success.description'),
        });
        form.reset();
      } else {
        throw new Error(t('contact.form.errors.submitFailed'));
      }
    } catch (error) {
      toast({
        title: t('contact.error.title'),
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: "destructive",
      });
    }
  }

  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            {/* Primary Background Image */}
            <div 
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=2000')] bg-cover bg-center bg-fixed"
              style={{ opacity: 0.25 }}
            />
            {/* Multiple Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 via-background/90 to-background" />

            {/* Animated Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.15]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.primary.DEFAULT)/0.1_1px,transparent_1px)] [background-size:40px_40px]" />
            </div>
          </div>

          <div className="container mx-auto px-6 relative">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h1 className="text-4xl font-bold mb-4">
                  <span className="relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/90 via-purple-500 to-primary blur-2xl opacity-50" />
                    <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary animate-gradient bg-300%">
                      {t('contact.title')}
                    </span>
                  </span>
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300">{t('contact.subtitle')}</p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
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
                                className="min-h-[120px] resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={false} // Removed mutation.isPending as it's not relevant anymore
                      >
                        { /*Removed Loading indicator.  Not necessary for Web3Forms */}
                          {t('contact.form.submit')}
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
                  ) : contactInfo ? (
                    <>
                      <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-gray-900 dark:text-white font-semibold mb-2">{t('contact.info.email')}</h2>
                            <p className="text-gray-700 dark:text-gray-300">{contactInfo.fields.email}</p>
                          </div>
                          <div>
                            <h2 className="text-gray-900 dark:text-white font-semibold mb-2">{t('contact.info.phone')}</h2>
                            <p className="text-gray-700 dark:text-gray-300">{contactInfo.fields.phone}</p>
                          </div>
                          <div>
                            <h2 className="text-gray-900 dark:text-white font-semibold mb-2">{t('contact.info.address')}</h2>
                            <p className="text-gray-700 dark:text-gray-300">{contactInfo.fields.address}</p>
                          </div>
                          <div>
                            <h2 className="text-gray-900 dark:text-white font-semibold mb-2">{t('contact.info.workingHours')}</h2>
                            <div className="space-y-2">
                              {Object.entries(contactInfo.fields.workingHours).map(([day, hours]) => (
                                <div key={day} className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400 capitalize">{t(`contact.days.${day}`)}</span>
                                  <span className="text-gray-700 dark:text-gray-300">{hours}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h2 className="text-gray-900 dark:text-white font-semibold mb-4">{t('contact.info.social')}</h2>
                            <div className="flex space-x-4">
                              {Object.entries(contactInfo.fields.socialLinks).map(([platform, url]) => {
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

                      <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg">
                        <iframe
                          src={contactInfo.fields.mapUrl}
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
          </div>
        </section>
      </main>
    </div>
  );
}