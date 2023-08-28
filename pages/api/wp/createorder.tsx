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
    const data = {
      payment_method: "creditcard",
      customer_id: 1,
      payment_method_title: "Credit Card",
      set_paid: true,
      billing: {
        first_name: "John",
        last_name: "Doe",
        address_1: "969 Market",
        address_2: "",
        city: "San Francisco",
        state: "CA",
        postcode: "94103",
        country: "US",
        email: "john.doe@example.com",
        phone: "(555) 555-5555",
      },
      shipping: {
        first_name: "John",
        last_name: "Doe",
        address_1: "969 Market",
        address_2: "",
        city: "San Francisco",
        state: "CA",
        postcode: "94103",
        country: "US",
      },
      line_items: [
        {
          product_id: 2873,
          quantity: 2,
        },
      ],
    };
    const result = await woocommerce.post("orders", data);
    const fixerResult = await woocommerceFixer(result);
    return res.status(200).json(fixerResult);
  } catch (error) {
    return res.status(500).json(error);
  }
}
