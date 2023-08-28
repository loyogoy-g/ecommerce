import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Image,
  List,
  ListItem,
  Input,
  ListIcon,
  HStack,
  VStack,
  Divider,
  Text,
  Textarea,
} from "@chakra-ui/react";
import * as React from "react";
import { ProductCardProps, ProductProps } from "./interface/Globalnterface";
import { imageFromBuffer } from "./HelperFunction";
import { MdOutlineDriveFileRenameOutline, MdDescription } from "react-icons/md";
import { BsFillBoxFill, BsChatLeftDots } from "react-icons/bs";
import { ImPriceTags } from "react-icons/im";
import Review from "./Review";

export interface IProductReviewsProps {
  isOpen: boolean;
  onClose: () => void;
  productCartProps: ProductProps;
}

export default function ProductReviews(props: IProductReviewsProps) {
  const { isOpen, onClose, productCartProps } = props;
  const { image, description, name, price, ratings, quantity, comments } =
    productCartProps;

  return (
    <Modal size={["sm", "md", "xl"]} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Product Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            justifyContent={"center"}
            flexDirection={["column", "row"]}
            gap={5}
            w={"100%"}
            mb={10}
          >
            <HStack w={["100%", "50%"]}>
              <Image
                src={image}
                alt={`Picture of ${name}`}
                roundedTop="lg"
                w={["100%", "100%"]}
                h={350}
              />
            </HStack>
            <VStack w={["100%", "50%"]}>
              <Text fontWeight={"bold"}>Product Information</Text>
              <List
                fontSize={"sm"}
                alignItems={"flex-start"}
                justifyContent={"start"}
                spacing={2}
              >
                <ListItem>
                  <ListIcon
                    as={MdOutlineDriveFileRenameOutline}
                    color="blue.500"
                  />
                  <b>Product Name :</b> {name}
                </ListItem>
                <ListItem>
                  <ListIcon as={MdDescription} color="blue.500" />
                  <b>Description :</b> {description}
                </ListItem>
                <ListItem>
                  <ListIcon as={ImPriceTags} color="blue.500" />
                  <b>Price :</b> {price} ₩
                </ListItem>
                <ListItem>
                  <ListIcon as={BsFillBoxFill} color="blue.500" />
                  <b>In Stock :</b> {quantity}
                </ListItem>
              </List>
            </VStack>
          </Flex>
          <Divider />
          <Flex mt={5}>
            <HStack m={5}>
              <BsChatLeftDots />
              <Text fontSize={"md"} color={"gray.600"}>
                Reviews : {comments.length}
              </Text>
            </HStack>
          </Flex>
          <Review comments={comments} />
        </ModalBody>

        <ModalFooter>
          <VStack w={"100%"}>
            <Textarea placeholder="Post review here" />
            <Button w={"100%"} colorScheme="blue" onClick={onClose}>
              Post Review
            </Button>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
