import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CollegeProvider } from "@/context/CollegeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mabadi — College Discovery & Decision Platform",
  description: "Search, filter, and compare top Indian colleges. Features verified NIRF ranks, actual tuition fees, placement CTCs, cutoff predictor, and student Q&A forum.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        <CollegeProvider>{children}</CollegeProvider>
      </body>
    </html>
  );
}
