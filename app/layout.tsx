import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NI · Workspace IA",
  description: "Plateforme IA privee de New Ingenia SA",
  icons: {
    icon: "/ni-logo-neg.png",
    shortcut: "/ni-logo-neg.png",
    apple: "/ni-logo-neg.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#ececec] text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
