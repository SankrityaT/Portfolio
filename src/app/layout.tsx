import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: "Sankritya Thakur - Portfolio",
  description: "Sankritya Thakur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <head>
        {/* Favicon Links */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon/favicon-48x48.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={`${nunito.className} bg-[#0a0a0a]`}>
        <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
