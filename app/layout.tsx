import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://abhinavkdeval.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: "Abhinav Deval — Backend & Cloud-Native Systems Engineer",
  description:
    "B.Tech ECE at IIIT Kalyani. Building real-time WebSocket systems, in-browser tooling and backend services. Fixes shipped in Meshery v1.0.77 (CNCF), plus open-source work in Layer5 and AsyncAPI. Creator of EnclavePDF. GSSoC '26 Global Rank #137.",
  keywords: [
    "Abhinav Deval",
    "Backend Engineer",
    "IIIT Kalyani",
    "EnclavePDF",
    "Web Workers",
    "WebSockets",
    "Meshery",
    "CNCF",
    "Go",
    "Layer5",
    "AsyncAPI",
    "GSSoC",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Abhinav Deval", url: "https://github.com/abhinavkdeval08-design" }],
  openGraph: {
    title: "Abhinav Deval — Backend & Cloud-Native Systems Engineer",
    description:
      "B.Tech ECE undergraduate at IIIT Kalyani. Creator of EnclavePDF (in-browser PDF compression, no uploads). Fixes shipped in Meshery v1.0.77 (CNCF); contributor to Layer5 and AsyncAPI.",
    url: "https://abhinavkdeval.vercel.app",
    siteName: "Abhinav Deval Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhinav Deval — Backend & Cloud-Native Systems Engineer",
    description:
      "B.Tech ECE undergraduate at IIIT Kalyani. Creator of EnclavePDF. Fixes shipped in Meshery v1.0.77 (CNCF).",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abhinav Deval",
  url: "https://abhinavkdeval.vercel.app",
  jobTitle: "Backend & Cloud-Native Systems Engineer",
  alumniOf: { "@type": "CollegeOrUniversity", name: "IIIT Kalyani" },
  sameAs: [
    "https://github.com/abhinavkdeval08-design",
    "https://linkedin.com/in/abhinavdeval",
    "https://leetcode.com/u/abhinav_deval07/",
    "https://codeforces.com/profile/abhinavkdeval29",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#09090b] text-zinc-300 selection:bg-emerald-500/30 font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
