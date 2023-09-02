import { Flex, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import * as React from "react";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCartKey } from "@/storage";
import { useEffect, useState } from "react";
import { CartData } from "../interface/Globalnterface";
import { Cocart_get, fetcherCart } from "../HelperFunction";
import useSWR from "swr";
import { Search2Icon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export interface IMainProps {
  children: React.ReactNode;
}

export default function Main({ children }: IMainProps) {
  const { cart_key, cart_items, setCart_items, setCart_key } = useCartKey();

  useSWR<CartData>("setCart", () => fetcherCart({ url: "cart", cart_key }), {
    onSuccess(data, key, config) {
      setCart_items(data);
      setCart_key(data.cart_key);
    },
  });

  const router = useRouter();

  return (
    <Flex minHeight={"100vh"} w={"100%"} flexDir={"column"}>
      <Navbar />
      {children}
    </Flex>
  );
}
