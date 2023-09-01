import axios from "axios";

interface CocartInterface {
  url:
    | "cart/items"
    | "cart/items/count"
    | "cart/totals"
    | "cart"
    | "cart/add-item";
  cart_key: string | null;
  data?: {
    id: string;
    quantity: string;
    variation?: {};
  };
}

export function imageFromBuffer(imageBuffer: Buffer) {
  const imageData = Buffer.from(imageBuffer).toString("base64");
  return `data:image/png;base64,${imageData}`;
}

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const coCartUrl = "https://test-store.ein-soft.com/wp-json/cocart/v2/";

export const Cocart_get = async ({ url, cart_key }: CocartInterface) => {
  const link = `${coCartUrl}${url}?cart_key=${cart_key}`;
  const link_final = cart_key ? link : `${coCartUrl}${url}`;
  const data = await axios.get(link_final);
  return data.data;
};

export const Cocart_post = async ({ url, cart_key, data }: CocartInterface) => {
  const link = `${coCartUrl}${url}?cart_key=${cart_key}`;
  const result = await axios.post(link, data);
  return result;
};

export const fetcherCart = ({ url, cart_key }: CocartInterface) => {
  const link = `${coCartUrl}${url}?cart_key=${cart_key}`;
  const link_final = cart_key ? link : `${coCartUrl}${url}`;
  return axios.get(link_final).then((res) => res.data);
};
