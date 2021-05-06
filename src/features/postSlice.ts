import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

//postIdをAddList.tsxに流す
export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: { postId: "", listName: "" },
  },
  reducers: {
    //actionにPayloadAction<string>の型が必要かも
    getPostId: (state, action) => {
      state.post = action.payload;
    },
    getListName: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const { getPostId, getListName } = postSlice.actions;

export const selectPost = (state: RootState) => state.post.post;

export default postSlice.reducer;
