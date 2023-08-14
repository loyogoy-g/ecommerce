import Image from "next/image";
import { Container, HStack, SimpleGrid } from "@chakra-ui/react";
import ProductAddToCart from "@/components/ProductCard";
import { ProductCardProps } from "@/components/Globalnterface";
import { useRouter } from "next/router";
import { Category, Comment, Product } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  ratings: number;
  image: Buffer;
  categoryId: string | null;
  comments: Array<Comment>;
}

export default function Home() {
  const [products, setProducts] = useState<Array<ProductProps> | []>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res: AxiosResponse<Array<ProductProps>> = await axios.post(
          "/api/getallproductscategory",
          { id }
        );
        setProducts(res.data);
      } catch (error) {
        setProducts([]);
      }
    };
    fetchCategory();
  }, [id]);

  return (
    <SimpleGrid p={5} columns={[1, 2, 3, 4]} spacing={10} columnGap={10}>
      {products.map((product) => {
        const { image, name, price, description, quantity, ratings, comments } =
          product;
        return <ProductAddToCart props={product} />;
      })}
    </SimpleGrid>
  );
}
