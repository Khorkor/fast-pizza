import { useEffect, useState } from "react";
import {
  CartItemType,
  NewOrderFormErrorsType,
  NewOrderType,
} from "../../types";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import FormInput from "../../ui/FormInput";
import Button from "../../ui/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { clearCart, getCartSummary } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string): boolean =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const CreateOrder = () => {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData() as NewOrderFormErrorsType;
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useAppSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";
  const dispatch = useAppDispatch();
  const { getCart: cart, totalPrice } = useAppSelector(getCartSummary);
  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;
  const totalCartPrice = totalPrice + priorityPrice;

  const [localAddress, setLocalAddress] = useState("");
  // Set the initial address if available
  useEffect(() => {
    if (address) setLocalAddress(address);
  }, [address]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalAddress(e.target.value);
  };

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <FormInput
            type="text"
            name="customer"
            required={true}
            placeholder="Corey Taylor"
            className="grow"
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <FormInput
              type="tel"
              name="phone"
              required
              // pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
              maxLength={10}
              placeholder="5556667788"
              className="w-full"
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-xl bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>
        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="relative grow">
            <FormInput
              type="text"
              name="address"
              required={true}
              disabled={isLoadingAddress}
              value={localAddress}
              onChange={handleAddressChange}
              className="relative w-full pr-10"
            />

            {addressStatus === "error" && (
              <p className="mt-2 rounded-xl bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}

            {!position?.latitude && !position?.longitude && (
              <div
                className={`absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer ${addressStatus === "error" ? "top-[18%] md:top-1/4" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                <span role="img" aria-label="location" className="text-sm">
                  🌍Get Location
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <FormInput
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            value={String(withPriority)}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position?.latitude && position?.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalCartPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const data: Record<string, FormDataEntryValue> = Object.fromEntries(formData);

  const cart: CartItemType[] =
    typeof data.cart === "string" ? JSON.parse(data.cart) : [];

  let position: string | undefined;

  if (typeof data.position === "string") {
    const positionArr = data.position
      .split(",")
      .map((val) => parseFloat(val.trim()));
    if (
      positionArr.length === 2 &&
      !isNaN(positionArr[0]) &&
      !isNaN(positionArr[1])
    ) {
      position = `${positionArr[0]},${positionArr[1]}`; // Format as a string
    }
  }

  const order: NewOrderType = {
    customer: data.customer as string,
    phone: data.phone as string,
    address: data.address as string,
    priority: data.priority === "true" || data.priority === "on",
    cart,
    position,
  };

  const errors: NewOrderFormErrorsType = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;
