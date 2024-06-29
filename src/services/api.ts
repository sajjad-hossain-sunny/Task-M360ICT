import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://dummyjson.com';

export const ProductsApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Products'],
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
      providesTags: (result) =>
        result
          ? [
              ...result.products.map((id: number) => ({ type: 'Products', id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  }),
});

export const { useGetProductsQuery, useDeleteItemMutation } = ProductsApi;
export default ProductsApi;
