import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "../../../entities/product/Product.types";

interface FilterState {
  searchQuery: string;
  category: string | null;
  priceRange: [number, number];
}

const initialState: FilterState = {
  searchQuery: "",
  category: null,
  priceRange: [0, 1000],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = "";
      state.category = null;
      state.priceRange = [0, 1000];
    },
  },
});

export const selectFilteredProducts = createSelector(
  [
    (state: RootState) => state.filter,
    (state: RootState, products: Product[]) => products,
  ],
  (filter, products) => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(filter.searchQuery.toLowerCase());
      const matchesCategory =
        !filter.category || product.category === filter.category.toLowerCase();
      const matchesPrice =
        product.price >= filter.priceRange[0] &&
        product.price <= filter.priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }
);

export const { setSearchQuery, setCategory, setPriceRange, resetFilters } =
  filterSlice.actions;

export const selectCurrentSearch = (state: RootState) =>
  state.filter.searchQuery;
export const selectCurrentCategory = (state: RootState) =>
  state.filter.category;
export const selectCurrentPriceRange = (state: RootState) =>
  state.filter.priceRange;

export default filterSlice.reducer;
