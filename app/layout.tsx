import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Organization, WithContext } from "schema-dts";
import Head from "next/head";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BlackComet",
  description:
    "BlackComet is an innovative software company, driven by a passion for cutting-edge technology and creative problem-solving. Focused on developing high-quality products and providing bespoke outsourcing services",
};

const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BlackComet",
  email: "support@blackcomet.net",
  url: "https://www.blackcomet.net",
  address: {
    "@type": "PostalAddress",
    addressCountry: "NL",
    addressRegion: "Zuid-Holland",
    addressLocality: "Rotterdam",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
        id="organization_schema"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
