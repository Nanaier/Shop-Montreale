import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Category } from "../../types/categoryType";

const initialState: Category[] = [];

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  const data = fetch("https://api.escuelajs.co/api/v1/categories")
    .then((data) => data.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err);
    });

  return data;
});

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchCategories.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
