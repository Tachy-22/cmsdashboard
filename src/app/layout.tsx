import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextProviders from "./NextProviders";
import ScreenWidth from "@/components/screen-width";
import { bgStyle, textStyle } from "@/lib/twStyles";
import { EdgeStoreProvider } from "@/lib/edgestore";
import StoreProvider from "./ReduxProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "cms dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <NextProviders
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <div
              className={`flex  h-screen min-h-screen ${bgStyle} ${textStyle} `}
            >
              <EdgeStoreProvider>{children}</EdgeStoreProvider>
            </div>
            {/* <ScreenWidth /> */}
          </StoreProvider>
        </NextProviders>
      </body>
    </html>
  );
}
