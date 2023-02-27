import { configureStore } from "@reduxjs/toolkit";
import { Product } from "./../models/Products";
import { InitialAuth } from "../models/InitialAuth";
import products from "./state/productsSlice";
import auth from "./state/authSlice";

export interface AppStore {
  products: {
    list: Array<Product>;
    detail: Product;
  };
  auth: InitialAuth;
}

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    auth,
    products
  }
});
