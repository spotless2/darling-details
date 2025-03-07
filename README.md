# Darling Details - Event Decoration Rentals

A serverless B2B SaaS platform built with React, Contentful CMS, and Web3Forms.

## Features
- Content management through Contentful CMS
- Contact form handling with Web3Forms
- Responsive design with mobile-first approach
- Dark mode support
- Internationalization (i18n)
- SEO optimized

## Prerequisites
- Node.js (version 18 or higher)
- npm (comes with Node.js)
- Contentful account
- Web3Forms account

## Setup

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
# Contentful
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token
VITE_CONTENTFUL_ENVIRONMENT=master

# Web3Forms
VITE_WEB3FORMS_KEY=your_web3forms_key
```

3. Configure Contentful:
   - Create a new space in Contentful
   - Create the following content models:
     - Category (name, description, mainImage)
     - Product (title, description, image, category reference)
     - ContactInfo (phone, email, address, mapUrl, workingHours, socialLinks)
     - CompanyStats (totalEvents, totalVenues, totalClients, satisfactionRate)
   - Add your content
   - Copy your space ID and access token to the `.env` file

4. Set up Web3Forms:
   - Create an account at web3forms.com
   - Get your API key
   - Add it to the `.env` file

5. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5000

## Deployment
The application can be deployed to any static hosting service (Vercel, Netlify, etc.) since it's now completely serverless.

## Content Management
All content can be managed through the Contentful web interface. This includes:
- Products and categories
- Contact information
- Company statistics
- Social media links

## Tech Stack
- React with Vite
- TailwindCSS
- Contentful CMS
- Web3Forms
- React Query
- Framer Motion
- shadcn/ui components
