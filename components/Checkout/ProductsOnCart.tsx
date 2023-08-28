import { Button, Flex } from "@chakra-ui/react";
import * as React from "react";
import ProductView from "./ProductView";
import { useCartKey } from "@/storage";
import { Cocart_get } from "../HelperFunction";
import ProductSummary from "./ProductSummary";

export default function ProductsOnCart({ onOpen }: { onOpen: () => void }) {
  const { cart_items } = useCartKey();
  const items = cart_items ? cart_items.items : [];

  return (
    <Flex gap={3} flexDir={"column"}>
      {items.map((order, index) => {
        return <ProductView {...order} />;
      })}
      <ProductSummary />
      <Button onClick={onOpen} color={"white"} bgColor={"blackAlpha.800"}>
        Proceed to Shipping Details
      </Button>
    </Flex>
  );
}
