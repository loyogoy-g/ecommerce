import * as React from "react";
import { useForm } from "react-hook-form";
import { AllProductData } from "../interface/AllProductInterface";
import {
  Button,
  Divider,
  Flex,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Text,
  VStack,
  useStepContext,
  useToast,
} from "@chakra-ui/react";
import { Cocart_post } from "../HelperFunction";
import { useCartKey, useStepperCart } from "@/storage";
import { mutate } from "swr";
import { useState } from "react";

type FormData = {
  [key: string]: string | number;
};

export default function Product({
  data,
  onClose,
}: {
  data: AllProductData;
  onClose: () => void;
}) {
  const { attributes, id, name } = data;

  const [loading, setloading] = useState<boolean>(false);

  const toast = useToast();

  const { setIndex } = useStepperCart();
  const { cart_key } = useCartKey();

  const { register, handleSubmit, formState, watch } = useForm<FormData>({
    mode: "onChange", // Enable live validation
  });

  const isFormValid = formState.isValid;

  const data_: any = watch();

  delete data_.quantity;

  const dataCart = () => {
    return {
      id: id.toString(),
      quantity: "1",
      variation: data_,
    };
  };

  const addToCart = async () => {
    setloading(true);
    const add = await Cocart_post({
      url: "cart/add-item",
      cart_key: cart_key,
      data: dataCart(),
    });
    mutate("setCart");
    if (add.status === 200) {
      onClose();
    }
    toast({
      title: "Add to cart success",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setloading(false);
  };

  const onSubmit = (formData: any) => {
    // Perform actions with form data, e.g., add to cart
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={5}>
        <Flex w={"full"} gap={2}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            Product Name
          </Text>
          <Text fontSize={"sm"} textAlign={"center"}>
            {name}
          </Text>
        </Flex>

        <Flex w={"full"} gap={2}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            Description
          </Text>
          <Text
            fontSize={"sm"}
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </Flex>
        <SimpleGrid spacing={5} columns={2} w={"full"}>
          {attributes.map((attrib, index) => {
            if (attrib.variation) {
              const { options, name } = attrib;
              return (
                <HStack w={"100%"} key={index}>
                  <Text fontSize={"sm"}>{name}</Text>
                  <Select {...register(`attribute_${name.toLowerCase()}`)}>
                    {options.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </HStack>
              );
            }
          })}
        </SimpleGrid>
        <Divider />
        <Button
          bg={"black"}
          color={"white"}
          w={"full"}
          isLoading={loading}
          _active={{
            bg: "black",
          }}
          bottom={0}
          onClick={() => {
            addToCart();
            setIndex(0);
          }}
        >
          Add to Cart
        </Button>
      </VStack>
    </form>
  );
}
