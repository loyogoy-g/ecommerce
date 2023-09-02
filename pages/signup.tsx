import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  FormHelperText,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm, SubmitHandler } from "react-hook-form";
import logo from "../components/assets/logo.png";
import { useRouter } from "next/router";
import Image from "next/image";

type FormData = {
  firstName: string;
  email: string;
  password: string;
};

export default function Signup() {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await fetch("/api/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (response.status === 200) {
      toast({
        title: "Account Created",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      router.push("/login");
    } else {
      toast({
        title: "Account Creation Failed",
        description: json.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
    return;
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Image alt="LOGO" src={logo.src} width={150} height={150} />
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <Heading textAlign={"center"}>Sign Up</Heading>
              <FormControl id="firstName" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  {...register("firstName", { required: true })}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  {...register("email", { required: true })}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                  />
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
                <FormHelperText
                  textAlign={"start"}
                  fontSize={"xs"}
                  color={"gray.400"}
                >
                  (A combination of 2 or more of English uppercase / lowercase /
                  number / special characters, 10 to 16 characters)
                </FormHelperText>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text align={"center"}>Already have an account? </Text>
                <Link href={"/login"}>
                  <Text color={"blue.500"}> Login</Text>
                </Link>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
