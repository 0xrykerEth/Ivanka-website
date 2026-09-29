import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Ivanka Rent a Car | Luxury Car Rental in Dubai, UAE",
  description: "Rent luxury and exotic cars in Dubai. Ferrari, Lamborghini, Rolls Royce, Mercedes, Porsche and more. Premium car rental service in UAE.",
  keywords: "luxury car rental dubai, exotic car rental uae, rent ferrari dubai, rent lamborghini dubai, rolls royce rental dubai, sports car hire uae, rent porsche dubai, rent bentley dubai",
  metadataBase: new URL("https://ivankarentacar.ae"),
  alternates: {
    canonical: "https://ivankarentacar.ae",
  },
  openGraph: {
    title: "Ivanka Rent a Car | Luxury Car Rental in Dubai, UAE",
    description: "Rent luxury and exotic cars in Dubai. Ferrari, Lamborghini, Rolls Royce, Mercedes, Porsche and more.",
    url: "https://ivankarentacar.ae",
    siteName: "Ivanka Rent a Car",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/cars/aston-martin/aston-martin-1.webp",
        width: 1200,
        height: 630,
        alt: "Ivanka Rent a Car — Luxury Car Rental Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ivanka Rent a Car | Luxury Car Rental in Dubai, UAE",
    description: "Rent luxury and exotic cars in Dubai. Ferrari, Lamborghini, Rolls Royce, Mercedes, Porsche and more.",
    images: ["/cars/aston-martin/aston-martin-1.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AE" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
