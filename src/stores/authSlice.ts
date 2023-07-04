import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AuthState, Role } from "../interfaces/auth";

const initialState: AuthState = {
  refresh: localStorage.getItem("refresh") || "",
  access: localStorage.getItem("access") || "",
  role: localStorage.getItem("role") as Role || "unknown",
};
// persist this slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      localStorage.setItem("refresh", action.payload.refresh);
      localStorage.setItem("access", action.payload.access);
      localStorage.setItem("role", action.payload.role);
      state.refresh = action.payload.refresh;
      state.access = action.payload.access;
      state.role = action.payload.role;
    },
    clearAuth: (state) => {
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      localStorage.removeItem("role");
      state.refresh = "";
      state.access = "";
      state.role = "unknown";
    },
    setAccess: (state, action: PayloadAction<string>) => {
      localStorage.setItem("access", action.payload);
      state.access = action.payload;
    }
  },
});

export const { setAuth, clearAuth, setAccess } = authSlice.actions;

export const selectAuth = (state: { auth: AuthState }) => {
  if(state.auth.access === ""){
    state.auth.access = localStorage.getItem("access") || "";
  }

  return state.auth;
};

export default authSlice.reducer;

