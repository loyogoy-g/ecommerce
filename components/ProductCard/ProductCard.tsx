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
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useToast } from "@chakra-ui/react";
import ProductRating from "./ProductRating";
import AddToCart from "../ProductAddToCart/AddToCart";
import { Cocart_post } from "../HelperFunction";
import { useCartKey } from "@/storage";
import { AllProductData } from "../interface/AllProductInterface";

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

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const img =
    images.length > 0
      ? images[0].src
      : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Shopping_Cart_Flat_Icon_Vector.svg/2048px-Shopping_Cart_Flat_Icon_Vector.svg.png";

  return (
    <Flex w={"100%"} alignItems="center" justifyContent="center">
      <AddToCart data={props} isOpen={isOpen} onClose={onClose} />
      <Box
        className="hover:animate-pulse"
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image
          src={img}
          alt={`Picture of ${name}`}
          roundedTop="lg"
          w={350}
          h={400}
        />

        <Box
          border={"1px"}
          borderColor={"blackAlpha.300"}
          bgColor={"whiteAlpha.900"}
          p="6"
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
            <Flex flexDirection={"column"}>
              <HStack>
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

              <HStack spacing={2}>
                <Text fontWeight={"bold"} fontSize="sm" color="gray.600">
                  Average Rate :
                </Text>
                <ProductRating
                  rating={parseFloat(average_rating)}
                  numReviews={rating_count}
                />
              </HStack>
              <Text
                fontSize="lg"
                color="gray.600"
                dangerouslySetInnerHTML={{ __html: price_html }}
              />
            </Flex>
          </Flex>
          <Flex cursor={"pointer"} position={"absolute"} bottom={5} right={5}>
            <Icon
              _hover={{
                h: 8,
                w: 8,
              }}
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
              as={FiShoppingCart}
              h={7}
              w={7}
              alignSelf={"center"}
            />
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="lg">
                <Text></Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default ProductCart;
