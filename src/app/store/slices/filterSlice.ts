import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../slices/apiSlice";

interface FilterState {
  searchQuery: string;
  category: string | null;
  priceRange: [number, number];
  filteredProducts: Product[];
}

const initialState: FilterState = {
  searchQuery: "",
  category: null,
  priceRange: [0, 1000],
  filteredProducts: [],
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
    filterProducts: (state, action: PayloadAction<Product[]>) => {
      state.filteredProducts = action.payload.filter((product) => {
        const matchesSearch = product.title
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase());
        const matchesCategory =
          !state.category || product.category === state.category;
        const matchesPrice =
          product.price >= state.priceRange[0] &&
          product.price <= state.priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
      });
    },
  },
});

export const {
  setSearchQuery,
  setCategory,
  setPriceRange,
  resetFilters,
  filterProducts,
} = filterSlice.actions;

export const selectFilters = (state: { filter: FilterState }) => state.filter;
export const selectFilteredProducts = (state: { filter: FilterState }) =>
  state.filter.filteredProducts;

export default filterSlice.reducer;
