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
import { useState } from "react";

const ProductSummary = () => {
  const [price, setPrice] = useState<number>(1);
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
        <Flex p={1} w={"100%"}>
          <Flex w={"70%"}>
            <Text fontSize={"md"} color={"gray.800"}>
              Total Amount
            </Text>
          </Flex>
          <Flex w={"30%"}> ₩ 1000</Flex>
        </Flex>
        <Flex p={1} w={"100%"}>
          <Flex w={"70%"}>
            <Text fontSize={"md"} color={"gray.800"}>
              Total Shipping Amount
            </Text>
          </Flex>
          <Flex w={"30%"}> ₩ 0</Flex>
        </Flex>

        <Divider />
        <Flex p={1} w={"100%"}>
          <Flex w={"70%"}>
            <Text fontSize={"md"} color={"gray.800"}>
              Expected Payment
            </Text>
          </Flex>
          <Flex w={"30%"}> ₩ 1000</Flex>
        </Flex>
      </VStack>
    </Stack>
  );
};

export default ProductSummary;
