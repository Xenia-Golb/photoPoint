import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Product,
  ProductsParams,
} from "../../../entities/product/Product.types";
export const fakeStoreApi = createApi({
  reducerPath: "fakeStoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], ProductsParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();

        if (params) {
          if (params.limit)
            queryParams.append("limit", params.limit.toString());
          if (params.sort) queryParams.append("sort", params.sort);
          if (params.category) queryParams.append("category", params.category);
        }

        return {
          url: `/products${queryParams.toString() ? `?${queryParams}` : ""}`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product" as const, id })),
              "Product",
            ]
          : ["Product"],
    }),

    getCategories: builder.query<string[], void>({
      query: () => "/products/categories",
      transformResponse: (response: string[]) =>
        response.map(
          (category) => category.charAt(0).toUpperCase() + category.slice(1)
        ),
    }),
  }),
});
export const { useGetProductsQuery, useGetCategoriesQuery } = fakeStoreApi;
