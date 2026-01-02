import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/tailwind.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinVerse - Institutional-Grade Trading for Everyone",
  description: "The only platform combining advanced stock analysis with seamless Web3 crypto trading in one secure dashboard.",
  icons: {
    icon: '/finverse.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
