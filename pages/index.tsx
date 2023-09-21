import {
  Divider,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import ProductCart from "@/components/ProductCard/ProductCard";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@/components/HelperFunction";
import { AllProductData } from "@/components/interface/AllProductInterface";
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";
import { useDebounce } from "usehooks-ts";
import EmptyResult from "@/components/LottieAnimation/EmptyResult";
import Loading from "@/components/LottieAnimation/Loading";
import Carousel from "@/components/layout/Carousel";

export default function Index() {
  const router = useRouter();

  const [searchText, setsearchText] = useState<string>("");

  const debounceSearch = useDebounce<string | null>(searchText, 1000);

  const { data, isLoading } = useSWR<Array<AllProductData>>(
    `/api/wp/getproducts?&page=1&search=${debounceSearch}`,
    fetcher
  );

  const { data: dataFeatured, isLoading: isLoadingFeatured } = useSWR<
    Array<AllProductData>
  >(`/api/wp/getproducts?&page=1&featured=${true}`, fetcher);

  const { data: dataSale, isLoading: isLoadingSale } = useSWR<
    Array<AllProductData>
  >(`/api/wp/getproducts?&page=1&0n_sale=${true}`, fetcher);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setsearchText(newValue); // Update the search text as the user types
  };

  return (
    <VStack gap={5} spacing={5} p={4}>
      <Carousel />
      <Text fontSize={["xl", "3xl"]} color={"black"} fontWeight={"bold"}>
        사용 가능한 제품
      </Text>
      {data?.length === 0 && <EmptyResult />}
      {isLoading && <Loading />}
      <SimpleGrid p={5} columns={[1, 2, 3, 4]} spacing={10} columnGap={10}>
        {data?.map((item: AllProductData) => {
          return <ProductCart key={item.id} props={item} />;
        })}
      </SimpleGrid>
      <Divider />
      <Text fontSize={["xl", "3xl"]} color={"black"} fontWeight={"bold"}>
        주요 제품
      </Text>
      {isLoadingFeatured && <Loading />}
      <SimpleGrid p={5} columns={[1, 2, 3, 4]} spacing={10} columnGap={10}>
        {dataFeatured?.map((item: AllProductData) => {
          return <ProductCart key={item.id} props={item} />;
        })}
      </SimpleGrid>
      <Divider />
      <Text fontSize={["xl", "3xl"]} color={"black"} fontWeight={"bold"}>
        판매중인 제품
      </Text>
      {isLoadingSale && <Loading />}
      <SimpleGrid p={5} columns={[1, 2, 3, 4]} spacing={10} columnGap={10}>
        {dataSale?.map((item: AllProductData) => {
          return <ProductCart key={item.id} props={item} />;
        })}
      </SimpleGrid>
    </VStack>
  );
}
