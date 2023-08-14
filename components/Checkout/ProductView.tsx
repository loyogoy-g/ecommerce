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
} from "@chakra-ui/react";
import { useStore } from "../../storage";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

interface ProductViewProps {
  image: string;
  name: string;
  price: number;
  quantity: number;
  id: string;
}

const ProductView = (props: ProductViewProps) => {
  const { image, name, price, quantity, id } = props;
  const { removeOrder } = useStore();

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
      <Flex onClick={() => removeOrder(id)} pos={"absolute"} top={2} right={2}>
        <MdDeleteOutline color={"red"} />
      </Flex>

      <Flex w={"40%"}>
        <Image
          rounded="md"
          w={"full"}
          h={150}
          objectFit="cover"
          src={image}
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
          <Text fontSize={"md"} color={"gray.700"}>
            Price : {quantity * price} ₩
          </Text>
        </Flex>
        <Flex alignItems="center" color="gray.500"></Flex>
        <Stack justify="space-between">
          <NumberInput defaultValue={1} max={100000} clampValueOnBlur={false}>
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
