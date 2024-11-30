import "@mantine/core/styles.css";
import "~/styles/globals.css";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { Navbar } from "./_components/sidenav/Navbar";

import { ourFileRouter } from "~/app/api/uploadthing/core";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import MainProvider from "./_components/providers/MainProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <div>
              <Navbar />
              <div className="ml-[80px]">{children}</div>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </TRPCReactProvider>
        </MainProvider>
      </body>
    </html>
  );
}
