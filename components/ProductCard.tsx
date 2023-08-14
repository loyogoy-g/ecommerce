import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { ProductCardProps, ProductProps } from "./Globalnterface";
import { useToast } from "@chakra-ui/react";
import { imageFromBuffer } from "./HelperFunction";
import ProductReviews from "./ProductReviews";
import { useStore } from "@/storage";

interface RatingProps {
  rating: number;
  numReviews: number;
  viewReviews: () => void;
}

function Rating({ rating, numReviews, viewReviews }: RatingProps) {
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box onClick={viewReviews} as="u" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
}

function ProductAddToCart({ props }: { props: ProductProps }) {
  const { image, name, price, ratings, comments, description, quantity, id } =
    props;
  const productReviewsModal = useDisclosure();
  const { orders, setOrders } = useStore();
  const toast = useToast();

  return (
    <Flex w={"100%"} alignItems="center" justifyContent="center">
      <Box
        className="hover:animate-pulse"
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <ProductReviews
          isOpen={productReviewsModal.isOpen}
          onClose={productReviewsModal.onClose}
          productCartProps={props}
        />

        <Image
          src={image}
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
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box fontSize="md" fontWeight="semibold" as="h4" lineHeight="tight">
              {name}
            </Box>

            <Tooltip
              label="Add to cart"
              bg="white"
              placement={"top"}
              color={"gray.800"}
              fontSize={"1.2em"}
            >
              <chakra.a href={"#"} display={"flex"}>
                <Icon
                  onClick={() => {
                    setOrders(id, price, name, 1, image);
                    toast({
                      title: "Added to cart",
                      status: "success",
                      duration: 2000,
                      isClosable: true,
                    });
                  }}
                  as={FiShoppingCart}
                  h={7}
                  w={7}
                  alignSelf={"center"}
                />
              </chakra.a>
            </Tooltip>
          </Flex>
          <Box as="span" color="gray.600" fontSize="sm">
            In Stock: {quantity}
          </Box>
          <Flex justifyContent="space-between" alignContent="center">
            <Rating
              viewReviews={productReviewsModal.onOpen}
              rating={ratings}
              numReviews={comments.length}
            />
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="lg">
                ₩
              </Box>
              {price.toFixed(2)}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default ProductAddToCart;
