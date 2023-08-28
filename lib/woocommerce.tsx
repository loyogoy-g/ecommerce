import { WooRestApiOptions } from "woocommerce-rest-ts-api";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
const CircularJSON = require("circular-json");
const CoCartAPI = require("@cocart/cocart-rest-api").default;

const opt: WooRestApiOptions = {
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL as string,
  consumerKey: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY as string,
  consumerSecret: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET as string,
  version: "wc/v3",
};

export const woocommerce = new WooCommerceRestApi(opt);

export const woocommerceFixer = (data: any) => {
  const result = CircularJSON.stringify(data);
  const dataresult = JSON.parse(result);
  return dataresult["data"];
};

export const coCart = new CoCartAPI({
  url: "http://localhost",
});
