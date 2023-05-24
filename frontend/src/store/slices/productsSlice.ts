import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductData, Products } from "../../models/productModels";
import ProductsService from "../services/ProductsService";

interface ProductsState {
  products: Products | null; // list of all the products available
  productDetail: ProductData | null; // single product detail
  loading: boolean;
  error: string;
}

const initialProductsState: ProductsState = {
  products: null,
  productDetail: null,
  loading: false,
  error: "",
};

// getting all products list
export const getProductsList = createAsyncThunk(
  "products/getProductsList",
  async () => {
    const response = await ProductsService.getProducts();
    return response.data;
  }
);

// getting full product info
export const getProductDetail = createAsyncThunk(
  "products/getProductDetail",
  async (slug: string) => {
    const response = await ProductsService.getOneProduct(slug);
    return response.data;
  }
);

const ProductsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductsList.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.products = null;
    });
    builder.addCase(getProductsList.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getProductsList.rejected, (state, action) => {
      state.loading = false;
      state.products = null;
      if (action.error.message) state.error = action.error.message;
    });
    builder.addCase(getProductDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.productDetail = action.payload;
    });
    builder.addCase(getProductDetail.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message) state.error = action.error.message;
    });
  },
});

export default ProductsSlice.reducer;
