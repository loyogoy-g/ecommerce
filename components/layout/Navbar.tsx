import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Button,
  VStack,
  Divider,
  calc,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Image from "next/image";
import logo from "../assets/logov1.png";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Checkout from "../Checkout/Checkout";
import { LiaShoppingBagSolid, LiaMapPinSolid } from "react-icons/lia";
import { GiAerialSignal } from "react-icons/gi";
import { useCartKey } from "@/storage";
import useSWR from "swr";
import { fetcher } from "../HelperFunction";
import Tracking from "../Tracking/Tracking";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      w={"full"}
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
  id: number;
  name: string;
  parent: number;
}

export default function Simple() {
  const [category, setCategory] = useState<Array<CategoryResponse> | []>([]);
  const [loaded, setLoaded] = useState(false);

  useSWR<Array<CategoryResponse>>("/api/wp/getallproductcategories", fetcher, {
    onSuccess(data, key, config) {
      setCategory(data);
    },
  });

  const checkOutModal = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: trackingisOpen,
    onOpen: trackingonOpen,
    onClose: trackingonClose,
  } = useDisclosure();
  const { status } = useSession();
  const { cart_items } = useCartKey();

  useEffect(() => {
    setLoaded(true);
  }, [cart_items]);

  return (
    <Box
      bg={"gray.300"}
      position={"sticky"}
      top={0}
      w={"100%"}
      ml={"10%"}
      mr={"10%"}
      zIndex={1}
      px={4}
    >
      <Header />
      <Divider />
      <Tracking isOpen={trackingisOpen} onClose={trackingonClose} />
      <Checkout isOpen={checkOutModal.isOpen} onClose={checkOutModal.onClose} />
      <Flex h={"100px"} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Image alt="Logo" src={logo.src} width={200} height={200} />
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <Link href={`/`}>집</Link>
            {category.map((product, index) => {
              if (product.parent === 0 && product.name !== "Uncategorized") {
                return <PopMenu categoryData={product} />;
              }
            })}

            {status === "authenticated" && (
              <Link href="/mypage">
                <NavLink>나의 페이지</NavLink>
              </Link>
            )}
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
                로그 아웃
              </Button>
            ) : (
              <Link href={"/login"}>
                <Button colorScheme="blue" variant={"outline"}>
                  로그인
                </Button>
              </Link>
            )}
          </Flex>

          <VStack spacing={4} pos={"fixed"} right={"5%"} bottom={"5%"}>
            <Flex backgroundColor={"blue.400"} borderRadius={"full"} p={3}>
              <GiAerialSignal onClick={trackingonOpen} size="20px" />
            </Flex>
            <Flex
              p={2}
              backgroundColor={"whiteAlpha.700"}
              boxShadow={"lg"}
              borderRadius={"10px"}
            >
              <LiaShoppingBagSolid onClick={checkOutModal.onOpen} size="45px" />

              <Flex
                fontSize={20}
                position={"absolute"}
                top={12}
                fontWeight={"bold"}
                right={-1}
                color={"blue.400"}
              >
                {loaded ? (cart_items ? cart_items.items.length : 0) : 0}
              </Flex>
            </Flex>
          </VStack>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {category.map((product, index) => {
              if (product.parent === 0 && product.name !== "Uncategorized") {
                return <PopMenu key={index} categoryData={product} />;
              }
            })}
            {status === "authenticated" && (
              <Link href="/mypage">
                <NavLink>나의 페이지</NavLink>
              </Link>
            )}
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
                  로그 아웃
                </Button>
              ) : (
                <Link href={"/login"}>
                  <Button colorScheme="blue" variant={"outline"}>
                    로그인
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

const PopMenu = ({ categoryData }: { categoryData: CategoryResponse }) => {
  const [hover, sethover] = useState(false);
  const { data } = useSWR<Array<CategoryResponse>>(
    hover ? `/api/wp/subcategory?id=${categoryData.id}` : null,
    fetcher
  );
  return (
    <Popover placement="right-start" trigger="hover">
      <PopoverTrigger>
        <Link href={`/category/${categoryData.id}`}>
          <Box
            px={2}
            py={1}
            onMouseEnter={() => sethover(true)}
            rounded={"md"}
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.200", "gray.700"),
            }}
          >
            {categoryData.name}
          </Box>
        </Link>
      </PopoverTrigger>
      {data?.length !== 0 && (
        <PopoverContent
          border={0}
          boxShadow={"xl"}
          m={5}
          p={4}
          bg={"whiteAlpha.900"}
          rounded={"xl"}
          minW={"sm"}
        >
          <Stack width={"full"}>
            {data?.map((child, index) => (
              <PopMenu key={index} categoryData={child} />
            ))}
          </Stack>
        </PopoverContent>
      )}
    </Popover>
  );
};
