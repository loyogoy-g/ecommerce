import { Prisma, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

interface Data {}

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.body;

  const category = await prisma.product.findMany({
    where: {
      categoryId: id,
    },
    include: {
      comments: true,
    },
  });

  return res.status(200).json(category);
}
