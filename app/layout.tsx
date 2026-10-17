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
    "B.Tech ECE at IIIT Kalyani. Building real-time WebSocket systems, in-browser tooling and backend services. Open-source contributor to Layer5 (CNCF) and AsyncAPI. Creator of EnclavePDF. GSSoC '26 Global Rank #137.",
  keywords: [
    "Abhinav Deval",
    "Backend Engineer",
    "IIIT Kalyani",
    "EnclavePDF",
    "Web Workers",
    "WebSockets",
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
      "B.Tech ECE undergraduate at IIIT Kalyani. Creator of EnclavePDF (in-browser PDF compression, no uploads). Contributor to Layer5 (CNCF) and AsyncAPI.",
    url: "https://abhinavkdeval.vercel.app",
    siteName: "Abhinav Deval Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhinav Deval — Backend & Cloud-Native Systems Engineer",
    description:
      "B.Tech ECE undergraduate at IIIT Kalyani. Creator of EnclavePDF. Contributor to Layer5 (CNCF) and AsyncAPI.",
  },
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
        {children}
      </body>
    </html>
  );
}
