import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SaveInBag } from "../../models/productOrderModel";

interface CartState {
  products: SaveInBag[];
}

interface changeQuantityPayload {
  id: number;
  quantity: number;
}

const initialCartState: CartState = {
  products: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action: PayloadAction<SaveInBag>) => {
      state.products.push(action.payload);
    },
    removeItemFromCart: (state, action: PayloadAction<SaveInBag>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
    clearCart: (state) => {
      state.products = [];
    },
    changeQuantity: (state, action: PayloadAction<changeQuantityPayload>) => {
      state.products = state.products.map(
        (product) => {
          if (product.id === action.payload.id) {
            return ({...product, quantity: action.payload.quantity })
          }
          return product
        }
      );
    },
  },
});

export default CartSlice.reducer;
export const { addToCart, removeItemFromCart, clearCart, changeQuantity } = CartSlice.actions;
