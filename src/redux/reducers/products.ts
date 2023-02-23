import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Product } from "../../types/productsType";

const initialState: Product[] = [];

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const data = fetch("https://api.escuelajs.co/api/v1/products")
    .then((data) => data.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err);
    });

  return data;
});

const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    sortByPrice: (state, action) => {
      if (action.payload === "asc") {
        state.sort((a, b) => (a.price > b.price ? 1 : -1));
      } else {
        state.sort((a, b) => (a.price < b.price ? 1 : -1));
      }
    },
    sortById: (state) => {
      state.sort((a, b) => (a.id > b.id ? 1 : -1));
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

const productsReducer = productsSlice.reducer;
export const { sortByPrice, sortById } = productsSlice.actions;
export default productsReducer;
