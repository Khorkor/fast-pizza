export interface CartItemType {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderType {
  id: string;
  status: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: CartItemType[];
  position?: string;
  orderPrice: number;
  priorityPrice: number;
}

export interface NewOrderType {
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  cart: CartItemType[];
  position?: string | undefined;
}

export interface NewOrderFormErrorsType {
  phone?: string;
  address?: string;
  customer?: string;
}

export interface UpdateOrderType {
  id?: string;
  status?: string;
  priority?: boolean;
}
