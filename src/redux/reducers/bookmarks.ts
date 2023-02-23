import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product } from "../../types/productsType";

const initialState: Product[] = localStorage.getItem("bookmarks")
  ? JSON.parse(localStorage.getItem("bookmarks")!)
  : [];

const bookmarksSlice = createSlice({
  name: "bookmarksSlice",
  initialState,
  reducers: {
    addToBookmarks: (state, action: PayloadAction<Product>) => {
      if (!state.find((product) => product.id === action.payload.id)) {
        localStorage.setItem(
          "bookmarks",
          JSON.stringify([...state, action.payload])
        );
        return [...state, action.payload];
      }
    },

    deleteFromBookmarks: (state, action: PayloadAction<number>) => {
      state = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("bookmarks", JSON.stringify(state));
      return state;
    },
  },
});

export const bookmarksReducer = bookmarksSlice.reducer;
export const { addToBookmarks, deleteFromBookmarks } = bookmarksSlice.actions;
