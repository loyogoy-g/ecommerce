import { useCartKey, useCustomerData, useStepperCart } from "@/storage";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Text,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Cocart_post } from "../HelperFunction";
import { mutate } from "swr";

interface CreditCard {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  passCode: string;
}

export interface IAppProps {
  isOpen: boolean;
  onClose: () => void;
  mainOnClose: () => void;
  creditCard: CreditCard;
}

export function FinalizedOrder(props: IAppProps) {
  const { isOpen, onClose, mainOnClose } = props;

  const { customer_data } = useCustomerData();
  const { cart_items, cart_key } = useCartKey();
  const { setIndex } = useStepperCart();

  const toast = useToast({
    duration: 1000,
  });

  const [loading, setloading] = useState(false);

  const items = cart_items?.items.map((item) => {
    const { id, quantity } = item;
    return {
      product_id: id,
      quantity: quantity.value,
    };
  });

  customer_data["line_items"] = items ? items : [];

  const clearCart = async () => {
    const add = await Cocart_post({
      url: "cart/clear",
      cart_key: cart_key,
    });
    mutate("setCart");
  };

  const handleOrder = async () => {
    setloading(true);
    try {
      const createOrder = await fetch("/api/wp/createorder", {
        method: "POST",
        body: JSON.stringify({
          data: customer_data,
          creditCard: props.creditCard,
        }),
      });
      await clearCart();
      setIndex(0);
      toast({
        title: "Success submitting the order",
        status: "success",
      });
      mainOnClose();
    } catch (error) {
      toast({
        title: "Error creating order",
        status: "error",
      });
    }
    onClose();
    setloading(false);
  };

  return (
    <Modal size={["sm", "md"]} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Summary Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={5} alignItems={"flex-start"}>
            <HStack spacing={2}>
              <Text>Name :</Text>
              <Text>
                {" "}
                {customer_data.billing.first_name}{" "}
                {customer_data.billing.last_name}
              </Text>
            </HStack>
            <HStack>
              <Text>Address :</Text>
              <Text> {customer_data.billing.address_1}</Text>
            </HStack>
            <HStack>
              <Text>Email :</Text>
              <Text> {customer_data.billing.email}</Text>
            </HStack>
            <HStack>
              <Text>Phone Number :</Text>
              <Text> {customer_data.billing.phone}</Text>
            </HStack>
            <HStack>
              <Text>Payment Method :</Text>
              <Text> {customer_data.payment_method}</Text>
            </HStack>

            <HStack>
              <Text>Total Amount :</Text>
              <Text>
                {" "}
                {cart_items?.totals.total} {cart_items?.currency.currency_code}
              </Text>
            </HStack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={loading}
            loadingText={"Please Wait"}
            colorScheme="blue"
            mr={3}
            onClick={handleOrder}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
