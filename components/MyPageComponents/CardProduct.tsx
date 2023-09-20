import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Text,
  Button,
  VStack,
  CardFooter,
} from "@chakra-ui/react";
import * as React from "react";
import { OrderDataTracking } from "../interface/Globalnterface";
import { BsEyeFill } from "react-icons/bs";

export interface ICardProductProps {
  amount: string;
  payment_method_title: string;
  id: number;
  date_created: string;
}

export default function CardProduct(props: OrderDataTracking) {
  const { total, payment_method_title, id, date_created } = props;

  let dateCreated;
  const date = new Date(date_created);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDate = date.toLocaleDateString(undefined, options);
  dateCreated = formattedDate;
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Pending Order # {id}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing={1}>
          <VStack>
            <Text fontSize={["sm", "md"]} fontWeight={"bold"}>
              Total Amount :{" "}
            </Text>
            <Text fontSize={["sm", "md"]}>
              {props.currency_symbol} {total}
            </Text>
          </VStack>
          <VStack>
            <Text fontSize={["sm", "md"]} fontWeight={"bold"}>
              Payment Method :{" "}
            </Text>
            <Text fontSize={["sm", "md"]}>
              {payment_method_title.toLocaleUpperCase()}
            </Text>
          </VStack>
          <VStack>
            <Text fontSize={["sm", "md"]} fontWeight={"bold"}>
              Date Ordered:
            </Text>
            <Text fontSize={["sm", "md"]}>{dateCreated}</Text>
          </VStack>
        </Stack>
      </CardBody>
      <CardFooter w={"full"}>
        <Button leftIcon={<BsEyeFill />} w={"full"} colorScheme="cyan">
          View Order
        </Button>
      </CardFooter>
    </Card>
  );
}
