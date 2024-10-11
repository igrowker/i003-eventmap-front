import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import { UserProvider } from "../components/UserContext";

const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"] });

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
      <body className={`bg-white ${lato.className}`}>
        <UserProvider>
          {children}
          {<NavBar />}          
        </UserProvider>
      </body>
    </html>
  );
}
