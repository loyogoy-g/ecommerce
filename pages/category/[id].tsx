import {
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import ProductCart from "@/components/ProductCard/ProductCard";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@/components/HelperFunction";
import { AllProductData } from "@/components/interface/AllProductInterface";
import { Search2Icon } from "@chakra-ui/icons";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR<Array<AllProductData>>(
    `/api/wp/getproductsbycategory?category=${id}&page=2`,
    fetcher
  );

  if (isLoading) {
    console.log(isLoading);
    return <VStack className="animate-pulse"></VStack>;
  }
  return (
    <VStack gap={5} p={5}>
      <SimpleGrid p={5} columns={[1, 2, 3, 4]} spacing={10} columnGap={10}>
        {data?.map((item: AllProductData) => {
          return <ProductCart key={item.id} props={item} />;
        })}
      </SimpleGrid>
    </VStack>
  );
}
