import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '../types/types';

export const CategoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => 'products/categories',
    }),
  }),
});

export const { useGetCategoriesQuery } = CategoriesApi;
