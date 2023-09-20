import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Code,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { OrderDataTracking } from "../interface/Globalnterface";
import { BsEyeFill } from "react-icons/bs";
import EmptyResult from "../LottieAnimation/EmptyResult";
import Order from "./Order";

export interface IProductTableProps {
  data: Array<OrderDataTracking>;
}
const codeColor = {
  pending: "orange",
  completed: "green",
  processing: "red",
};
export default function ProductTable(props: IProductTableProps) {
  const { data } = props;
  const completedOrders = data.filter((order) => order.status == "completed");
  if (completedOrders.length == 0) return <EmptyResult />;
  return (
    <TableContainer w={"full"}>
      <Table bg={"white"} variant="striped">
        <TableCaption>Processing Order</TableCaption>
        <Thead>
          <Tr>
            <Th>Status</Th>
            <Th>Total Payment</Th>
            <Th>Payment Method</Th>
            <Th>Date Created</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((value, key) => {
            if (value.status === "completed") {
              return <OrderContent {...value} key={key} />;
            }
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export const OrderContent = (value: OrderDataTracking) => {
  let dateCreated;
  const date = new Date(value.date_created);
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

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Tr>
      <Order orderTrack={value} isOpen={isOpen} onClose={onClose} />
      <Td>
        <Code variant={"outline"} colorScheme={codeColor[value.status]}>
          {value.status.toUpperCase()}
        </Code>
      </Td>
      <Td>
        {value.currency_symbol} {value.total}
      </Td>
      <Td>{value.payment_method}</Td>
      <Td>{dateCreated}</Td>
      <Td>
        <Button onClick={onOpen} leftIcon={<BsEyeFill />} colorScheme="cyan">
          View Order
        </Button>
      </Td>
    </Tr>
  );
};
