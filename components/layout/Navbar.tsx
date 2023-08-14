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
import { useStore } from "@/storage";

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

export default function Simple() {
  const [category, setCategory] = useState<Array<Category> | []>([]);
  const [loaded, setLoaded] = useState(false);
  const { orders } = useStore();

  useEffect(() => {
    setLoaded(true);
  }, [orders]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res: AxiosResponse<Array<Category>> = await axios.get(
          "/api/getcategories"
        );
        setCategory(res.data);
      } catch (error) {
        setCategory([]);
      }
    };
    fetchCategory();
  }, []);

  const checkOutModal = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { status, data } = useSession();

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
            {category.map((product, index) => (
              <Link href={`/category/${product.id}`}>
                <NavLink key={index}>{product.categoryproduct}</NavLink>
              </Link>
            ))}
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
          <Flex borderRadius={"full"}>
            <AiOutlineShoppingCart onClick={checkOutModal.onOpen} size="25px" />
            <Flex
              fontSize={12}
              position={"absolute"}
              top={3}
              fontWeight={"bold"}
              right={3}
              color={"red"}
            >
              {loaded ? orders.length : 0}
            </Flex>
          </Flex>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {category.map((product, key) => (
              <Link href={`/category/${product.id}`}>
                <NavLink key={key}>{product.categoryproduct}</NavLink>
              </Link>
            ))}
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
