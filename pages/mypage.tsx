import { VStack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Carousel from "@/components/layout/Carousel";
import MyOrder from "@/components/MyPageComponents/MyOrder";

export default function Index() {
  const { data, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  return (
    <VStack gap={5} spacing={5} p={4}>
      <Carousel />
      <MyOrder />
    </VStack>
  );
}
