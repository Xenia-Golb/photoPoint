import { configureStore } from "@reduxjs/toolkit";
import { fakeStoreApi } from "../store/slices/apiSlice";
import { filterSlice } from "./slices/filterSlice";
import { cartSlice } from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
    filter: filterSlice.reducer,
    cart: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fakeStoreApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
