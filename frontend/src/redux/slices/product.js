import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios";

export const getAllProducts = createAsyncThunk(
  "/products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/products/all')
      return data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      } else {
        return rejectWithValue({
          err: "Network Error",
        });
      }
    }
  }
);

export const productById = createAsyncThunk(
  "/products/productById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/products/${productId}`)
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      } else {
        return rejectWithValue({
          err: "Network Error",
        });
      }
    }
  }
);


const products = createSlice({
  name: "products",
  initialState: {
    loading: false,
    err: "",
    allProducts: [],
    productDescription: [],
    productId: '',
  },
  reducers: {
    setProductId(state, action) {
      state.productId = action.payload;
    },
  },

  extraReducers: {
    [getAllProducts.pending]: (state, action) => ({
        ...state,
        loading: true,
    }),
    [getAllProducts.fulfilled]: (state, action) => {
      state.allProducts = action.payload;
    },
    [getAllProducts.rejected]: (state, action) => ({
        ...state,
        loading: false,
        err: action.payload.err,
    }),

    [productById.pending]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [productById.fulfilled]: (state, action) => {
      state.productDescription = action.payload;
      state.loading = false;
    },
    [productById.rejected]: (state, action) => ({
      ...state,
      loading: false,
      err: action.payload.err,
    }),
  }
});

const { reducer } = products;
export const { setProductId } = products.actions;
export default reducer;
