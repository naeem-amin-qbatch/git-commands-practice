import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage";
import products from "../redux/slices/product";
import cart from "./slices/cart";
import user from "./slices/user";
import {
  persistStore,
  persistReducer,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, user);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    cart: cart,
    products: products,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export const persistor = persistStore(store);

