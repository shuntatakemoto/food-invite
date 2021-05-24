import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

//postIdをAddList.tsxに流す
export const itemSlice = createSlice({
  name: "item",
  initialState: {
    item: {
      itemName: "",
      itemPostId: "",
      itemMemo: "",
      itemUrl: "",
      itemUserName: "",
      itemImageUrl: "",
    },
  },
  reducers: {
    //actionにPayloadAction<string>の型が必要かも
    getName: (state, action) => {
      state.item.itemName = action.payload;
    },
    getPostId: (state, action) => {
      state.item.itemPostId = action.payload;
    },
    getMemo: (state, action) => {
      state.item.itemMemo = action.payload;
    },
    getUrl: (state, action) => {
      state.item.itemUrl = action.payload;
    },
    getUserName: (state, action) => {
      state.item.itemUserName = action.payload;
    },
    getImageUrl: (state, action) => {
      state.item.itemImageUrl = action.payload;
    },
    // getListName: (state, action) => {
    //   state.item.listName = action.payload;
    // },
    // getEmojiName: (state, action) => {
    //   state.item.emojiName = action.payload;
    // },
  },
});

export const { getName, getImageUrl, getMemo, getPostId, getUrl, getUserName } =
  itemSlice.actions;

export const selectItem = (state: RootState) => state.item.item;

export default itemSlice.reducer;
