import Image from "next/image";
import { Container, HStack, SimpleGrid } from "@chakra-ui/react";
import ProductAddToCart from "@/components/ProductCard";
import { ProductCardProps } from "@/components/Globalnterface";

export default function Home() {
  const dummyProducts: Array<ProductCardProps> = [
    {
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
      name: "Product 1",
      price: 1000,
      isNew: true,
      numReviews: 10,
      rating: 4.5,
    },
    {
      image:
        "https://img.freepik.com/free-vector/green-umbrella-white_1308-32908.jpg?w=2000",
      name: "Product 1",
      price: 1000,
      isNew: true,
      numReviews: 10,
      rating: 4.5,
    },
  ];
  return (
    <SimpleGrid p={5} columns={[1, 2, 3, 4]} spacing={10} columnGap={10}>
      {dummyProducts.map((product) => {
        const { image, name, price, isNew, numReviews, rating } = product;
        return (
          <ProductAddToCart
            key={product.name}
            image={image}
            isNew={isNew}
            name={name}
            price={price}
            rating={rating}
            numReviews={numReviews}
          />
        );
      })}
    </SimpleGrid>
  );
}
