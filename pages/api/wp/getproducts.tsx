import type { NextApiRequest, NextApiResponse } from "next";
import { woocommerce, woocommerceFixer } from "@/lib/woocommerce";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = req.query.page || 1;
  const search = req.query.search || null;

  const data = await woocommerce.get("products", {
    per_page: 20,
    page: typeof page === "string" ? parseInt(page) : 1,
    search: search,
    orderby: "title",
    //stock_status: "instock",
  });

  const result = woocommerceFixer(data);
  return res.status(200).json(result);
}
