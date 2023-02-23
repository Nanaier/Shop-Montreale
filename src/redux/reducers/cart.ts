import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartProduct } from "../../types/cartType";

const initialState: CartProduct[] = localStorage.getItem("cartProducts")
  ? JSON.parse(localStorage.getItem("cartProducts")!)
  : [];

const cartProductsSlice = createSlice({
  name: "cartProductsSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      if (
        state.find(
          (product) => product.product.id === action.payload.product.id
        )
      ) {
        const ind = state
          .map(function (e) {
            return e.product.id;
          })
          .indexOf(action.payload.product.id);
        state[ind].quantity += action.payload.quantity;
        localStorage.setItem("cartProducts", JSON.stringify(state));
      } else {
        localStorage.setItem(
          "cartProducts",
          JSON.stringify([...state, action.payload])
        );
        return [...state, action.payload];
      }
    },
    reduceFromCart: (state, action: PayloadAction<CartProduct>) => {
      if (
        state.find(
          (product) => product.product.id === action.payload.product.id
        )
      ) {
        const ind = state
          .map(function (e) {
            return e.product.id;
          })
          .indexOf(action.payload.product.id);
        if (state[ind].quantity > 0) {
          state[ind].quantity -= action.payload.quantity;
        }
        localStorage.setItem("cartProducts", JSON.stringify(state));
      } else {
        localStorage.setItem("cartProducts", JSON.stringify(state));
        return [...state, action.payload];
      }
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      state = state.filter((item) => item.product.id !== action.payload);
      localStorage.setItem("cartProducts", JSON.stringify(state));
      return state;
    },
  },
});

export const cartProductsReducer = cartProductsSlice.reducer;
export const { addToCart, deleteFromCart, reduceFromCart } =
  cartProductsSlice.actions;
