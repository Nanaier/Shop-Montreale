import { configureStore } from "@reduxjs/toolkit";

import { cartProductsReducer } from "./reducers/cart";
import productsReducer from "./reducers/products";
import { userReducer } from "./reducers/auth";
import { bookmarksReducer } from "./reducers/bookmarks";
import categoryReducer from "./reducers/categories";

export const store = configureStore({
  reducer: {
    productsReducer,
    cartProductsReducer,
    userReducer,
    bookmarksReducer,
    categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
