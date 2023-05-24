import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AuthService from "../services/AuthService";
import { AccessToken, UserAuthorization } from "../../models/authModels";
import { UserData } from "../../models/userModel";
import { API_URL } from "../../http";
interface AuthState {
  user: UserData | null;
  isLogged: boolean;
  loading: boolean;
  error: string;
}

const initialAuthState: AuthState = {
  user: null,
  isLogged: false,
  loading: false,
  error: "",
};

// login thunk, saves tokens in localstorage
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: UserAuthorization) => {
    const response = await AuthService.login({ username, password });
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    return response.data;
  }
);

// registration thunk
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

// thunk for updating access token
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
    // action for logout, clearing the state
    logout: (state) => {
      state.isLogged = false;
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
      state.isLogged = false;
      state.user = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.isLogged = true;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.isLogged = false;
      state.user = null;
      if (action.error.message) state.error = action.error.message;
    });
    builder.addCase(register.pending, (state) => {
      state.user = null;
      state.loading = true;
      state.error = "";
      state.isLogged = false;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.user = null;
      state.loading = false;
      state.error = "";
      state.isLogged = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.user = null;
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
