import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Text,
  Button,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  useDisclosure,
  Divider,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
  HStack,
  Code,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { OrderDataTracking } from "../interface/Globalnterface";
import axios from "axios";
import Items from "./Items";

interface TrackingProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  trackingId: string;
}

export default function Tracking(props: TrackingProps) {
  const { isOpen, onClose } = props;

  const toast = useToast();

  const [orderTrack, setOrderTrack] = useState<OrderDataTracking | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const queryOrder = async (id: string) => {
    const order = await axios.post<OrderDataTracking>("/api/wp/trackorder", {
      id,
    });

    return order.data;
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Handle form submission here
    if (/^\d+$/.test(data.trackingId)) {
      // Handle form submission here
      try {
        const order = await queryOrder(data.trackingId);
        setOrderTrack(order);
      } catch (error) {
        setOrderTrack(null);
      }
    } else {
      // Display an error message for non-numeric input
      toast({
        title: "Tracking ID must contain only numbers.",
        status: "error",
        duration: 1000,
      });
    }
  };

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
    <Drawer isOpen={isOpen} placement="left" size={"md"} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            주문 추적 시스템
          </Text>
        </DrawerHeader>

        <DrawerBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired isInvalid={!!errors.trackingId}>
              <FormLabel>주문 추적 ID</FormLabel>
              <Controller
                name="trackingId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input {...field} placeholder="Enter Tracking ID" />
                )}
              />
              {errors.trackingId && (
                <Text color="red.500" fontSize="sm">
                  추적 ID가 필요합니다.
                </Text>
              )}
            </FormControl>
            <Button type="submit" mt={4} colorScheme="teal">
              주문을 추적하다
            </Button>
          </form>
          {orderTrack && (
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

              {orderTrack.line_items.map((lineItem, key) => (
                <Items key={key} {...lineItem} />
              ))}
            </VStack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
