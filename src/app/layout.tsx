import type { Metadata } from "next";
import localFont from "next/font/local";
import { Lacquer, Special_Elite } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import { UserDataContextProvider } from "@/context/user";
import NavBar from "@/components/NavBar";

import "./globals.css";

const lacquer = Lacquer({ subsets: ["latin"], weight: "400", variable: "--font-lacquer" });

const specialElite = Special_Elite({ subsets: ["latin"], weight: "400", variable: "--font-specialElite" });

const se7en = localFont({
  src: "./fonts/Se7en.ttf",
  variable: "--font-se7en",
  weight: "400 600",
});


export const metadata: Metadata = {
  title: "Devstino",
  description: "Donde te encuentras con tu futuro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${se7en.variable} ${lacquer.variable} ${specialElite.variable} font-specialElite antialiased bg-black`}
      >
        <UserDataContextProvider>
        <header>
          <NavBar />
        </header>
        <main className="min-h-screen px-8 max-w-7xl mx-auto py-20">
          {children}
          <Toaster />
        </main>
        </UserDataContextProvider>
      </body>
    </html>
  );
}
