import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  Text,
  VStack,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  HStack,
} from "@chakra-ui/react";
import { AllProductData } from "../interface/AllProductInterface";
import Product from "./Product";
import RelatedProducts from "./Relatedproduct";
import { HiOutlineInformationCircle } from "react-icons/hi";

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  data: AllProductData;
}

export default function AddToCart(props: CheckoutProps) {
  const { isOpen, onClose } = props;
  const { name, images } = props.data;

  const img =
    images.length > 0
      ? images[0].src
      : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Shopping_Cart_Flat_Icon_Vector.svg/2048px-Shopping_Cart_Flat_Icon_Vector.svg.png";

  return (
    <Drawer isOpen={isOpen} placement="left" size={"md"} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            Add To Cart
          </Text>
        </DrawerHeader>
        <DrawerBody>
          <VStack>
            <Image
              src={img}
              alt={`Picture of ${name}`}
              roundedTop="lg"
              w={300}
              h={350}
            />
          </VStack>
          <Tabs isFitted>
            <TabList>
              <Tab>Product</Tab>
              <Tab>Reviews</Tab>
              <Tab>Related</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Product onClose={onClose} data={props.data} />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <HStack mb={5}>
                  <HiOutlineInformationCircle />
                  <Text fontSize={"sm"}>
                    Related Product to <b>{name}</b>
                  </Text>
                </HStack>

                <RelatedProducts data={props.data} onClose={onClose} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
