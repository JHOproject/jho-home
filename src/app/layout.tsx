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
import { Footer } from "@/components/footer";
import { ChatbotWidget } from "@/components/chatbot-widget";
import { GoogleAnalytics } from "@/components/google-analytics";

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
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-background">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <ChatbotWidget />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
