import { Flex, Stack, Text, useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";
import Checkout from "../Checkout/Checkout";
import Tracking from "../Tracking/Tracking";
import Link from "next/link";

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: trackingIsOpen,
    onClose: trackingOnClose,
    onOpen: trackingOnOpen,
  } = useDisclosure();
  return (
    <Flex
      w={"100%"}
      flexDirection={"row"}
      gap={5}
      display={["none", "none", "flex"]}
      justifyContent={"space-between"}
      alignItems={"center"}
      pr={25}
      pl={25}
      p={2}
    >
      <Tracking isOpen={trackingIsOpen} onClose={trackingOnClose} />
      <Checkout isOpen={isOpen} onClose={onClose} />
      <Stack w={"100%"} spacing={5} direction="row">
        <Text
          _hover={{
            fontWeight: "bold",
          }}
          onClick={onOpen}
        >
          내 카트
        </Text>
        <Text
          _hover={{
            fontWeight: "bold",
          }}
          onClick={trackingOnOpen}
        >
          주문 추적
        </Text>
        <Link href={"/login"}>
          <Text
            _hover={{
              fontWeight: "bold",
            }}
          >
            로그인
          </Text>
        </Link>
        <Link href={"/signup"}>
          <Text
            _hover={{
              fontWeight: "bold",
            }}
          >
            가입하기
          </Text>
        </Link>
      </Stack>
      <Stack
        spacing={5}
        direction={"row"}
        justifyContent={"right"}
        alignItems={"flex-end"}
        w={"100%"}
      >
        <FaFacebook />
        <FaInstagram />
        <FaPinterest />
      </Stack>
    </Flex>
  );
}
