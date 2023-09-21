import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Icon,
  Text,
  HStack,
  useDisclosure,
  Toast,
  Button,
  VStack,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useToast } from "@chakra-ui/react";
import ProductRating from "./ProductRating";
import AddToCart from "../ProductAddToCart/AddToCart";
import { Cocart_post } from "../HelperFunction";
import { useCartKey } from "@/storage";
import { AllProductData } from "../interface/AllProductInterface";
import { useState } from "react";
import { mutate } from "swr";
import Checkout from "../Checkout/Checkout";

function ProductCart({ props }: { props: AllProductData }) {
  const {
    images,
    name,
    price_html,
    short_description,
    average_rating,
    rating_count,
    id,
    stock_quantity,
  } = props;

  const [loading, setloading] = useState(false);

  const { cart_key } = useCartKey();

  const dataCart = () => {
    return {
      id: id.toString(),
      quantity: "1",
    };
  };

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCheckout,
    onOpen: onOpenCheckout,
    onClose: onCloseCheckout,
  } = useDisclosure();
  const img =
    images.length > 0
      ? images[0].src
      : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Shopping_Cart_Flat_Icon_Vector.svg/2048px-Shopping_Cart_Flat_Icon_Vector.svg.png";

  const addToCart = async () => {
    if (stock_quantity <= 0) {
      toast({
        title: "Out of Stock",
        description: "This product is out of stock",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
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
    onOpenCheckout();
    setloading(false);
  };

  return (
    <Flex alignItems="center" justifyContent="center">
      <AddToCart data={props} isOpen={isOpen} onClose={onClose} />
      <Checkout isOpen={isOpenCheckout} onClose={onCloseCheckout} />
      <Box
        className="hover:animate-pulse"
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        h={"675px"}
        w={"400px"}
        position="relative"
      >
        <Image
          src={img}
          alt={`Picture of ${name}`}
          roundedTop="lg"
          w={"100%"}
          h={"400px"}
        />

        <Box
          border={"1px"}
          borderColor={"blackAlpha.300"}
          bgColor={"whiteAlpha.900"}
          p="6"
          h={"275px"}
        >
          <Flex
            mt="1"
            gap={2}
            justifyContent="space-between"
            flexDirection={"column"}
            alignContent="center"
          >
            <Flex gap={5} flexDirection={"column"}>
              <Box
                dangerouslySetInnerHTML={{ __html: name }}
                fontSize="md"
                fontWeight="semibold"
                as="u"
                lineHeight="tight"
              />
              <Text
                fontSize="sm"
                height={"75%"}
                color="gray.600"
                dangerouslySetInnerHTML={{ __html: short_description }}
              />
            </Flex>
            <VStack flexDirection={"column"}>
              <HStack w={"full"}>
                <Text fontWeight={"bold"} fontSize="sm" color="gray.600">
                  Status :{" "}
                </Text>
                <Text
                  color={
                    stock_quantity && stock_quantity > 0 ? "green" : "red.400"
                  }
                  fontSize={"sm"}
                  fontWeight={"bold"}
                >
                  {stock_quantity && stock_quantity > 0
                    ? `${stock_quantity} pieces in stock`
                    : "Out of Stock"}
                </Text>
              </HStack>

              <HStack w={"full"} spacing={2}>
                <Text fontWeight={"bold"} fontSize="sm" color="gray.600">
                  Average Rate :
                </Text>
                <ProductRating
                  rating={parseFloat(average_rating)}
                  numReviews={rating_count}
                />
              </HStack>

              <Text
                w={"full"}
                fontSize="lg"
                color="gray.600"
                dangerouslySetInnerHTML={{ __html: price_html }}
              />

              <HStack
                pos={"absolute"}
                bottom={4}
                pl={4}
                pr={4}
                w={"full"}
                gap={2}
              >
                <Button
                  isLoading={loading}
                  onClick={async () => await addToCart()}
                  w={"full"}
                  bg={"black"}
                  color={"white"}
                >
                  Buy
                </Button>
                <Button
                  w={"full"}
                  onClick={() => {
                    if (stock_quantity <= 0) {
                      toast({
                        title: "Out of Stock",
                        description: "This product is out of stock",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                      });
                      return;
                    }
                    onOpen();
                  }}
                  bg={"black"}
                  color={"white"}
                >
                  Add to Cart
                </Button>
              </HStack>
            </VStack>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default ProductCart;
