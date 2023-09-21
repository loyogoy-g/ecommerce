import type { NextApiRequest, NextApiResponse } from "next";
import { woocommerce, woocommerceFixer } from "@/lib/woocommerce";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  console.log(id);
  const data = await woocommerce.get("products/categories", {
    hide_empty: true,
    per_page: 100,
    parent: id,
  });

  const result = woocommerceFixer(data);
  return res.status(200).json(result);
}
