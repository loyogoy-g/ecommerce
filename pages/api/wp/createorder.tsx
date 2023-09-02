import type { NextApiRequest, NextApiResponse } from "next";
import { woocommerce, woocommerceFixer } from "@/lib/woocommerce";
import { sendEmail } from "@/lib/emailservice";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { data } = JSON.parse(req.body);

  try {
    const result = await woocommerce.post("orders", data);
    const fixerResult = await woocommerceFixer(result);
    const { id, billing } = fixerResult;
    await sendEmail({
      text: `Your tracking id order number is ${id}`,
      to: billing.email,
    });
    return res.status(200).json(fixerResult);
  } catch (error) {
    return res.status(500).json(error);
  }
}
