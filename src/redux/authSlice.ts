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
      state.refresh = action.payload.refresh;
      state.access = action.payload.access;
      state.role = action.payload.role;
    },
    clearAuth: (state) => {
      state.refresh = "";
      state.access = "";
      state.role = "unknown";
    },
    setAccess: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
    }
  },
});

export const { setAuth, clearAuth, setAccess } = authSlice.actions;

export default authSlice.reducer;

