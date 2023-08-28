import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartData } from "./components/interface/Globalnterface";

interface Product {
  id: number;
  price: number;
  name: string;
  quantity: number;
  image: string;
}

interface CartStorage {
  orders: Array<Product>;
  setOrders: (
    id: number,
    price: number,
    name: string,
    quantity: number,
    image: string
  ) => void;
  removeOrder: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

interface ModalCheckoutCart {
  index: 0 | 1 | 2;
  setIndex: (index: 0 | 1 | 2) => void;
}

export const useStepperCart = create<ModalCheckoutCart>()(
  persist(
    (set) => ({
      index: 0,
      setIndex(index) {
        set({ index: index });
      },
    }),
    {
      name: "store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

interface Cart_Key_Interface {
  cart_key: string | null;
  cart_items: CartData | null;
  setCart_items: (items: CartData) => void;
  setCart_key: (key: string | null) => void;
}

export const useCartKey = create<Cart_Key_Interface>()(
  persist(
    (set) => ({
      cart_key: null,
      setCart_key(key) {
        set({ cart_key: key });
      },
      cart_items: null,
      setCart_items(items) {
        set({ cart_items: items });
      },
    }),
    {
      name: "cart_key",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export interface CustomerData {
  payment_method: string;
  payment_method_title: string;
  billing: Ing;
  shipping: Ing;
  line_items: Array<LineItem>;
}

export interface Ing {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
}

export interface LineItem {
  product_id: number;
  quantity: number;
}

interface CustomerDataInterface {
  customer_data: CustomerData;
  setcustomer_data: (data: CustomerData) => void;
}

export const useCustomerData = create<CustomerDataInterface>()(
  persist(
    (set) => ({
      setcustomer_data(data) {
        set({ customer_data: data });
      },
      customer_data: {
        billing: {
          first_name: "",
          last_name: "",
          company: "",
          address_1: "",
          address_2: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
        },
        shipping: {
          first_name: "",
          last_name: "",
          company: "",
          address_1: "",
          address_2: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
        },
        line_items: [],
        payment_method: "",
        payment_method_title: "",
      },
    }),
    {
      name: "customer_data",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
