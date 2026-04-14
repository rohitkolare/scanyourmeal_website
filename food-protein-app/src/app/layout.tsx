import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.scanyourmeal.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ScanYourMeal — AI Nutrition Tracker & Food Macro Scanner",
    template: "%s | ScanYourMeal",
  },
  description:
    "Scan any meal with your camera to instantly track calories, protein, carbs, and fat. ScanYourMeal is the AI nutrition tracker that makes logging food effortless.",
  keywords: [
    "AI nutrition tracker",
    "food macro scanner",
    "scan meals for macros",
    "AI calorie counter",
    "protein tracker app",
    "meal scanning app",
    "AI food tracker",
    "macro tracking app",
    "scan food nutrition",
    "photo calorie tracker",
  ],
  applicationName: "ScanYourMeal",
  authors: [{ name: "ScanYourMeal" }],
  creator: "ScanYourMeal",
  publisher: "ScanYourMeal",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "ScanYourMeal",
    title: "ScanYourMeal — AI Nutrition Tracker & Food Macro Scanner",
    description:
      "Scan any meal to instantly track calories, protein, carbs, and fat. The AI nutrition tracker that makes logging food effortless.",
    locale: "en_US",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "ScanYourMeal — AI meal scanning and nutrition tracking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScanYourMeal — AI Nutrition Tracker & Food Macro Scanner",
    description:
      "Scan any meal to instantly track calories, protein, carbs, and fat. The AI nutrition tracker that makes logging food effortless.",
    images: ["/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "health",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: "ScanYourMeal",
      url: siteUrl,
      logo: `${siteUrl}/hero.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: "ScanYourMeal",
      publisher: { "@id": `${siteUrl}#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      name: "ScanYourMeal",
      applicationCategory: "HealthApplication",
      operatingSystem: "iOS, Android",
      description:
        "AI nutrition tracker that scans meals from a photo to instantly track calories, protein, carbs, and fat.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "1280",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does AI meal scanning work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ScanYourMeal uses computer vision to identify foods in a single photo, estimate portion sizes, and compute calories, protein, carbs, and fat in seconds.",
          },
        },
        {
          "@type": "Question",
          name: "Is ScanYourMeal an accurate calorie and macro tracker?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. ScanYourMeal combines visual recognition with a nutrition database and confidence scoring to deliver high-accuracy macro tracking from any meal photo.",
          },
        },
        {
          "@type": "Question",
          name: "Can I track protein goals with ScanYourMeal?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ScanYourMeal is built around protein and macro goals. Set a daily target and the app tracks your progress automatically from each scanned meal.",
          },
        },
        {
          "@type": "Question",
          name: "Is ScanYourMeal free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ScanYourMeal offers a free tier so you can scan meals and track macros without a subscription.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased scroll-smooth`}>
      <body className="font-sans bg-[#09090b] text-white overflow-x-hidden min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
