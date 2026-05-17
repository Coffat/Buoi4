import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductsApi, getProductDetailApi, getSimilarProductsApi } from '../../util/api';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (params, { rejectWithValue }) => {
    try {
      const res = await getProductsApi(params);
      return res;
    } catch (err) {
      return rejectWithValue(err.message || 'Lỗi tải sản phẩm');
    }
  }
);

export const fetchProductDetail = createAsyncThunk(
  'product/fetchProductDetail',
  async (slug, { rejectWithValue }) => {
    try {
      const res = await getProductDetailApi(slug);
      return res;
    } catch (err) {
      return rejectWithValue(err.message || 'Lỗi tải chi tiết sản phẩm');
    }
  }
);

export const fetchSimilarProducts = createAsyncThunk(
  'product/fetchSimilarProducts',
  async (slug, { rejectWithValue }) => {
    try {
      const res = await getSimilarProductsApi(slug);
      return res;
    } catch (err) {
      return rejectWithValue(err.message || 'Lỗi tải sản phẩm tương tự');
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    list: [],
    total: 0,
    page: 1,
    totalPages: 1,
    detail: null,
    similar: [],
    loading: false,
    detailLoading: false,
    error: null,
  },
  reducers: {
    clearDetail: (state) => {
      state.detail = null;
      state.similar = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.products;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductDetail.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.detail = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.similar = action.payload;
      });
  },
});

export const { clearDetail } = productSlice.actions;
export default productSlice.reducer;
