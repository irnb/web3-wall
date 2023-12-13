import { fonts } from "./fonts";
import { Providers } from "./providers";

import "./globals.css";
import { cn } from "@/lib/utils";

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
