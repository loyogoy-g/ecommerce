import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Text,
  Code,
  HStack,
  VStack,
  DrawerFooter,
} from "@chakra-ui/react";
import { OrderDataTracking } from "../interface/Globalnterface";
import Items from "../Tracking/Items";
import Cards from "react-credit-cards-2";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import useSWR from "swr";
import { fetcher } from "../HelperFunction";

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  orderTrack: OrderDataTracking;
}

export default function Order(props: CheckoutProps) {
  const { isOpen, onClose, orderTrack } = props;

  const { data, isLoading } = useSWR<{
    id: string;
    account_number: string;
    account_name: string;
  }>("/api/accountdetails", fetcher);

  console.log(data);
  let dateCreated;

  if (orderTrack) {
    const date = new Date(orderTrack.date_created);
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
  }

  return (
    <Drawer isOpen={isOpen} placement="left" size={"lg"} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            My Order
          </Text>
        </DrawerHeader>
        <DrawerBody>
          <Flex pb={"90px"} flexDir={"column"} w={"100%"}>
            <VStack
              pt={10}
              spacing={2}
              gap={5}
              w={"full"}
              justifyContent={"flex-start"}
            >
              <HStack w={"full"} justifyContent={"flex-start"}>
                <Text fontWeight={"bold"}>상태 : </Text>
                <Code
                  variant={"outline"}
                  colorScheme={
                    orderTrack.status.toUpperCase() == "COMPLETED"
                      ? "green"
                      : "red"
                  }
                >
                  {orderTrack.status.toUpperCase()}
                </Code>
              </HStack>
              <HStack w={"full"} justifyContent={"flex-start"}>
                <Text fontWeight={"bold"}>총액 : </Text>
                <Text variant={"outline"} colorScheme="red">
                  {orderTrack.currency_symbol} {orderTrack.total}
                </Text>
              </HStack>
              <HStack w={"full"} justifyContent={"flex-start"}>
                <Text fontWeight={"bold"}>결제수단 : </Text>
                <Text variant={"outline"} colorScheme="red">
                  {orderTrack.payment_method}
                </Text>
              </HStack>
              <HStack w={"full"} justifyContent={"flex-start"}>
                <Text fontWeight={"bold"}>생성 일자 : </Text>
                <Text variant={"outline"} colorScheme="red">
                  {dateCreated}
                </Text>
              </HStack>

              <Text fontWeight={"bold"}>명령</Text>

              {orderTrack.line_items.map((lineItem, key) => (
                <Items key={key} {...lineItem} />
              ))}
              {orderTrack.status == "pending" &&
                orderTrack.payment_method == "Bank Transfer" && (
                  <VStack w={"full"} justifyContent={"flex-start"}>
                    <Alert status="info">
                      <AlertIcon />
                      <AlertTitle>결제하세요!</AlertTitle>
                      <AlertDescription>
                        이 계좌로 은행 송금 결제를 제출하세요.
                      </AlertDescription>
                    </Alert>
                    <Cards
                      number={data ? data.account_number : ""}
                      expiry={""}
                      cvc={""}
                      name={data ? data.account_name : ""}
                      focused={""}
                    />
                  </VStack>
                )}
            </VStack>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
