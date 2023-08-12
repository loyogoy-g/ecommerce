import { Box, Container, Flex } from "@chakra-ui/react";
import * as React from "react";
import Navbar from "./Navbar";
import FloaterShop from "./FloaterShop";
import { AiOutlineShoppingCart } from "react-icons/ai";

export interface IMainProps {
  children: React.ReactNode;
}

export default function Main({ children }: IMainProps) {
  return (
    <Flex height={"100vh"} w={"100%"} pos={"relative"} flexDir={"column"}>
      <Navbar />
      {children}
    </Flex>
  );
}
