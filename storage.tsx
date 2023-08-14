import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Product {
  id: string;
  price: number;
  name: string;
  quantity: number;
  image: string;
}

interface Store {
  orders: Array<Product>;
  setOrders: (
    id: string,
    price: number,
    name: string,
    quantity: number,
    image: string
  ) => void;
  removeOrder: (id: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      orders: [],
      removeOrder(id) {
        set((data) => ({
          orders: data.orders.filter((order) => order.id !== id),
        }));
      },
      setOrders(id, price, name, quantity, image) {
        set((data) => {
          const existingOrderIndex = data.orders.findIndex(
            (order) => order.id === id
          );
          if (existingOrderIndex !== -1) {
            const updatedOrders = [...data.orders];
            updatedOrders[existingOrderIndex].quantity += quantity;
            return {
              orders: updatedOrders,
            };
          } else {
            const newOrder = { id, price, name, quantity, image };
            return {
              orders: [...data.orders, newOrder],
            };
          }
        });
      },
    }),
    {
      name: "store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
