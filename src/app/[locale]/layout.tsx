import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: `${DATA.name} - Experienced Mobile Developer & Software Engineer`,
    template: `%s | ${DATA.name}`,
  },
  description: "Experienced Mobile Developer & Software Engineer specializing in Flutter, React Native, and innovative mobile applications. 5+ years of experience creating user-centered design solutions.",
  keywords: [
    "Mobile Developer",
    "Software Engineer", 
    "Flutter Developer",
    "React Native",
    "iOS Developer",
    "Android Developer",
    "UI/UX Designer",
    "Firebase",
    "Dart",
    "JavaScript",
    "TypeScript",
    "Mobile App Development",
    "Cross-platform Development",
    "Sébastien NOGBEDJI",
    "Portfolio",
    "Lomé",
    "Togo"
  ],
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  publisher: DATA.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${DATA.name} - Experienced Mobile Developer & Software Engineer`,
    description: "Experienced Mobile Developer & Software Engineer specializing in Flutter, React Native, and innovative mobile applications. 5+ years of experience creating user-centered design solutions.",
    url: DATA.url,
    siteName: `${DATA.name} Portfolio`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: '/cartoon-avatar.png',
        width: 400,
        height: 400,
        alt: `${DATA.name} - Mobile Developer Profile Picture`,
      },
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: `${DATA.name} Portfolio Logo`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: `${DATA.name} - Mobile Developer & Software Engineer`,
    description: "Experienced Mobile Developer specializing in Flutter, React Native, and innovative mobile applications.",
    site: "@devbyseb",
    creator: "@devbyseb",
    images: ['/cartoon-avatar.png'],
  },
  verification: {
    google: "",
    yandex: "",
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/logo.png',
        color: '#ff6b35',
      },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'portfolio',
  classification: 'Business',
  referrer: 'origin-when-cross-origin',
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params
}: Props) {
  // Await params before destructuring
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Performance and SEO optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ff6b35" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#ff6b35" media="(prefers-color-scheme: dark)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sébastien Portfolio" />
        <meta name="application-name" content="Sébastien Portfolio" />
        <meta name="msapplication-TileColor" content="#ff6b35" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for faster loading */}
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
        <link rel="dns-prefetch" href="https://twitter.com" />
        <link rel="dns-prefetch" href="https://instagram.com" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Sébastien NOGBEDJI",
              "jobTitle": "Mobile Developer & Software Engineer",
              "description": "Experienced Mobile Developer & Software Engineer specializing in Flutter, React Native, and innovative mobile applications. 5+ years of experience creating user-centered design solutions.",
              "url": "https://nssoftdev.nex-softwares.com",
              "sameAs": [
                "https://github.com/sebandroidev",
                "https://www.linkedin.com/in/sébastien-nogbedji-6169a4182",
                "https://twitter.com/devbyseb",
                "https://www.instagram.com/devbyseb/"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lomé",
                "addressCountry": "Togo"
              },
              "knowsAbout": [
                "Flutter Development",
                "Mobile App Development",
                "Software Engineering",
                "UI/UX Design",
                "React Native",
                "iOS Development",
                "Android Development",
                "Firebase",
                "Dart Programming",
                "JavaScript",
                "TypeScript"
              ],
              "email": "nssoftdev@gmail.com",
              "telephone": "+22890150096",
              "image": "https://nssoftdev.nex-softwares.com/cartoon-avatar.png"
            })
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6",
          fontSans.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <TooltipProvider delayDuration={0}>
              {children}
              <Navbar />
            </TooltipProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}