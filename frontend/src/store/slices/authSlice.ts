import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AuthService from "../services/AuthService";
import { AccessToken, UserAuthorization } from "../../models/authModels";
import { UserData } from "../../models/userModel";

interface AuthState {
  user: UserData | null;
  loading: boolean;
  error: string;
}

const initialAuthState: AuthState = {
  user: null,
  loading: false,
  error: "",
};

// login thunk, saves tokens in localstorage
const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: UserAuthorization) => {
    const response = await AuthService.login({ username, password });
    return response.data;
  }
);

// registration thunk
const register = createAsyncThunk(
  "auth/register",
  async ({ username, password, password_confirm }: UserAuthorization) => {
    const response = await AuthService.register({
      username,
      password,
      password_confirm,
    });
    return response.data;
  }
);

// thunk for updating access token
const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const response = await axios.post<AccessToken>(`${import.meta.env.VITE_API_URL}/auth/refresh/`, {
    refresh: localStorage.getItem("refresh"),
  });
  localStorage.setItem("access", response.data.access);
  return response.data;
});

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    // action for logout, clearing the state
    logout: (state) => {
      state.error = "";
      state.loading = false;
      state.user = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.user = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("access", action.payload.access);
      localStorage.setItem("refresh", action.payload.refresh);
      state.loading = false;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message) state.error = action.error.message;
    });
    builder.addCase(register.pending, (state) => {
      state.user = null;
      state.loading = true;
      state.error = "";
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message) state.error = action.error.message;
    });
    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(checkAuth.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message) state.error = action.error.message;
    });
  },
});

export default AuthSlice.reducer;
export const authActions = {
  ...AuthSlice.actions,
  register,
  login,
  checkAuth
};
