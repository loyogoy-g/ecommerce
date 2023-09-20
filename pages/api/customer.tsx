import { woocommerce, woocommerceFixer } from "@/lib/woocommerce";
import { Prisma, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  const user = await prisma.user.findFirst({
    where: {
      email: token ? (token.email as string) : "",
    },
  });
  console.log(user, "data");
  const id = user ? user.woocommerceId : -1;

  const data = await woocommerce.get(`customers/${id}`);

  const result = woocommerceFixer(data);

  return res.status(200).json({ result });
}
