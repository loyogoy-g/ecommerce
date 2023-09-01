import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  VStack,
  useColorModeValue,
  Stack,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Button,
  FormHelperText,
  HStack,
  Heading,
  InputGroup,
  useDisclosure,
  Text,
  Select,
  Flex,
  Divider,
} from "@chakra-ui/react";
import * as React from "react";
import useSWR from "swr";
import { fetcher } from "../HelperFunction";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useCustomerData, CustomerData, useStepperCart } from "@/storage";
import { PaymentMethod } from "@prisma/client";
import { FinalizedOrder } from "./FInalizedOrder";

interface FormData {
  first_name: string;
  last_name: string;
  country: string;
  city: string;
  address_1: string;
  email: string;
  phone: string;
  payment_method: string;
}

export default function Billing() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data } = useSWR<Array<PaymentMethod>>("/api/payment_method", fetcher);

  const { customer_data, setcustomer_data } = useCustomerData();

  const {
    address_1,
    address_2,
    city,
    company,
    country,
    first_name,
    last_name,
    postcode,
    state,
    email,
    phone,
  } = customer_data.billing;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      first_name,
      last_name,
      country,
      city,
      address_1,
      email,
      phone,
      payment_method: customer_data.payment_method,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const {
      address_1,
      city,
      country,
      email,
      first_name,
      last_name,
      payment_method,
      phone,
    } = data;

    const custom: CustomerData = {
      billing: {
        address_1,
        address_2,
        city,
        company,
        country,
        first_name,
        last_name,
        postcode,
        state,
        email,
        phone,
      },
      shipping: {
        address_1,
        address_2,
        city,
        company,
        country,
        first_name,
        last_name,
        postcode,
        state,
      },
      payment_method: payment_method,
      line_items: [],
      payment_method_title: payment_method,
    };
    console.log(custom);
    setcustomer_data(custom);
    onOpen();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FinalizedOrder isOpen={isOpen} onClose={onClose} />
      <Stack m={2} spacing={4}>
        <Flex gap={2} flexDirection={"column"}>
          <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xl"}>
            Shipping Details
          </Text>
          <HStack>
            <FormControl id="first_name" isRequired>
              <FormLabel>Name</FormLabel>
              <Controller
                name="first_name"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} type="text" />}
              />
              {errors.first_name && (
                <FormHelperText color="red">
                  This field is required.
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="last_name" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Controller
                name="last_name"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} type="text" />}
              />
              {errors.last_name && (
                <FormHelperText color="red">
                  This field is required.
                </FormHelperText>
              )}
            </FormControl>
          </HStack>
          <FormControl id="country" isRequired>
            <FormLabel>Country / Region</FormLabel>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} type="text" />}
            />
            {errors.country && (
              <FormHelperText color="red">
                This field is required.
              </FormHelperText>
            )}
          </FormControl>
          <FormControl id="city" isRequired>
            <FormLabel>Town / City</FormLabel>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} type="text" />}
            />
            {errors.city && (
              <FormHelperText color="red">
                This field is required.
              </FormHelperText>
            )}
          </FormControl>
          <FormControl id="address_1" isRequired>
            <FormLabel>Street address</FormLabel>
            <Controller
              name="address_1"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} type="text" />}
            />
            {errors.address_1 && (
              <FormHelperText color="red">
                This field is required.
              </FormHelperText>
            )}
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} type="text" />}
            />
            {errors.email && (
              <FormHelperText color="red">
                This field is required.
              </FormHelperText>
            )}
          </FormControl>
          <FormControl id="phone" isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} type="tel" />}
            />
            {errors.phone && (
              <FormHelperText color="red">
                This field is required.
              </FormHelperText>
            )}
          </FormControl>
        </Flex>
        <Divider />
        <Flex gap={2} flexDirection={"column"}>
          <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xl"}>
            Payment Method
          </Text>
          <VStack>
            <FormControl>
              <Controller
                name="payment_method"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    placeholder="Select option"
                    id="payment_method"
                    isRequired
                    {...field}
                  >
                    {data?.map((item, index) => {
                      return (
                        <option value={item.title} key={index}>
                          {item.title}
                        </option>
                      );
                    })}
                  </Select>
                )}
              />

              {errors.payment_method && (
                <FormHelperText color="red">
                  This field is required.
                </FormHelperText>
              )}
            </FormControl>
          </VStack>
        </Flex>
        <Divider />

        <Button type="submit" color={"white"} bgColor={"blackAlpha.800"}>
          Confirm
        </Button>
      </Stack>
    </form>
  );
}
