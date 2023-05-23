import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AuthService from "../services/AuthService";
import { AccessToken, UserAuthorization } from "../../models/authModels";
import { API_URL } from "../../http";
interface AuthState {
  isLogged: boolean;
  loading: boolean;
  error: string;
}

const initialAuthState: AuthState = {
  isLogged: false,
  loading: false,
  error: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: UserAuthorization) => {
    const response = await AuthService.login({ username, password });
    console.log(response);

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    return response.data;
  }
);

export const register = createAsyncThunk(
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

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const response = await axios.post<AccessToken>(`${API_URL}/auth/refresh/`, {
    refresh: localStorage.getItem("refresh"),
  });
  localStorage.setItem("access", response.data.access);
  return response.data;
});

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout: (state) => {
      state.isLogged = false;
      state.error = "";
      state.loading = false;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.isLogged = false;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.isLogged = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.isLogged = false;
      if (action.error.message) state.error = action.error.message;
    });
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.isLogged = false;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.isLogged = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.isLogged = false;
      if (action.error.message) state.error = action.error.message;
    });
    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.isLogged = false;
    });
    builder.addCase(checkAuth.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.isLogged = false;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.loading = false;
      state.isLogged = false;
      if (action.error.message) state.error = action.error.message;
    });
  },
});

export default AuthSlice.reducer;
