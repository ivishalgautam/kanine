import { GeistSans } from "geist/font/sans";
import "./globals.css";
import QueryProvider from "@/components/QueryClientProvider";
import { Toaster } from "sonner";
import Context from "@/store/context";
import Layout from "@/components/layout";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

export const metadata = {
  title: "Kanine",
  description: "Kanine",
  keywords: "Kanine",
  authors: [{ name: "Online Parts Shop" }],
  publisher: "Kanine",
  openGraph: {
    title: "Kanine",
    description: "Kanine",
    images: [""],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
  verification: {
    google: "",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        <QueryProvider>
          <Context>
            <Toaster richColors />
            <Layout>{children}</Layout>
          </Context>
        </QueryProvider>
      </body>
      <GoogleAnalytics gaId="" />
    </html>
  );
}
