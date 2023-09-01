import { useCartKey, useCustomerData } from "@/storage";
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
} from "@chakra-ui/react";

export interface IAppProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FinalizedOrder(props: IAppProps) {
  const { isOpen, onClose } = props;
  const { customer_data } = useCustomerData();
  const { cart_items } = useCartKey();

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
              <Text>Email :</Text>
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
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
