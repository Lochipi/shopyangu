import "@mantine/core/styles.css";
import "~/styles/globals.css";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "~/app/api/uploadthing/core";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import MainProvider from "./_components/providers/MainProvider";
import Navbar from "./_components/Navbar";

export const metadata: Metadata = {
  title: "Shop Yangu",
  description:
    "Efficiently manage shops and products on the Shop Yangu platform",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <MainProvider>
          <TRPCReactProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <Navbar />
            {children}
          </TRPCReactProvider>
        </MainProvider>
      </body>
    </html>
  );
}
