import * as React from "react";
import { OrderDataTracking } from "../interface/Globalnterface";
import { Center, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import CardProduct from "./CardProduct";
import { useState } from "react";
import EmptyResult from "../LottieAnimation/EmptyResult";

export interface IPendingProps {
  data: Array<OrderDataTracking>;
}

export default function Processing({ data }: IPendingProps) {
  const processingOrder = data.filter((value) => {
    return value.status === "completed";
  });
  return (
    <Center w={"full"}>
      {processingOrder.length === 0 ? (
        <EmptyResult />
      ) : (
        <SimpleGrid w={"full"} gap={5} columns={[1, 2, 3, 4]}>
          {processingOrder.map((value, key) => {
            return <CardProduct {...value} key={key} />;
          })}
        </SimpleGrid>
      )}
    </Center>
  );
}
