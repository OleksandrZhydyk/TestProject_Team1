import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { TypedUseSelectorHook } from "react-redux/es/types";
import AuthSlice from "./slices/authSlice";
import ProductsSlice from "./slices/productsSlice";
import CategoriesSlice from "./slices/categoriesSlice";
import OrderSlice from "./slices/orderSlice";
import CartSlice from "./slices/cartSlice";

const reducer = {
  auth: AuthSlice,
  products: ProductsSlice,
  categories: CategoriesSlice,
  order: OrderSlice,
  cart: CartSlice,
};

const store = configureStore({
  reducer,
});

export default store;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
