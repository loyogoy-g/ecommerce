import type { NextApiRequest, NextApiResponse } from "next";
import { woocommerce, woocommerceFixer } from "@/lib/woocommerce";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = req.query.page || 1;
  const search = req.query.search || null;
  const featured = req.query.featured || false;
  const on_sale = req.query.on_sale || false;

  const data = await woocommerce.get("products", {
    per_page: 20,
    page: typeof page === "string" ? parseInt(page) : 1,
    search: search,
    orderby: "title",
    featured: featured,
    on_sale: on_sale,
    //stock_status: "instock",
  });

  const result = woocommerceFixer(data);
  return res.status(200).json(result);
}
