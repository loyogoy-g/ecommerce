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
  if (data.length == 0) return <EmptyResult />;
  return (
    <TableContainer w={"full"}>
      <Table bg={"white"} variant="striped">
        <TableCaption>주문하다</TableCaption>
        <Thead>
          <Tr>
            <Th>상태</Th>
            <Th>총 결제금액</Th>
            <Th>결제수단</Th>
            <Th>생성 일자</Th>
            <Th>행동</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((value, key) => {
            return <OrderContent {...value} key={key} />;
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export const OrderContent = (value: OrderDataTracking) => {
  let dateCreated;
  const date = new Date(value.date_created_gmt);
  const localDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000
  );
  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  localDate.setHours(hours - offset);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDate = localDate.toLocaleDateString(undefined, options);
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
          주문보기
        </Button>
      </Td>
    </Tr>
  );
};
