import { Inter, Rubik } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-body",
  display: "block",
});

export const fonts = {
  inter,
};
