import type { Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Toaster } from "@/components/toaster";
import { PackageNameProvider } from "@/providers/package-name";
import { ThemeProvider } from "@/providers/theme";
import { JsonLdScripts } from "@/seo/json-ld";
import { baseMetadata } from "@/seo/metadata";

const andaleMonoLocal = localFont({
  src: "../fonts/ANDALEMO.woff",
  variable: "--font-mono",
  display: "swap",
});

const gtCinetypeLocal = localFont({
  src: "../fonts/GT-Cinetype-Regular.woff",
  variable: "--font-sans",
  display: "swap",
  weight: "400",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const useProductionFonts =
  process.env.NODE_ENV === "production" ||
  process.env.USE_PRODUCTION_FONTS === "true";

const andaleMono = useProductionFonts ? andaleMonoLocal : geistMono;
const gtCinetype = useProductionFonts ? gtCinetypeLocal : geist;

export const metadata = baseMetadata;

export const viewport: Viewport = {
  width: "device-width",
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
      className={`${andaleMono.variable} ${gtCinetype.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${gtCinetype.className} relative bg-background antialiased`}
      >
        <div className="root">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            <PackageNameProvider>
              <main className="flex-1">
                <blockquote className="sr-only">
                  <a href="/llms.txt">llms.txt</a>
                </blockquote>
                <NuqsAdapter>{children}</NuqsAdapter>
                <Toaster />
              </main>
              <Header />
              <Analytics />
              <Footer />
              <JsonLdScripts />
            </PackageNameProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
