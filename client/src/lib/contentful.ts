import { createClient } from 'contentful';

// Contentful client configuration
export const contentfulClient = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
});

// Type definitions for Contentful content models
export interface Category {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    description: string;
    mainImage: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
}

export interface Product {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    description: string;
    image: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    category: {
      sys: {
        id: string;
      };
    };
  };
}

export interface ContactInfo {
  sys: {
    id: string;
  };
  fields: {
    phone: string;
    email: string;
    address: string;
    mapUrl: string;
    workingHours: Record<string, string>;
    socialLinks: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };
}

export interface CompanyStats {
  sys: {
    id: string;
  };
  fields: {
    totalEvents: string;
    totalVenues: string;
    totalClients: string;
    satisfactionRate: string;
  };
}

// Custom hooks for data fetching
export const useContentful = () => {
  const getCategories = async () => {
    const entries = await contentfulClient.getEntries<Category>({
      content_type: 'category',
    });
    return entries.items;
  };

  const getProducts = async () => {
    const entries = await contentfulClient.getEntries<Product>({
      content_type: 'product',
      include: 2,
    });
    return entries.items;
  };

  const getContactInfo = async () => {
    const entries = await contentfulClient.getEntries<ContactInfo>({
      content_type: 'contactInfo',
      limit: 1,
    });
    return entries.items[0];
  };

  const getCompanyStats = async () => {
    const entries = await contentfulClient.getEntries<CompanyStats>({
      content_type: 'companyStats',
      limit: 1,
    });
    return entries.items[0];
  };

  return {
    getCategories,
    getProducts,
    getContactInfo,
    getCompanyStats,
  };
};
