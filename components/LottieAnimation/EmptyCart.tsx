import * as React from "react";
import Lottie from "lottie-react";
import empty from "../../public/emptycart.json";
import { VStack, Text } from "@chakra-ui/react";

export interface IEmptyResultProps {}

export default function EmptyCart(props: IEmptyResultProps) {
  return (
    <VStack
      spacing={10}
      alignItems={"center"}
      justifyContent={"center"}
      h={"90vh"}
    >
      <Lottie animationData={empty} loop={true} />
      <Text fontWeight={"bold"} fontSize={["xl", "5xl"]}>
        Your Cart is Empty
      </Text>
    </VStack>
  );
}
