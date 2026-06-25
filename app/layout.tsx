import type { Metadata } from 'next';
import './globals.css';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://inhimdaily.org'),
  title: {
    default: 'In Him Daily | Daily Christian Devotionals & Faith Community',
    template: '%s | In Him Daily',
  },
  description:
    'Grow closer to Christ through daily devotionals, Bible reflections, prayer resources, and a thriving Christian community. Written for adults, teens, and children — every generation, every day.',
  keywords: [
    'Christian devotional',
    'daily devotional',
    'family devotional',
    'daily Bible reading',
    'Bible reflections',
    'prayer resources',
    'Christian community',
    'faith community',
    'generational devotional',
    'kids devotional',
    'teen devotional',
    'adult devotional',
    'In Him Daily',
    'Jesus devotional',
    'family Bible study',
    'daily scripture',
    'grow closer to Christ',
  ],
  authors: [{ name: 'In Him Daily', url: 'https://inhimdaily.org' }],
  creator: 'In Him Daily',
  publisher: 'In Him Daily',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://inhimdaily.org',
    siteName: 'In Him Daily',
    title: 'In Him Daily | Every Generation. One Jesus. Every Day.',
    description:
      'A devotional ministry helping families encounter Jesus together—adults, teens, and children reading the same scripture every day.',
    images: [
      {
        url: '/images/ChatGPT_Image_Jun_12,_2026,_11_01_49_PM.png',
        width: 1200,
        height: 630,
        alt: 'In Him Daily — Every Generation. One Jesus. Every Day.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'In Him Daily | Every Generation. One Jesus. Every Day.',
    description:
      'Helping families encounter Jesus together—adults, teens, and children reading the same scripture every day.',
    images: ['/images/ChatGPT_Image_Jun_12,_2026,_11_01_49_PM.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/ChatGPT_Image_Jun_12,_2026,_11_01_49_PM.png',
  },
  alternates: {
    canonical: 'https://inhimdaily.org',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#17324D" />
      </head>
      <body className={`${inter.className} bg-[#FAF8F3] text-[#1A1A1A] min-h-screen antialiased`}>
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
