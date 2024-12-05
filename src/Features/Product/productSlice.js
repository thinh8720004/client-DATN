import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import baseApi from './../../utils/api';

// Fetch products with pagination
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, limit, title, category, price }) => {
    const params = {
      page,
      limit,
      ...(title && { title }), // Chỉ thêm title nếu không rỗng
      ...(category && { category }), // Chỉ thêm category nếu không rỗng
      ...(price && {
        minPrice: price[0],
        maxPrice: price[1],
      }),
    };

    const response = await baseApi.get('/products', { params });
    return response.data;
  }
);

export const fetchProductDetails = createAsyncThunk('productDetails/fetchProductDetails', async (productId) => {
  const response = await baseApi.post(`/products/${productId}`); // Adjust the URL as needed
  return response.data;
});

export const fetchRelatedProducts = createAsyncThunk(
  'products/fetchRelatedProducts',
  async (productId) => {
    const response = await baseApi.get(`/products/${productId}/related`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    product: {},
    status: 'idle',
    error: null,
    totalDocs: 0,
    totalPages: 0,
    currentPage: 1,
    searchText: "",
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload; // Action để cập nhật searchText
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.products;
        state.totalDocs = action.payload.totalDoc;
        state.totalPages = action.payload.pages;
        state.currentPage = action.meta.arg.page;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.relatedProducts = action.payload;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchText } = productSlice.actions;
export default productSlice.reducer;