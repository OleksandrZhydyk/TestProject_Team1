import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductData } from "../../models/productModels";

interface CartState {
  products: ProductData[];
}

const initialCartState: CartState = {
  products: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductData>) => {
      state.products.push(action.payload);
    },
    removeItemFromCart: (state, action: PayloadAction<ProductData>) => {
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
