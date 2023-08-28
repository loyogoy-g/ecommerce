import type { NextApiRequest, NextApiResponse } from "next";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
const CircularJSON = require("circular-json");

interface requestDataProps {
  slug: string;
  data?: {};
  method: "get" | "post";
}

const requestData = async (args: requestDataProps) => {
  const { slug, data, method } = args;

  const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL as string,
    consumerKey: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY as string,
    consumerSecret: process.env
      .NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET as string,
    version: "wc/v3",
  });

  if (method === "get") {
    const request = await api.get(slug);
    const json = CircularJSON.stringify(request);
    return json;
  } else {
    const request = await api.post(slug, data);
    const json = CircularJSON.stringify(request);
    return json;
  }
};

const slug = "products/categories";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await requestData({
    method: "get",
    slug: slug,
  });

  return res.status(200).json(JSON.parse(result));
}
