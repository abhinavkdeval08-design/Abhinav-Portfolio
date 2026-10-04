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
  title: "Abhinav Deval — Systems & Cloud-Native Software Engineer",
  description:
    "B.Tech ECE at IIIT Kalyani. Building low-latency client-side systems, cloud-native tooling, and algorithmic infrastructure. CNCF Contributor, Creator of EnclavePDF & GSSoC Global Rank #111.",
  keywords: [
    "Abhinav Deval",
    "Systems Engineer",
    "IIIT Kalyani",
    "EnclavePDF",
    "Zero-Egress",
    "Web Workers",
    "CNCF",
    "Meshery",
    "Layer5",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Abhinav Deval", url: "https://github.com/abhinavkdeval08-design" }],
  openGraph: {
    title: "Abhinav Deval — Systems & Cloud-Native Software Engineer",
    description:
      "B.Tech ECE undergraduate at IIIT Kalyani. Architect of EnclavePDF (zero-egress in-browser compression engine) & CNCF Meshery contributor.",
    url: "https://abhinavkdeval.vercel.app",
    siteName: "Abhinav Deval Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhinav Deval — Systems & Cloud-Native Software Engineer",
    description:
      "B.Tech ECE undergraduate at IIIT Kalyani. Architect of EnclavePDF & CNCF Meshery contributor.",
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
