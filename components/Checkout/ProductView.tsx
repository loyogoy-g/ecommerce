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
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Item, Quantity } from "../interface/Globalnterface";
import { VscLoading } from "react-icons/vsc";
import { useCartKey } from "@/storage";
import axios from "axios";
import { coCartUrl } from "../HelperFunction";
import { mutate } from "swr";
import { useDebounce } from "usehooks-ts";
import { useFirstRender } from "../hooks";

const ProductView = (props: Item) => {
  const { cart_items, cart_key } = useCartKey();
  const [quantities, setquantities] = useState<number>(props.quantity.value);
  const [loading, setloading] = useState(false);
  const [loading_, setloading_] = useState(false);
  const toast = useToast();
  const { featured_image, name, price, quantity, id, totals, item_key } = props;
  const debounceValue = useDebounce(quantities, 1000);

  const updateProduct = async (item_key: string) => {
    setloading_(true);
    await axios.post(
      `${coCartUrl}cart/item/${item_key}?&cart_key=${cart_key}`,
      {
        quantity: debounceValue,
      }
    );
    mutate("setCart");
    setloading_(false);
  };
  const firstrender = useFirstRender();
  useEffect(() => {
    if (!firstrender) {
      updateProduct(item_key);
    }
  }, [debounceValue]);

  const deleteProduct = async (item_key: string) => {
    setloading(true);
    const prod = await axios.delete(
      `${coCartUrl}cart/item/${item_key}?&cart_key=${cart_key}`
    );
    mutate("setCart");
    if (prod.status === 200) {
      toast({
        title: "Product Removed Successfully",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
    setloading(false);
  };

  console.log(cart_items);

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
      <Button
        pos={"absolute"}
        onClick={(e) => deleteProduct(item_key)}
        top={2}
        disabled={loading ? true : false}
        background={"none"}
        borderRadius={"full"}
        right={2}
      >
        {loading ? (
          <VscLoading className={loading ? "animate-spin" : ""} />
        ) : (
          <MdDeleteOutline size="20px" color="red" />
        )}
      </Button>

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
            Total Amount : {cart_items?.currency.currency_symbol} {totals.total}
          </Text>
        </Flex>
        <Flex alignItems="center" color="gray.500"></Flex>
        <Stack justify="space-between">
          <NumberInput
            defaultValue={quantity.value}
            max={quantity.max_purchase}
            min={quantity.min_purchase}
            clampValueOnBlur={false}
            onChange={(e) => {
              console.log(e);
              setquantities(parseInt(e));
            }}
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
