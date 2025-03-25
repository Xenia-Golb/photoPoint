import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "../../../entities/cart/CartItem.types";

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Добавление товара в корзину
    addItemToCart(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalAmount += action.payload.price;
    },

    // Удаление товара из корзины
    removeItemFromCart(state, action: PayloadAction<number>) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },

    // Изменение количества товара
    updateItemQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        const quantityDiff = action.payload.quantity - existingItem.quantity;
        state.totalQuantity += quantityDiff;
        state.totalAmount += quantityDiff * existingItem.price;
        existingItem.quantity = action.payload.quantity;
      }
    },

    // Очистка корзины
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

// Экспорт действий
export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
} = cartSlice.actions;

// Селекторы
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotalQuantity = (state: { cart: CartState }) =>
  state.cart.totalQuantity;
export const selectCartTotalAmount = (state: { cart: CartState }) =>
  state.cart.totalAmount;
export const selectIsItemInCart =
  (id: number) => (state: { cart: CartState }) =>
    state.cart.items.some((item) => item.id === id);

export default cartSlice.reducer;
