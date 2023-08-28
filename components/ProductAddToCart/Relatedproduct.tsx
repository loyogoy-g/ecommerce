import * as React from "react";
import { AllProductData } from "../interface/AllProductInterface";
import axios from "axios";
import { useState, useEffect } from "react"; // Import useEffect for handling side effects
import { SimpleGrid } from "@chakra-ui/react";
import ProductCart from "../ProductCard/ProductCard";

interface CheckoutProps {
  onClose: () => void;
  data: AllProductData;
}

export default function RelatedProducts(props: CheckoutProps) {
  const { data, onClose } = props;
  const { related_ids } = data;
  const [relatedProduct, setRelatedProduct] = useState<Array<AllProductData>>(
    []
  );

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        // Use Promise.all to fetch related products concurrently
        const promises = related_ids.map(async (id) => {
          const response = await axios.get<AllProductData>(
            `/api/wp/getproductbyid?product_id=${id}`
          );
          return response.data;
        });

        const relatedProductsData = await Promise.all(promises);
        setRelatedProduct(relatedProductsData);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [related_ids]);

  console.log(relatedProduct);
  return (
    <SimpleGrid gap={5}>
      {relatedProduct.map((product, key) => {
        return <ProductCart props={product} />;
      })}
    </SimpleGrid>
  );
}
