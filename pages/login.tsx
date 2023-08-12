import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  Heading,
  Text,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { signIn } from "next-auth/react";
import logo from "../components/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type LoginFormInputs = {
  id: string;
  password: string;
};

export default function SignupCard() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const handleSignin = async (data: LoginFormInputs) => {
    const signin = await signIn("credentials", {
      email: data.id,
      password: data.password,
      redirect: false,
    });
    // Rest of your logic
    if (signin?.ok) {
      toast({
        title: "Sign in successful",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Box width={"100%"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Image alt="LOGO" src={logo.src} width={150} height={150} />
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Heading textAlign={"center"}>Log In</Heading>
          <Stack
            as="form"
            onSubmit={handleSubmit(handleSignin)}
            spacing={4}
            mt={4}
          >
            <FormControl id="id" isRequired>
              <FormLabel>Email</FormLabel>
              <Controller
                name="id"
                control={control}
                render={({ field }) => <Input {...field} type="text" />}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                    />
                  )}
                />
                <Button
                  variant={"ghost"}
                  onClick={() => setShowPassword((show) => !show)}
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                isLoading={false} // Set to true when submitting
                loadingText="Submitting"
                size="lg"
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
              <Text align={"center"}>Don't have an account? </Text>
              <Link href={"/signup"}>
                <Text color={"blue.500"}> Sign Up</Text>
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
}
