import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios";

export const userLogin = createAsyncThunk(
  "/user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/login", data)
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

export const userSignUp = createAsyncThunk(
  "/user/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users/adduser', data)
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

const user = createSlice({
  name: "user",
  initialState: {
    loading: false,
    err: "",
    userId: "",
    message: "",
  },
  reducers: {},
  extraReducers: {
    [userLogin.pending]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [userLogin.fulfilled]: (state, action) => ({
      ...state,
      loading: true,
      userId: action.payload._id,
      message: action.payload,
    }),
    [userLogin.rejected]: (state, action) => ({
      ...state,
      loading: false,
      err: action.payload.err,
    }),
    [userSignUp.pending]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [userSignUp.fulfilled]: (state, action) => ({
      ...state,
      loading: true,
      userId: action.payload._id,
      message: action.payload
    }),
    [userSignUp.rejected]: (state, action) => ({
      ...state,
      loading: false,
      err: action.payload.err,
    }),
  },
});

const { reducer } = user;
export default reducer;
