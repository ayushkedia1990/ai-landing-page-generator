import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { isClerkConfigured } from "@/lib/clerk";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Landing Page Generator",
  description: "Create, refine, and publish AI-generated landing pages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  );

  const wrappedContent = isClerkConfigured() ? <ClerkProvider>{content}</ClerkProvider> : content;

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {wrappedContent}
      </body>
    </html>
  );
}
