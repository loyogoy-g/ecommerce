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
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import logo from "../components/assets/logov1.png";
import { useRouter } from "next/router";
import Image from "next/image";
import Postcode from "@/components/PostCode/Postcode";
import { Address } from "react-daum-postcode";

type FormData = {
  firstName: string;
  email: string;
  password: string;
  street: string;
  phoneNumber: string;
  postalCode: string;
};

export default function Signup() {
  const toast = useToast();
  const router = useRouter();
  const [loading, setloading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const [address, setaddress] = useState<Address | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setloading(true);
    const dataPayload = { ...data, postalCode: address?.zonecode };
    const reg = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ registrationData: dataPayload }),
    });
    const res: { status: boolean; message: string } = await reg.json();
    toast({
      status: res.status ? "success" : "error",
      title: res.status ? "Registration Success" : res.message,
    });
    setloading(false);
    if (res.status) {
      router.push("/login");
    }
  };

  return (
    <Flex w={"100%"} minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} w={["md", "lg", "xl"]} py={12} px={6}>
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
              <Heading textAlign={"center"}>가입하기</Heading>
              <FormControl id="firstName" isRequired>
                <FormLabel>이름</FormLabel>
                <Input
                  type="text"
                  {...register("firstName", { required: true })}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>이메일 주소</FormLabel>
                <Input
                  type="email"
                  {...register("email", { required: true })}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>비밀번호</FormLabel>
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
                  (영문대문자/소문자/숫자/특수문자 중 2개 이상 조합, 10~16자)
                </FormHelperText>
              </FormControl>
              <FormControl id="street" isRequired>
                <FormLabel>Street</FormLabel>
                <InputGroup>
                  <Input
                    type={"text"}
                    {...register("street", { required: true })}
                  />
                </InputGroup>
              </FormControl>

              <FormLabel>우편 번호</FormLabel>
              <Postcode
                buttonProps={{
                  justifyContent: "flex-start",
                  colorScheme: "cyan",
                  children: address ? address.zonecode : "우편번호 검색",
                }}
                handle={(address) => {
                  console.log(address, "sfgsdg");
                  setValue("street", address.address);
                  setaddress(address);
                }}
              />
              <FormControl id="phone" isRequired>
                <FormLabel>전화 번호</FormLabel>
                <Input
                  type={"tel"}
                  {...register("phoneNumber", { required: true })}
                />
                {errors.phoneNumber && (
                  <FormHelperText color="red">
                    This field is required.
                  </FormHelperText>
                )}
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  isLoading={loading}
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  가입하기
                </Button>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text align={"center"}>이미 계정이 있나요? </Text>
                <Link href={"/login"}>
                  <Text color={"blue.500"}> 로그인</Text>
                </Link>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
