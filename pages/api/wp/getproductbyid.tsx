import type { NextApiRequest, NextApiResponse } from "next";
import { woocommerce, woocommerceFixer } from "@/lib/woocommerce";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const product_id = req.query.product_id || 1;

    const result = await woocommerce.get(`products/${product_id}`);
    const fixerResult = await woocommerceFixer(result);
    return res.status(200).json(fixerResult);
  } catch (error) {
    return res.status(500).json(error);
  }
}
