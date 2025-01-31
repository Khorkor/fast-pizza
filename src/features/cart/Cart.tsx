import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { clearCart, getCartSummary } from "./cartSlice";
import EmptyCart from "./EmptyCart";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

function Cart() {
  const username = useAppSelector((state) => state.user.username);
  const { getCart: cart } = useAppSelector(getCartSummary);
  const dispatch = useAppDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-slate-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
