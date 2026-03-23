import type { Metadata } from "next";
import { Sarabun, Geist } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import Provider from "@/components/providers";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const sarabun = Sarabun({
  weight: ["400", "500", "600"],
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Emergency Pin-Alert",
    template: "%s | Emergency Pin-Alert",
  },
  description: "Emergency Pin-Alert for Khon Kaen University",
  icons: "/images/logo/favicon.ico",
  openGraph: {
    title: "Emergency Pin-Alert",
    description: "Emergency Pin-Alert for Khon Kaen University",
    siteName: "Emergency Pin-Alert",
    images: [
      {
        url: "/images/logo/favicon.ico", // รูป preview เวลามีคนแชร์
        width: 800,
        height: 600,
        alt: "Emergency Pin-Alert Banner",
      },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className={sarabun.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
