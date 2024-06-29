import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ProductsApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit, skip }) => {
        let url = 'products';
        if (limit !== 0) {
          url += `?limit=${limit}&skip=${skip}`;
        } else {
          url += `?limit=0&skip=0`;
        }
        return url;
      },
    }),
  }),
});

export const { useGetProductsQuery } = ProductsApi;

