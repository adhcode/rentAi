import type { Metadata } from "next";
import { Raleway } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway'
});

export const metadata: Metadata = {
  title: "RentAI - Find Your Perfect Home",
  description: "AI-powered rental search that understands your needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${raleway.variable} font-sans`}>
      <body>
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
