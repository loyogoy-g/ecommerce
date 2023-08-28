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
} from "@chakra-ui/react";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Item, Quantity } from "../interface/Globalnterface";
import { useCartKey } from "@/storage";
import axios from "axios";
import { coCartUrl } from "../HelperFunction";
import { mutate } from "swr";
const ProductView = (props: Item) => {
  const { cart_items, cart_key } = useCartKey();

  const toast = useToast();
  const { featured_image, name, price, quantity, id, totals, item_key } = props;

  const deleteProduct = async (item_key: string) => {
    const prod = await axios.delete(
      `${coCartUrl}cart/item/${item_key}?&cart_key=${cart_key}`
    );
    mutate("setCart");
    if (prod.status === 200) {
      toast({
        title: "Product Removed Successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

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
      <Flex
        pos={"absolute"}
        onClick={() => deleteProduct(item_key)}
        top={2}
        right={2}
      >
        <MdDeleteOutline size={"20px"} color={"red"} />
      </Flex>

      <Flex w={"40%"}>
        <Image
          rounded="md"
          w={"full"}
          h={150}
          objectFit="cover"
          src={featured_image}
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
          <chakra.h3 w={"90%"} fontSize={"md"} fontWeight="bold">
            {name}
          </chakra.h3>
          <Text fontSize={"sm"} color={"gray.700"}>
            Base Price : {cart_items?.currency.currency_symbol} {price}
          </Text>
          <Text fontSize={"sm"} color={"gray.700"}>
            Total Amount : {cart_items?.currency.currency_symbol}{" "}
            {totals.subtotal}
          </Text>
        </Flex>
        <Flex alignItems="center" color="gray.500"></Flex>
        <Stack justify="space-between">
          <NumberInput
            defaultValue={quantity.value}
            max={quantity.max_purchase}
            min={quantity.min_purchase}
            clampValueOnBlur={false}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductView;
