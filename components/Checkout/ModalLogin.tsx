import { useStepperCart } from "@/storage";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  HStack,
  VStack,
  List,
  ListItem,
  ListIcon,
  Divider,
  ModalFooter,
  Textarea,
  Button,
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  InputGroup,
  Link,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import * as React from "react";
import { useState } from "react";
import { Controller, set, useForm } from "react-hook-form";

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type LoginFormInputs = {
  id: string;
  password: string;
};

export default function ModalLogin(props: IModalProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { isOpen, onClose } = props;
  const { setIndex } = useStepperCart();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState<boolean>(false);
  const toast = useToast();

  const handleSignin = async (data: LoginFormInputs) => {
    setloading(true);
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
    } else {
      toast({
        title: "Login failed",
        description: "Check your credentials",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    onClose();
    setloading(false);
  };
  return (
    <Modal size={["sm", "md", "xl"]} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Customer Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack m={5} spacing={2}>
            <Button
              type="submit"
              isLoading={false} // Set to true when submitting
              loadingText="Submitting"
              size="lg"
              bg={"black"}
              color={"white"}
              onClick={() => {
                setIndex(1);
                onClose();
              }}
              w={"100%"}
              _hover={{
                bg: "blackAlpha.800",
              }}
            >
              Guest Purchases
            </Button>
            <Text>or</Text>
            <Box w={"100%"} rounded={"lg"}>
              <Heading textAlign={"center"}>Log In</Heading>
              <Stack
                onSubmit={handleSubmit(handleSignin)}
                as="form"
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
                    isLoading={loading} // Set to true when submitting
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
                  <Text align={"center"}>Not a member yet? </Text>
                  <Link href={"/signup"}>
                    <Text color={"blue.500"}> Sign Up</Text>
                  </Link>
                </Stack>
              </Stack>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
