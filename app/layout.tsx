import type { Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";

import { CircleXIcon, TriangleAlertIcon } from "lucide-react";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
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
      <head>
        <JsonLdScripts />
      </head>
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
              <Header />
              <main className="flex-1">
                <NuqsAdapter>
                  {children}
                  <Toaster
                    icons={{
                      error: (
                        <CircleXIcon className="size-4 text-red-600 dark:text-red-400" />
                      ),
                      warning: (
                        <TriangleAlertIcon className="size-4 text-yellow-500 dark:text-yellow-400" />
                      ),
                    }}
                    position="top-center"
                    toastOptions={{
                      classNames: {
                        toast:
                          "!bg-white !px-4 !py-4 !flex-wrap dark:!bg-black !gap-0 !border-neutral-900/5 dark:!border-neutral-100/10 supports-[corner-shape:squircle]:!corner-squircle supports-[corner-shape:squircle]:!rounded-[30px] !rounded-[14px]",
                        title: "font-sans text-black dark:!text-white",
                        icon: "translate-y-[-9.5px]",
                        actionButton:
                          "!mt-2 w-full flex items-center justify-center !font-sans !bg-primary focus-visible:outline-primary cursor-pointer !h-8 !text-[14px] transition-colors duration-100 hover:!bg-[color-mix(in_oklab,var(--color-primary),black_10%)] focus-visible:outline-1 focus-visible:outline-offset-1 supports-[corner-shape:squircle]:!corner-squircle supports-[corner-shape:squircle]:!rounded-[30px] !rounded-[14px]",
                        description:
                          "font-sans text-secondary dark:!text-secondary",
                      },
                    }}
                  />
                </NuqsAdapter>
              </main>
              <Analytics />
              <Footer />
            </PackageNameProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
