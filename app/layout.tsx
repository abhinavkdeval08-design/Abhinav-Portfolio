import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhinav Deval — Systems & Cloud-Native Software Engineer",
  description: "B.Tech ECE at IIIT Kalyani. Building low-latency client-side systems, cloud-native tooling, and algorithmic infrastructure. CNCF Contributor & GSSoC Global Rank #111.",
  keywords: ["Abhinav Deval", "Systems Engineer", "IIIT Kalyani", "CNCF", "Meshery", "Web Workers", "Next.js"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
