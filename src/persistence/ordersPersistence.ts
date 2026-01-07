import { getJson, setJson, removeItem } from "./storage";

const ORDERS_KEY = "shophub_orders";

export type PersistedOrder = {
  orderId: string;
  date?: string;
  total?: string;
  items?: any[];
  timestamp?: number;
};

export async function saveOrders(orders: PersistedOrder[]) {
  await setJson(ORDERS_KEY, orders);
}

export async function loadOrders(): Promise<PersistedOrder[] | null> {
  return getJson<PersistedOrder[]>(ORDERS_KEY);
}

export async function clearOrders() {
  await removeItem(ORDERS_KEY);
}
