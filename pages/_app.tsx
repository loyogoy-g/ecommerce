import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import Main from "@/components/layout/Main";
import { SessionProvider } from "next-auth/react";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Main>
          <Component {...pageProps} />
        </Main>
      </SessionProvider>
    </ChakraProvider>
  );
}
