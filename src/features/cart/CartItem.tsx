import { FC } from "react";
import { CartItemType } from "../../types";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentQuantityById } from "./cartSlice";
import { useAppSelector } from "../../hooks/useRedux";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: FC<CartItemProps> = ({ item }) => {
  const { pizzaId, name, quantity, unitPrice, totalPrice } = item;

  const currentItemQuantity = useAppSelector((state) =>
    getCurrentQuantityById(state, pizzaId),
  );

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <UpdateItemQuantity
          id={pizzaId}
          currentQuantity={currentItemQuantity}
        />

        <DeleteItem id={pizzaId} />
      </div>
    </li>
  );
};

export default CartItem;
