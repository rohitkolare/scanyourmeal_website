import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const headingFont = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.scanyourmeal.app"),
  title: "ScanYourMeal - The Smart Protein Tracker",
  description:
    "ScanYourMeal helps you hit protein goals with AI-powered meal scanning, instant nutrition insights, and clean progress tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
