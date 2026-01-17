import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jessie Ho - Software Engineer",
    template: "%s | Jessie Ho",
  },
  description: "Personal website of Jessie Ho, a software engineer building accessible and performant web applications.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jho-home.github.io/", // Placeholder or assumption based on GH Actions
    siteName: "Jessie Ho",
    images: [
      {
        url: "/og-image.jpg", // Placeholder
        width: 1200,
        height: 630,
        alt: "Jessie Ho",
      }
    ]
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://jho-home.github.io"),
};

import { Header } from "@/components/header";

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-screen bg-background">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
