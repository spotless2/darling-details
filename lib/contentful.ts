import { createClient } from 'contentful'
import type { EntrySkeletonType } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
})

export interface Category extends EntrySkeletonType {
  contentTypeId: 'category'
  fields: {
    name: string
    description: string
    mainImage: {
      fields: {
        file: {
          url: string
        }
      }
    }
  }
}

export interface Product extends EntrySkeletonType {
  contentTypeId: 'product'
  fields: {
    title: string
    description: string
    image: {
      fields: {
        file: {
          url: string
        }
      }
    }
    category: {
      sys: {
        id: string
      }
    }
  }
}

export interface ContactInfo extends EntrySkeletonType {
  contentTypeId: 'contactInfo'
  fields: {
    phone: string
    email: string
    address: string
    mapUrl: string
    workingHours: Record<string, string>
    socialLinks: {
      facebook?: string
      instagram?: string
      twitter?: string
    }
  }
}

export interface CompanyStats extends EntrySkeletonType {
  contentTypeId: 'companyStats'
  fields: {
    totalEvents: string
    totalVenues: string
    totalClients: string
    satisfactionRate: string
  }
}

export async function getCategories() {
  const entries = await client.getEntries<Category>({
    content_type: 'category',
  })
  return entries.items
}

export async function getProducts() {
  const entries = await client.getEntries<Product>({
    content_type: 'product',
    include: 2,
  })
  return entries.items
}

export async function getContactInfo() {
  const entries = await client.getEntries<ContactInfo>({
    content_type: 'contactInfo',
    limit: 1,
  })
  return entries.items[0]
}

export async function getCompanyStats() {
  const entries = await client.getEntries<CompanyStats>({
    content_type: 'companyStats',
    limit: 1,
  })
  return entries.items[0]
}
