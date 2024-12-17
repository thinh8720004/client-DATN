import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseApi from "../../utils/api";
import { toast } from "react-hot-toast";

const initialState = {
  items: [],
  totalAmount: 0,
  status: "idle",
  error: null,
};

const MAX_QUANTITY = 100;

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productDetails, { rejectWithValue,dispatch  }) => {
    try {
      const response = await baseApi.post("/cart/add", productDetails);
      dispatch(getCartItems());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (data, { rejectWithValue }) => {
    try {
      const response = await baseApi.put("/cart/update", data);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data)
      const response = await baseApi.put("/cart/item", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await baseApi.get("/cart/get", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const product = action.payload;
        const existingItem = state.items.find(
          (item) => item.productID === product.productID
        );
        if (existingItem) {
          if (existingItem.quantity < MAX_QUANTITY) {
            existingItem.quantity += 1;
            state.totalAmount += product.productPrice;
          }
        } else {
          state.items.push({ ...product, quantity: 1 });
          state.totalAmount += product.productPrice;
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateQuantity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedItems = action.payload.items;
    
        state.items = updatedItems.map((updatedItem) => {
          const existingItem = state.items.find(
            (item) => item.productID === updatedItem.productID
          );
          return {
            ...existingItem, 
            ...updatedItem, 
          };
        });
    
        state.totalAmount = action.payload.totalPrice;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        // state.totalAmount = action.payload.totalPrice;
        state.totalPrice = state.items.reduce(
          (sum, item) => sum + item.productPrice * item.quantity,
          0
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.totalAmount = action.payload.totalPrice;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;
