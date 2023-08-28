import { useCartKey } from "@/storage";
import {
  chakra,
  Stack,
  Flex,
  Text,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
  Divider,
  HStack,
} from "@chakra-ui/react";

const ProductSummary = () => {
  const { cart_items } = useCartKey();

  return (
    <Stack
      spacing={2}
      border="1px solid"
      borderColor="gray.400"
      direction={"column"}
      p={2}
      w={"100%"}
      rounded="md"
      overflow="hidden"
      pos="relative"
    >
      <VStack>
        <Text fontSize={"lg"} fontWeight={"bold"}>
          Shopping Cart Summary
        </Text>
        <Flex p={1} w={"100%"}>
          <Flex w={"70%"}>
            <Text fontSize={"md"} color={"gray.800"}>
              Total Amount
            </Text>
          </Flex>
          <Flex w={"30%"}>
            {" "}
            {cart_items?.currency.currency_symbol} {cart_items?.totals.subtotal}
          </Flex>
        </Flex>
        <Flex p={1} w={"100%"}>
          <Flex w={"70%"}>
            <Text fontSize={"md"} color={"gray.800"}>
              Total Shipping Amount
            </Text>
          </Flex>
          <Flex w={"30%"}>
            {cart_items?.currency.currency_symbol}{" "}
            {cart_items?.totals.shipping_total}
          </Flex>
        </Flex>

        <Divider />
        <Flex p={1} w={"100%"}>
          <Flex w={"70%"}>
            <Text fontSize={"md"} color={"gray.800"}>
              Expected Payment
            </Text>
          </Flex>
          <Flex w={"30%"}>
            {cart_items?.currency.currency_symbol} {cart_items?.totals.total}
          </Flex>
        </Flex>
      </VStack>
    </Stack>
  );
};

export default ProductSummary;
