import { Container, HStack, SimpleGrid } from "@chakra-ui/react";

import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  console.log(router.query);

  return (
    <SimpleGrid
      p={5}
      columns={[1, 2, 3, 4]}
      spacing={10}
      columnGap={10}
    ></SimpleGrid>
  );
}
