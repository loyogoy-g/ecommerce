import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Main from "@/components/layout/Main";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Main>
        <Component {...pageProps} />
      </Main>
    </ChakraProvider>
  );
}
