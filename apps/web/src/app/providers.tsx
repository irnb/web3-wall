"use client";

import { web3wallTheme } from "@/config/theme";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={web3wallTheme}>{children}</ChakraProvider>;
}
