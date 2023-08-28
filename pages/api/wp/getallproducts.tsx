import type { NextApiRequest, NextApiResponse } from "next";
import { woocommerce, woocommerceFixer } from "@/lib/woocommerce";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await woocommerce.get("products", {
      per_page: 99,
      page: 1,
    });
    const fixerResult = await woocommerceFixer(result);
    return res.status(200).json(fixerResult);
  } catch (error) {
    return res.status(500).json(error);
  }
}
