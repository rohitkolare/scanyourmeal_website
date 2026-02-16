import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";

const headingFont = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const bodyFont = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
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
