import { Comment } from "@prisma/client";
export interface ProductCardProps {
  image: string;
  name: string;
  isNew: boolean;
  price: number;
  rating: number;
  numReviews: number;
  comments: Array<Comment>;
}

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  ratings: number;
  image: string;
  categoryId: string | null;
  comments: Array<Comment>;
}
