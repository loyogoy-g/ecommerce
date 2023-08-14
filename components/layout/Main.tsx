import { Flex } from "@chakra-ui/react";
import * as React from "react";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";

export interface IMainProps {
  children: React.ReactNode;
}

export default function Main({ children }: IMainProps) {
  const { status, data } = useSession();
  return (
    <Flex height={"100vh"} w={"100%"} pos={"relative"} flexDir={"column"}>
      <Navbar />
      {children}
    </Flex>
  );
}
