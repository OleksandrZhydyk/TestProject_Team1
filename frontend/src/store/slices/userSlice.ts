import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/UserService";
import { UserData } from "../../models/userModel";

interface UserState {
  user: UserData | null;
  loading: boolean;
  error: string;
}

const initialUserState: UserState = {
  user: null,
  loading: false,
  error: "",
};

export const getUserData = createAsyncThunk("user/getUserData", async () => {
  const response = await UserService.getUserData();
  console.log(response);

  return response.data;
});

const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.user = null;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      if (action.error.message) state.error = action.error.message;
    });
  },
});

export default UserSlice.reducer;
