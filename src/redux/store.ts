import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { addressApi, countriesApi } from "../services";
import { addressListSlice, settingsSlice } from "./slices";

const persistConfig = {
  key: "root",
  storage: storage,
  // I decided not to persist the address list and countries list so I blacklisted them
  blacklist: ["api/addresses", "api/countries"],
};
export const rootReducers = combineReducers({
  addressList: addressListSlice.reducer,
  settings: settingsSlice.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [countriesApi.reducerPath]: countriesApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = configureStore({
  // Add the generated reducer as a specific top-level slice
  reducer: persistedReducer,

  devTools: process.env.NODE_ENV !== "production",
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([addressApi.middleware, countriesApi.middleware]),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
