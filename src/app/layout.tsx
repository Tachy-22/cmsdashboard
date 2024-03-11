import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import "./globals.css";
import NextProviders from "./NextProviders";
import { bgStyle, textStyle } from "@/lib/twStyles";
import { EdgeStoreProvider } from "@/lib/edgestore";
import StoreProvider from "./ReduxProvider";
import NavBar from "@/components/NavBar";
import { getServerSession } from "next-auth";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "cms dashboard",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

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
            <EdgeStoreProvider>
              <div className={`overflow-clip ${bgStyle} ${textStyle} `}>
                <NavBar session={session} />

                {children}
                <Toaster />
              </div>
            </EdgeStoreProvider>
          </StoreProvider>
        </NextProviders>
      </body>
    </html>
  );
}
