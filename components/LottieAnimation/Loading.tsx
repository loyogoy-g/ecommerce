import * as React from "react";
import Lottie from "lottie-react";
import loading from "../../public/loading.json";
import { VStack, Text } from "@chakra-ui/react";

export interface IEmptyResultProps {}

export default function Loading(props: IEmptyResultProps) {
  return (
    <VStack alignItems={"center"} h={"full"}>
      <Lottie animationData={loading} loop={true} />
    </VStack>
  );
}
