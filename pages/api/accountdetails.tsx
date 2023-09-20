import { Prisma, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const paymentMethods = await prisma.bankTransferPayment.findFirst();

  return res.status(200).json(paymentMethods);
}
