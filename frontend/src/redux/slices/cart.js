import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios";

export const addToCart = createAsyncThunk(
  "/cart/addToCart",
  async ({ product, user_id }, { rejectWithValue }) => {
    if (product, user_id) {
      try {
        product = product._id;
        const response = axios.post("/cart/add-to-cart", { user_id, product })
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
    } else
      alert('Parameters not found')
  }
);

export const showCart = createAsyncThunk(
  "/cart/showCart",
  async (user_id, { rejectWithValue }) => {
    if (user_id) {
      try {
        let data = await axios.get(`/cart/${user_id}`)
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
    } else
      alert('Parameters not found')
  }
);

export const updateQuantity = createAsyncThunk(
  "/cart/updateQuantity",
  async (cartInfo, { rejectWithValue }) => {
    if (cartInfo) {
      try {
        const { data } = await axios.put(`/cart/updateCart`, cartInfo);
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
    } else
      alert('Parameters not found')
  }
);

export const removeCartProduct = createAsyncThunk(
  "/cart/removeCartProduct",
  async ({ p_id: product, user_id }, { rejectWithValue }) => {
    if (product, user_id) {
      try {
        const { data } = await axios.put('/cart/removeCartProduct', { product, user_id });
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
    } else
      alert('Parameters not found')
  }
);



const initialState = {
  cartUpdate: false,
  cartRemove: false,
  loading: false,
  err: false,
}
const cart = createSlice(
  {
    name: 'cart',
    initialState,
    reducers: {
      setCartState(state, { payload: { field, value } }) {
        state[field] = value;
      },
      totalBill(user_id){

      }
    },
    extraReducers: {
      [addToCart.pending]: (state, action) => ({
        ...state,
        loading: true,
      }),
      [addToCart.fulfilled]: (state, action) => ({
        ...state,
        loading: false,
      }),
      [addToCart.rejected]: (state, action) => ({
        ...state,
        loading: false,
        err: action.payload.err,
      }),
      [showCart.pending]: (state, action) => ({
        ...state,
        loading: true,
      }),
      [showCart.fulfilled]: (state, action) => ({
        ...state,
        loading: false,
      }),
      [showCart.rejected]: (state, action) => ({
        ...state,
        loading: false,
        err: action.payload.err,
      }),
      [updateQuantity.pending]: (state, action) => ({
        ...state,
        loading: true,
        cartUpdate: false
      }),
      [updateQuantity.fulfilled]: (state, action) => ({
        ...state,
        loading: false,
        cartUpdate: true
      }),
      [updateQuantity.rejected]: (state, action) => ({
        ...state,
        loading: false,
        cartUpdate: false,
        err: action.payload.err,
      }),
      [removeCartProduct.pending]: (state, action) => ({
        ...state,
        loading: true,
        cartRemove: false
      }),
      [removeCartProduct.fulfilled]: (state, action) => ({
        ...state,
        loading: false,
        cartRemove: true
      }),
      [removeCartProduct.rejected]: (state, action) => ({
        ...state,
        loading: false,
        cartRemove: false,
        err: action.payload.err,
      }),
    },
  },
)

export const { setCartState } = cart.actions;
export default cart.reducer;
