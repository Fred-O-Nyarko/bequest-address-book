import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { addressApi, countriesApi } from "../services";
import { errorMiddleware } from "./middlewares";

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [addressApi.reducerPath]: addressApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([addressApi.middleware, countriesApi.middleware, errorMiddleware]),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;
