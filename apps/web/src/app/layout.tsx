import { fonts } from "./fonts";
import { Providers } from "./providers";

import "./globals.css";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { GlobalMetadata } from "./metadata";

export const metadata: Metadata = GlobalMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          fonts.inter.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
