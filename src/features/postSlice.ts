import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

//postIdをAddList.tsxに流す
export const userSlice = createSlice({
  name: "post",
  initialState: {
    post: { postId: "" },
  },
  reducers: {
    login: (state, action) => {
      state.post = action.payload;
    },
    logout: (state) => {
      state.post = { postId: "" };
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
