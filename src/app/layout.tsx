import "@mantine/core/styles.css";
import "~/styles/globals.css";

import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import MainProvider from "./_components/providers/MainProvider";

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
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </MainProvider>
      </body>
    </html>
  );
}
