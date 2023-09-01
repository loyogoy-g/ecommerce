import type { NextApiRequest, NextApiResponse } from "next";
import { woocommerce, woocommerceFixer } from "@/lib/woocommerce";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = req.query.page || 1;
  const category = req.query.category || "1";

  const data = await woocommerce.get("products", {
    category: typeof category === "string" ? category : "1",
    per_page: 20,
    page: typeof page === "string" ? parseInt(page) : 1,
    orderby: "title",
    //stock_status: "instock",
  });

  const result = woocommerceFixer(data);
  return res.status(200).json(result);
}
