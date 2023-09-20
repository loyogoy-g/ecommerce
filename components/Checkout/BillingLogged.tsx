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
import Postcode from "../PostCode/Postcode";
import { useState } from "react";
import { Address } from "react-daum-postcode";
import axios from "axios";
import { useSession } from "next-auth/react";

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

export interface Ing {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
}

export const fetcher_ = (url: string, email: string) =>
  axios.post(url, { email }).then((res) => res.data);

export default function BillingLogged({
  mainOnclose,
}: {
  mainOnclose: () => void;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data: userData, status } = useSession();
  const { data } = useSWR<Array<PaymentMethod>>("/api/payment_method", fetcher);
  const { data: customerData, isLoading } = useSWR<{
    result: { billing: Ing };
  }>("/api/customer", fetcher);

  const billing: Ing = customerData?.result.billing as Ing;
  const [address, setaddress] = useState<Address | null>(null);

  const { customer_data, setcustomer_data } = useCustomerData();

  React.useEffect(() => {
    !isLoading &&
      setcustomer_data({
        billing: {
          ...billing,
        },
        payment_method: "",
        payment_method_title: "",
        shipping: {
          ...billing,
        },
        line_items: [],
      });
  }, [isLoading]);

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
    watch,
    setValue,
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

  const { payment_method } = watch();
  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    passCode: "",
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
    console.log(custom, creditCardDetails);
    setcustomer_data(custom);
    onOpen();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FinalizedOrder
        creditCard={creditCardDetails}
        mainOnClose={mainOnclose}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Stack m={2} spacing={4}>
        <Flex gap={2} flexDirection={"column"}>
          <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xl"}>
            Shipping Details
          </Text>
          <FormControl id="first_name" isRequired>
            <FormLabel>Name</FormLabel>
            <Controller
              name="first_name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  readOnly={status === "authenticated"}
                  type="text"
                />
              )}
            />
            {errors.first_name && (
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

          <FormLabel>Postal Code</FormLabel>
          <Postcode
            buttonProps={{
              justifyContent: "flex-start",
              colorScheme: "cyan",
              children: address ? address.zonecode : "Search Postal Code",
            }}
            handle={(address) => {
              console.log(address, "sfgsdg");
              setValue("address_1", address.address);
              setaddress(address);
            }}
          />

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  readOnly={status === "authenticated"}
                  type="text"
                />
              )}
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
          <VStack spacing={5}>
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
            {payment_method == "Credit Card" && (
              <VStack spacing={2} gap={3} p={6} boxShadow={"lg"} w={"full"}>
                <FormControl id="email" isRequired>
                  <FormLabel>Card Number</FormLabel>
                  <Input
                    onChange={(e) =>
                      setCreditCardDetails({
                        ...creditCardDetails,
                        cardNumber: e.target.value,
                      })
                    }
                    type="text"
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Expiration Date</FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="datetime-local"
                    onChange={(e) =>
                      setCreditCardDetails({
                        ...creditCardDetails,
                        expirationDate: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <Stack w={"100%"} direction={["column", "row"]}>
                  <FormControl id="email" isRequired>
                    <FormLabel>CVV</FormLabel>
                    <Input
                      onChange={(e) =>
                        setCreditCardDetails({
                          ...creditCardDetails,
                          cvv: e.target.value,
                        })
                      }
                      type="text"
                    />
                  </FormControl>
                  <FormControl id="email" isRequired>
                    <FormLabel>Pass Code</FormLabel>
                    <Input
                      onChange={(e) =>
                        setCreditCardDetails({
                          ...creditCardDetails,
                          passCode: e.target.value,
                        })
                      }
                      type="text"
                    />
                  </FormControl>
                </Stack>
              </VStack>
            )}
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
