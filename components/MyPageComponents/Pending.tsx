import * as React from "react";
import { OrderDataTracking } from "../interface/Globalnterface";
import { SimpleGrid, Text } from "@chakra-ui/react";
import CardProduct from "./CardProduct";

export interface IPendingProps {
  data: Array<OrderDataTracking>;
}

export default function Pending({ data }: IPendingProps) {
  return (
    <SimpleGrid gap={5} columns={[1, 2, 3]}>
      {data.map((value, key) => {
        if (value.status == "pending") {
          const { date_created } = value;
          return <CardProduct {...value} />;
        }
      })}
    </SimpleGrid>
  );
}
