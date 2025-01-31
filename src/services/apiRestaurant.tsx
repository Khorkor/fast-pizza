import {
  MenuItemType,
  OrderType,
  NewOrderType,
  UpdateOrderType,
} from "../types";

const API_URL = "https://react-fast-pizza-api.onrender.com/api";

export async function getMenu(): Promise<MenuItemType[]> {
  const res = await fetch(`${API_URL}/menu`);

  if (!res.ok) throw new Error("Failed getting menu");

  const { data }: { data: MenuItemType[] } = await res.json();
  return data;
}

export async function getOrder(id: string): Promise<OrderType> {
  const res = await fetch(`${API_URL}/order/${id}`);

  if (!res.ok) throw new Error(`Couldn't find order #${id}`);

  const { data }: { data: OrderType } = await res.json();

  return data;
}

export async function createOrder(newOrder: NewOrderType): Promise<OrderType> {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed creating your order");
    const { data }: { data: OrderType } = await res.json();
    return data;
  } catch (err) {
    throw new Error("Failed creating your order");
  }
}

export async function updateOrder(
  id: string,
  updateObj: UpdateOrderType,
): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed updating your order");
  } catch (err) {
    throw new Error("Failed updating your order");
  }
}
