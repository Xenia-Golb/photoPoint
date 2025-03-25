import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
interface ProductsParams {
  limit?: number;
  sort?: "asc" | "desc";
  category?: string;
}
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
    // Получение всех товаров (с возможностью фильтрации)
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
  }),
});
export const { useGetProductsQuery } = fakeStoreApi;
