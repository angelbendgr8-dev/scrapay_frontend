import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface AuthState {
  userInfo: any;
  token: string | null;
}

const initialState: AuthState = {
  userInfo: {},
  token: null,
};

export const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setUserInfo: (state, {payload: {user,token}}: PayloadAction<{user: any, token: string}>) => {
      state.userInfo= user ;
      state.token = token;
    },
    updateUserInfo: (state, {payload: {user}}: PayloadAction<{user: any}>) => {
      state.userInfo= user ;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserInfo, updateUserInfo } = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state: RootState) => state.authReducer.token;
