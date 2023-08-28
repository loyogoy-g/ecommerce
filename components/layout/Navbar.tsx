import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Image from "next/image";
import logo from "../assets/logo.png";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { signOut } from "next-auth/react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Category } from "@prisma/client";
import Checkout from "../Checkout/Checkout";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useCartKey } from "@/storage";

interface Props {
  children: React.ReactNode;
}

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Box>
  );
};

interface CategoryResponse {
  data: Array<{
    id: number;
    name: string;
    parent: number;
  }>;
}

export default function Simple() {
  const [category, setCategory] = useState<CategoryResponse | { data: [] }>({
    data: [],
  });
  const [loaded, setLoaded] = useState(false);
  const { data: categoryData } = category;
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res: AxiosResponse<CategoryResponse> = await axios.get(
          "/api/wp/getallproductcategories"
        );
        setCategory(res.data);
      } catch (error) {
        setCategory({ data: [] });
      }
    };
    fetchCategory();
  }, []);

  const checkOutModal = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { status } = useSession();
  const { cart_items } = useCartKey();
  useEffect(() => {
    setLoaded(true);
  }, [cart_items]);
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      position={"sticky"}
      top={0}
      zIndex={1}
      px={4}
    >
      <Checkout isOpen={checkOutModal.isOpen} onClose={checkOutModal.onClose} />
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Image alt="Logo" src={logo.src} width={100} height={100} />
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {categoryData.map((product, index) => {
              if (product.parent === 0 && product.name !== "Uncategorized") {
                return (
                  <Link href={`/category/${product.id}`}>
                    <NavLink key={index}>{product.name}</NavLink>
                  </Link>
                );
              }
            })}
            <NavLink>Dashboard</NavLink>
          </HStack>
        </HStack>

        <HStack spacing={5} m={2}>
          <Flex display={["none", "block"]} alignItems={"center"}>
            {status === "authenticated" ? (
              <Button
                size={["sm", "md"]}
                colorScheme="red"
                onClick={() => {
                  signOut();
                }}
                variant={"outline"}
              >
                Log out
              </Button>
            ) : (
              <Link href={"/login"}>
                <Button colorScheme="blue" variant={"outline"}>
                  Log in
                </Button>
              </Link>
            )}
          </Flex>
          <Flex
            pos={"fixed"}
            bottom={"5%"}
            backgroundColor={"white"}
            borderRadius={"full"}
            right={"5%"}
          >
            <LiaShoppingBagSolid onClick={checkOutModal.onOpen} size="50px" />

            <Flex
              fontSize={20}
              position={"absolute"}
              top={-3}
              fontWeight={"bold"}
              right={-1}
              color={"blue.400"}
            >
              {loaded ? (cart_items ? cart_items.items.length : 0) : 0}
            </Flex>
          </Flex>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {categoryData.map((product, index) => {
              if (product.parent === 0 && product.name !== "Uncategorized") {
                return (
                  <Link href={`/category/${product.id}`}>
                    <NavLink key={index}>{product.name}</NavLink>
                  </Link>
                );
              }
            })}
            {status === "authenticated" && <NavLink>Dashboard</NavLink>}
            <Flex alignItems={"center"}>
              {status === "authenticated" ? (
                <Button
                  size={["sm", "md"]}
                  colorScheme="red"
                  variant={"outline"}
                  onClick={() => {
                    signOut();
                  }}
                >
                  Log out
                </Button>
              ) : (
                <Link href={"/login"}>
                  <Button colorScheme="blue" variant={"outline"}>
                    Log in
                  </Button>
                </Link>
              )}
            </Flex>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
