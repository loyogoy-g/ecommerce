import {
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Skeleton,
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
import BreadCrumbs from "@/components/BreadCrumbs";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;

  const [searchText, setsearchText] = useState<string>("");

  const debounceSearch = useDebounce<string | null>(searchText, 1000);

  const { data, isLoading } = useSWR<Array<AllProductData>>(
    `/api/wp/getproductsbycategory?category=${id}&page=1&search=${debounceSearch}`,
    fetcher
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setsearchText(newValue); // Update the search text as the user types
  };

  return (
    <VStack minW={["400px", "80%"]} gap={0} p={2}>
      <InputGroup p={5}>
        <InputLeftAddon border={"1px"}>
          <Search2Icon />
        </InputLeftAddon>
        <Input
          border={"1px"}
          variant={"outline"}
          bgColor={"white"}
          onChange={handleInputChange}
          type="text"
          placeholder="제품 검색"
        />
      </InputGroup>

      {data?.length === 0 && <EmptyResult />}
      {isLoading && <Loading />}
      <SimpleGrid p={5} columns={[1, 2, 3]} spacing={10} columnGap={10}>
        {data?.map((item: AllProductData) => {
          return <ProductCart key={item.id} props={item} />;
        })}
      </SimpleGrid>
    </VStack>
  );
}
