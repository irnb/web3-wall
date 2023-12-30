import type { Metadata } from "next";
const metaVars = {
  title: "Farm Wall",
  description:
    "A fun minting wall for farming the high potential blockchains with guaranteed prizes.",
};
export const GlobalMetadata: Metadata = {
  title: metaVars.title,
  description: metaVars.description,
  metadataBase: new URL("https://farmwall.fun"),
  openGraph: {
    title: metaVars.title,
    description: metaVars.description,
    url: "https://farmwall.fun/waitlist",
    siteName: metaVars.title,
    images: {
      url: "/cover.jpg",
      width: 400,
      height: 400,
      type: "image/jpg",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: metaVars.title,
    description: metaVars.description,
    images: ["/cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};
