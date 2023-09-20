import type { NextApiRequest, NextApiResponse } from "next";
import { woocommerce, woocommerceFixer } from "@/lib/woocommerce";
import { sendEmail } from "@/lib/emailservice";
import { CustomerData } from "@/storage";
import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

interface CreditCard {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  passCode: string;
}

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = await getToken({ req });

  const user = await prisma.user.findFirst({
    where: {
      email: token ? (token.email as string) : "",
    },
  });

  const id = user ? user.woocommerceId : 0;

  const { data, creditCard }: { creditCard: CreditCard; data: CustomerData } =
    JSON.parse(req.body);

  const data_ = { ...data, customer_id: id };

  console.log(data_, "Data");

  try {
    const result = await woocommerce.post("orders", data_);
    const fixerResult = await woocommerceFixer(result);
    const { id, billing } = fixerResult;

    if (data.payment_method == "Credit Card") {
      console.log("test");
      const note = await woocommerce.post(`orders/${id}/notes`, {
        note: JSON.stringify(creditCard),
      });
      console.log(note);
    }
    await sendEmail({
      text: `Your tracking id order number is ${id}`,
      to: billing.email,
    });
    return res.status(200).json(fixerResult);
  } catch (error) {
    return res.status(500).json(error);
  }
}
