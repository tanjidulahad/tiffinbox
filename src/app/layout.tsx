import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono, Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const fraunces = Fraunces({
//   subsets: ["latin"],
//   variable: "--font-serif",
// });
// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });


const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TiffinBox | Homemade Food Near You",
  description: "Fresh homemade meals from trusted local home chefs.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // className={`${fraunces.variable} ${geistMono.variable} h-full antialiased`}
      className={manrope.className}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
        <Toaster position="top-center" richColors />
        {children}
        </Providers>
        </body>
    </html>
  );
}
