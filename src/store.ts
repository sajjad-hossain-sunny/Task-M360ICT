// import { configureStore } from '@reduxjs/toolkit';
import { ProductsApi } from './services/api';

// export const store = configureStore({
//   reducer: {
//     [ProductsApi.reducerPath]: ProductsApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(ProductsApi.middleware),
// });


import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    [ProductsApi.reducerPath]: ProductsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ProductsApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch