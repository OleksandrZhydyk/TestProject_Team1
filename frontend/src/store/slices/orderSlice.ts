import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MakeOrderRequest } from "../../models/productOrderModel";
import OrderService from "../services/OrderService";

interface OrderState {
  orderStatus: string;
  loading: boolean;
  error: string;
}

const initialOrderState: OrderState = {
  orderStatus: "",
  loading: false,
  error: "",
};

// you need to pass an array of product objects that match schema "MakeOrderRequest"
export const orderProduct = createAsyncThunk(
  "order/orderProduct",
  async (array: MakeOrderRequest[]) => {
    const response = await OrderService.makeOrder(array);
    return response.data;
  }
);

const OrderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(orderProduct.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.orderStatus = "";
    });
    builder.addCase(orderProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.orderStatus = action.payload.message;
    });
    builder.addCase(orderProduct.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message) state.error = action.error.message;
    });
  },
});

export default OrderSlice.reducer;
