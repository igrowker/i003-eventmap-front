import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({ weight: ['300', '400', '700'], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EventMap",
  description: "Maps and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  );
}
