import { Helmet } from "react-helmet";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({ 
  title = "Darling Details - Event Decoration Rentals",
  description = "Transform your special events with our premium collection of event decorations. From elegant weddings to intimate celebrations, we provide the perfect touches to make your event truly special.",
  image = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200",
  url = "https://darlingdetails.com"
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#6D28D9" />
      <link rel="canonical" href={url} />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
    </Helmet>
  );
}
