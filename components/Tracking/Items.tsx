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
  useToast,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Item, LineItem, Quantity } from "../interface/Globalnterface";
import { VscLoading } from "react-icons/vsc";
import { useCartKey } from "@/storage";
import axios from "axios";
import { coCartUrl } from "../HelperFunction";
import { mutate } from "swr";

const Items = (props: LineItem) => {
  const { image: featured_image, name, price, quantity, id, total } = props;

  return (
    <Stack
      spacing={2}
      border="1px solid"
      borderColor="gray.400"
      direction={"row"}
      p={2}
      w={"100%"}
      rounded="md"
      overflow="hidden"
      pos="relative"
    >
      <Flex w={"60%"}>
        <Image
          rounded="md"
          w={"full"}
          h={150}
          objectFit="cover"
          src={featured_image.src}
          alt="product image"
        />
      </Flex>
      <Stack
        direction="column"
        spacing={2}
        w="100%"
        mt={{ base: "5px !important", sm: 0 }}
      >
        <Flex direction={"column"} justify="space-between">
          <chakra.h3 w={"100%"} fontSize={"md"} fontWeight="bold">
            {name}
          </chakra.h3>
          <Text fontSize={"sm"} color={"gray.700"}>
            Base Price : {price}
          </Text>
          <Text fontSize={"sm"} color={"gray.700"}>
            Total Amount : {total}
          </Text>
        </Flex>
        <Flex alignItems="center" color="gray.500"></Flex>
      </Stack>
    </Stack>
  );
};

export default Items;
