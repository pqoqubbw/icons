import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import './globals.css';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
// import { SnowfallComponent } from '@/components/snowfall';
import { Toaster } from 'sonner';

import { Analytics } from '@/components/analytics';
import { Header } from '@/components/header';
import { PackageNameProvider } from '@/providers/package-name';
import { ThemeProvider } from '@/providers/theme';

// import ogImage from './og.png';

const andaleMono = localFont({
  src: '../fonts/ANDALEMO.woff',
  variable: '--font-mono',
  display: 'swap',
});

const gtCinetype = localFont({
  src: '../fonts/GT-Cinetype-Regular.woff',
  variable: '--font-sans',
  display: 'swap',
  weight: '400',
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
    // images: [
    //   {
    //     url: ogImage.src,
    //     width: ogImage.width,
    //     height: ogImage.height,
    //   },
    // ],
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
    // images: [
    //   {
    //     url: ogImage.src,
    //     width: ogImage.width,
    //     height: ogImage.height,
    //   },
    // ],
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${andaleMono.variable} ${gtCinetype.variable}`}
    >
      <body
        className={`${gtCinetype.className} bg-background relative antialiased`}
      >
        <div className="root">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PackageNameProvider>
              <Header />
              <NuqsAdapter>
                {children}
                <Toaster theme="light" position="bottom-right" />
                {/* <SnowfallComponent /> */}
              </NuqsAdapter>
              <Analytics />
            </PackageNameProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
