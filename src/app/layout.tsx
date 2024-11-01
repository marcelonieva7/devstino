import type { Metadata } from "next";
import localFont from "next/font/local";
import { Lacquer, Special_Elite } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import { UserDataContextProvider } from "@/context/user";
import NavBar from "@/components/NavBar";

import "./globals.css";
import { getCldOgImageUrl } from "next-cloudinary";

const lacquer = Lacquer({ subsets: ["latin"], weight: "400", variable: "--font-lacquer" });
const specialElite = Special_Elite({ subsets: ["latin"], weight: "400", variable: "--font-specialElite" });

const se7en = localFont({
  src: "./fonts/Se7en.ttf",
  variable: "--font-se7en",
  weight: "400 600",
});

const gotHeroin = localFont({
  src: "./fonts/Got_Heroin.ttf",
  variable: "--font-gotHeroin",
  weight: "400",
});

const imgId = "tetrical/assets/android-chrome-512x512_jx4mhi"
const url = getCldOgImageUrl({src: imgId})

export const metadata: Metadata = {
  title: "DevStino Final",
  description: "Donde te encuentras con tu futuro",
  openGraph: {
    type: "website",
    description: "Donde te encuentras con tu futuro",
    title: "DevStino Final",
    url: "https://devstinofinal.vercel.app",
    siteName: "DevStino Final",
    images: [
      {
        url,
        width: 512,
        height: 512,
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <body
        className={`
          ${gotHeroin.variable} ${se7en.variable} ${lacquer.variable} ${specialElite.variable}
          font-specialElite antialiased bg-black
        `}
      >
        <UserDataContextProvider>
        <header>
          <NavBar />
        </header>
        <main className="min-h-screen px-8 max-w-7xl mx-auto py-16">
          {children}
          <Toaster />
        </main>
        </UserDataContextProvider>
      </body>
    </html>
  );
}
