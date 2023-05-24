import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsCategories } from "../../models/productModels";
import CategoriesService from "../services/CategoriesService";

interface CategoriesState {
  categories: ProductsCategories | null;
  loading: boolean;
  error: string;
}

const initialCategoriesState: CategoriesState = {
  categories: null,
  loading: false,
  error: "",
};

export const getProductsCategories = createAsyncThunk(
  "categories/getProductsCategories",
  async () => {
    const response = await CategoriesService.getCategories();
    return response.data;
  }
);

const CategoriesSlice = createSlice({
  name: "categories",
  initialState: initialCategoriesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductsCategories.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.categories = null;
    });
    builder.addCase(getProductsCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(getProductsCategories.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) state.error = action.error.message;
    })
  },
});

export default CategoriesSlice.reducer;
