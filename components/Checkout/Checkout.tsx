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
  HStack,
  Divider,
  Button,
} from "@chakra-ui/react";
import ProductView from "./ProductView";
import ProductSummary from "./ProductSummary";
import { useStore } from "@/storage";

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Checkout(props: CheckoutProps) {
  const { isOpen, onClose } = props;
  const { orders } = useStore();
  return (
    <Drawer isOpen={isOpen} placement="right" size={"lg"} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Shopping Cart</DrawerHeader>

        <DrawerBody>
          <Flex gap={10} flexDir={"column"} w={"100%"}>
            <Flex gap={3} flexDir={"column"}>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Shopping Cart Products
              </Text>
              {orders.map((order, index) => {
                const { id, name, price, quantity, image } = order;
                return (
                  <ProductView
                    id={id}
                    image={image}
                    name={name}
                    price={price}
                    quantity={quantity}
                  />
                );
              })}
            </Flex>
            <Divider />
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Flex gap={4} w={"100%"} flexDir={"column"}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Shopping Cart Summary
            </Text>
            <ProductSummary />
            <Button color={"white"} bgColor={"blackAlpha.800"}>
              Procced to Check out
            </Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
