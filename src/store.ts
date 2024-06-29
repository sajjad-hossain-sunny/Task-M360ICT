import { ProductsApi } from "./services/api";

import { configureStore } from "@reduxjs/toolkit";
import { CategoriesApi } from "./services/CategoriesApi";

export const store = configureStore({
  reducer: {
    [ProductsApi.reducerPath]: ProductsApi.reducer,
    [CategoriesApi.reducerPath]: CategoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ProductsApi.middleware,
      CategoriesApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
