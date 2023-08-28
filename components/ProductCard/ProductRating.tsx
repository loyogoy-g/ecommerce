import { Box } from "@chakra-ui/react";
import * as React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

interface RatingProps {
  rating: number;
  numReviews: number;
}

export default function ProductRating({ rating, numReviews }: RatingProps) {
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="u" ml="2" color="gray.600" fontSize="sm">
        {rating}
      </Box>
    </Box>
  );
}
