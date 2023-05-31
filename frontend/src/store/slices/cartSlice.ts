import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MakeOrderRequest } from "../../models/productOrderModel";

interface CartState {
  products: MakeOrderRequest[];
}

const initialCartState: CartState = {
  products: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action: PayloadAction<MakeOrderRequest>) => {
      state.products.push(action.payload);
    },
    removeItemFromCart: (state, action: PayloadAction<MakeOrderRequest>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export default CartSlice.reducer;
export const { addToCart, removeItemFromCart, clearCart } = CartSlice.actions;
