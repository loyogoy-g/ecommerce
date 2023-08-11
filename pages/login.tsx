import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { signIn } from "next-auth/react";
import logo from "../components/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignup = async ({
    id,
    password,
  }: {
    id: string;
    password: string;
  }) => {
    await signIn("credentials", {
      id,
      password,
    });
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack width={"100%"} spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Image alt="LOGO" src={logo.src} width={150} height={150} />
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Heading textAlign={"center"}>Log In</Heading>
          <Stack spacing={4}>
            <FormControl id="id" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                onClick={() => handleSignup({ id, password })}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Login
              </Button>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text align={"center"}>Don't have an account ? </Text>
              <Link href={"/signup"}>
                <Text color={"blue.500"}> Sign Up</Text>
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
