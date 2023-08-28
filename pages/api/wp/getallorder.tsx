import type { NextApiRequest, NextApiResponse } from "next";
import { woocommerce, woocommerceFixer } from "@/lib/woocommerce";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { data } = req.body;
  try {
    const result = await woocommerce.get("orders");
    const fixerResult = await woocommerceFixer(result);
    return res.status(200).json(fixerResult);
  } catch (error) {
    return res.status(500).json(error);
  }
}
