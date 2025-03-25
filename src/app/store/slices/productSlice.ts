import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductsState {
  favorites: number[];
}

const initialState: ProductsState = {
  favorites: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const index = state.favorites.indexOf(action.payload);
      if (index === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(index, 1);
      }
    },
  },
});

export const { toggleFavorite } = productsSlice.actions;
export default productsSlice.reducer;
