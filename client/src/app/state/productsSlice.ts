import { Product } from "./../../models/Products";
import { createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../services/httpRequest";

export const initialList: Array<Product> = [];
export const initialDetail = {} as Product;

export const productSlice = createSlice({
  name: "products",
  initialState: {
    list: initialList,
    detail: initialDetail
  },
  reducers: {
    setProductsList: (state, action) => {
      state.list = action.payload;
    },
    setDetailProduct: (state, action) => {
      state.detail = action.payload;
    },
    deleteProduct: (state, action) => {
      const productUnit = state.list.find(produc => produc.id === action.payload);
      if (productUnit) {
        state.list.splice(state.list.indexOf(productUnit), 1);
      }
    },

    updateProduct: (state, action) => {
      const { price, produtName, description, quantityInStock, idProduct } = action.payload;
      const productUnit = state.list.find(produc => produc.id === idProduct);
      if (productUnit) {
        productUnit.price = price;
        productUnit.productName = produtName;
        productUnit.description = description;
        productUnit.quantityInStock = quantityInStock;
      } else {
        console.log("error");
      }
    }
  }
});

export const { setProductsList, deleteProduct, updateProduct, setDetailProduct } =
  productSlice.actions;

export default productSlice.reducer;

export const getAllProducts = () => async (dispatch: any) => {
  try {
    const { products } = await getRequest("/products");
    dispatch(setProductsList(products));
  } catch (error) {
    console.log(error);
  }
};

export const getProductsById = (id: string) => async (dispatch: any) => {
  try {
    const { product } = await getRequest(`/products/${id}`);
    dispatch(setDetailProduct(product));
  } catch (error) {
    console.log(error);
  }
};
