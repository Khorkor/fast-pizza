import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { CartItemType } from "../../types";
import { RootState } from "../../store";

interface CartState {
  cart: CartItemType[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      //   const existingItem = state.cart.find(
      //     (item) => item.pizzaId === action.payload.pizzaId,
      //   );

      //   if (existingItem) {
      //     existingItem.quantity += action.payload.quantity;
      //     existingItem.totalPrice =
      //       existingItem.quantity * existingItem.unitPrice;
      //   } else {
      //     state.cart.push(action.payload);
      //   }
      state.cart.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }

      if (item?.quantity === 0)
        cartSlice.caseReducers.deleteItem(state, action);
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

const selectCart = (state: RootState) => state.cart.cart;

const getCart = createSelector([selectCart], (cart) => cart);

const getTotalCartQuantity = createSelector([selectCart], (cart) =>
  cart.reduce((sum, item) => sum + item.quantity, 0),
);

const getTotalCartPrice = createSelector([selectCart], (cart) =>
  cart.reduce((sum, item) => sum + item.totalPrice, 0),
);

export const getCurrentQuantityById = createSelector(
  [selectCart, (state: RootState, id: number) => id],
  (cart, id) => {
    const item = cart.find((item) => item.pizzaId === id);
    return item ? item.quantity : 0;
  },
);
export const getCartSummary = createSelector(
  [getTotalCartQuantity, getTotalCartPrice, getCart],
  (totalQuantity, totalPrice, getCart) => ({
    totalQuantity,
    totalPrice,
    getCart,
  }),
);
