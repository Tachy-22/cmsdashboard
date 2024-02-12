"use client";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import React from "react";

function NextProviders({ children, ...props }: ThemeProviderProps) {
  return (
    <NextUIProvider>
      <ThemeProvider {...props}>
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
}

export default NextProviders;
