import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const woocommerceUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const request = await axios.get(`${woocommerceUrl}/wp-json/cocart/v2/cart`);
    return res.status(200).json(request.data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
