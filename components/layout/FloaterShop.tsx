import * as React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Container, Flex } from "@chakra-ui/react";

export interface IAppProps {}

export default function FloaterShop(props: IAppProps) {
  return (
    <Flex
      w={"fit-content"}
      position={"sticky"}
      borderRadius={"full"}
      bottom={4}
      left={4}
      bgColor={"blue.400"}
      p={3}
    >
      <AiOutlineShoppingCart size="30px" />
    </Flex>
  );
}
