import * as React from "react";
import Lottie from "lottie-react";
import empty from "../../public/empty.json";
import { VStack, Text } from "@chakra-ui/react";

export interface IEmptyResultProps {}

export default function EmptyResult(props: IEmptyResultProps) {
  return (
    <VStack>
      <Text fontSize={["xl", "5xl"]} fontWeight={"bold"}>
        Empty Result !
      </Text>
      <Lottie animationData={empty} loop={true} />
    </VStack>
  );
}
