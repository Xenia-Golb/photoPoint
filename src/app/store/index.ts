import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productsReducer from "./slices/productsSlice";
import { productsApi } from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
