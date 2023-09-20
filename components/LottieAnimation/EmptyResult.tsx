import * as React from "react";
import Lottie from "lottie-react";
import empty from "../../public/empty.json";
import { VStack, Text } from "@chakra-ui/react";

export interface IEmptyResultProps {}

export default function EmptyResult(props: IEmptyResultProps) {
  return (
    <VStack gap={5} p={10}>
      <Text fontSize={["md", "xl", "2xl"]} fontWeight={"bold"}>
        Empty Result
      </Text>
      <Lottie animationData={empty} loop={true} />
    </VStack>
  );
}
