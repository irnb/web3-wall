import { fonts } from "./fonts";
import { Providers } from "./providers";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fonts.inter.variable}>
      <body className="bg-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
