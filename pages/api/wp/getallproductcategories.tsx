import type { NextApiRequest, NextApiResponse } from "next";
import { woocommerce, woocommerceFixer } from "@/lib/woocommerce";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await woocommerce.get("products/categories", {
    hide_empty: true,
    parent: 0,
  });

  const result = woocommerceFixer(data);
  return res.status(200).json(result);
}
