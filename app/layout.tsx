import type { Metadata } from "next";
import { Geist, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import Whatsapp from "@/components/Whatsapp";
import Menu from "@/components/Menu";
import { MenuProvider } from "@/context/menuContext";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import CookieBanner from "@/components/consent/CookieBanner";
import CookieSettingsModal from "@/components/consent/CookieSettingsModal";
import NavigationTracker from "@/components/tracking/NavigationTracker";
import { DEFAULT_KEYWORDS, getSiteUrl } from "@/lib/seo";

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Custom Metal Gates & Railings in Moradabad | Afsha Creative Solution",
    template: "%s",
  },
  description: "Explore premium custom metal gates, architectural railings and decorative metalwork by Afsha Creative Solution in Moradabad, India. Request a custom design and quote.",
  keywords: DEFAULT_KEYWORDS,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Afsha Creative Solution",
    title: "Custom Metal Gates & Railings in Moradabad | Afsha Creative Solution",
    description: "Explore premium custom metal gates, architectural railings and decorative metalwork by Afsha Creative Solution in Moradabad, India. Request a custom design and quote.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Metal Gates & Railings in Moradabad | Afsha Creative Solution",
    description: "Explore premium custom metal gates, architectural railings and decorative metalwork by Afsha Creative Solution in Moradabad, India. Request a custom design and quote.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Afsha Creative Solution",
  url: getSiteUrl(),
  email: "afshacreativesolutions@gmail.com",
  telephone: "+91-9624776691",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Harthala, Lodhipur",
    addressLocality: "Moradabad",
    addressRegion: "Uttar Pradesh",
    postalCode: "244001",
    addressCountry: "IN",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Afsha Creative Solution",
  url: getSiteUrl(),
  email: "afshacreativesolutions@gmail.com",
  telephone: "+91-9624776691",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Harthala, Lodhipur",
    addressLocality: "Moradabad",
    addressRegion: "Uttar Pradesh",
    postalCode: "244001",
    addressCountry: "IN",
  },
  areaServed: "Moradabad, Uttar Pradesh, India",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Afsha Creative Solution",
  url: getSiteUrl(),
  potentialAction: {
    "@type": "SearchAction",
    target: `${getSiteUrl()}/products?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", geist.variable, outfit.variable)}
    >
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd data={[organizationSchema, localBusinessSchema, websiteSchema]} />
        <Analytics />
        <ConsentProvider>
          <NavigationTracker />
          <MenuProvider>
            <Navbar />
            <Menu />
            <Whatsapp />
            {children}
            <Footer />
            <CookieBanner />
            <CookieSettingsModal />
          </MenuProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
