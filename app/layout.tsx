import type { Metadata, Viewport } from 'next';
import { Geist_Mono } from 'next/font/google';

import './globals.css';

import { ArrowUpRight } from 'lucide-react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
// import { SnowfallComponent } from '@/components/snowfall';
import { Toaster } from 'sonner';

import { Analytics } from '@/components/analytics';
import { Header } from '@/components/header';
import { Banner } from '@/components/ui/banner';
import { LINK } from '@/constants';
import { PackageNameProvider } from '@/providers/package-name';
import { ThemeProvider } from '@/providers/theme';
import ogImage from './og.png';

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lucide-animated.com'),
  openGraph: {
    title: 'lucide-animated',
    description: 'beautifully crafted animated icons',
    siteName: 'lucide-animated',
    type: 'website',
    locale: 'en_US',
    url: 'https://lucide-animated.com',
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: 'index, follow',
  },
  applicationName: 'lucide-animated',
  appleWebApp: {
    title: 'lucide-animated',
    statusBarStyle: 'default',
    capable: true,
  },
  title: {
    default: 'lucide-animated',
    template: `%s - lucide-animated`,
  },
  description: 'beautifully crafted animated icons',
  twitter: {
    card: 'summary_large_image',
    title: 'lucide-animated',
    description: 'beautifully crafted animated icons',
    creator: '@pqoqubbw',
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.className} bg-background relative antialiased dark:bg-[#151515]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PackageNameProvider>
            <a href={LINK.HELPY_UI} target="_blank" className="group">
              <Banner variant="rainbow" className="h-10 text-xs md:text-sm">
                <p className="underline-offset-4 group-hover:underline">
                  🎉 helpy-ui - warm blanket for your projects
                </p>
                <ArrowUpRight
                  className="ml-1 size-3.5 shrink-0 transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </Banner>
            </a>
            <Header />
            <NuqsAdapter>
              {children}
              <Toaster theme="light" position="bottom-right" />
              {/* <SnowfallComponent /> */}
            </NuqsAdapter>
            <Analytics />
          </PackageNameProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
