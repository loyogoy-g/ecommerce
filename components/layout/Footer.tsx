import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import logo from "../assets/logov1.png";
import { mutate } from "swr";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

interface CategoryResponse {
  id: number;
  name: string;
  parent: number;
}

export default function Footer() {
  const [category, setcateg] = useState<undefined | Array<CategoryResponse>>(
    undefined
  );

  useEffect(() => {
    const request = async () => {
      const data = await mutate<Array<CategoryResponse>>(
        "/api/wp/getallproductcategories"
      );
      setcateg(data);
    };
    request();
  }, []);

  return (
    <Box
      w={"full"}
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>Product</ListHeader>
            {category?.map((value, key) => {
              return (
                <Box key={key} as="a" href={`/category/${value.id}`}>
                  {value.name}
                </Box>
              );
            })}
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Box as="a" href={"#"}>
              About Us
            </Box>
            <Box as="a" href={"#"}>
              Partners
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Legal</ListHeader>
            <Box as="a" href={"#"}>
              Privacy Policy
            </Box>
            <Box as="a" href={"#"}>
              Terms of Service
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Follow Us</ListHeader>
            <Box as="a" href={"#"}>
              Facebook
            </Box>
            <Box as="a" href={"#"}>
              Twitter
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Image alt="Logo" src={logo.src} width={100} height={100} />
        </Flex>
      </Box>
    </Box>
  );
}
