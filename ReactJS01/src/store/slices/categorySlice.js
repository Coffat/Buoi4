import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategoriesApi } from '../../util/api';

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCategoriesApi();
      return res;
    } catch (err) {
      return rejectWithValue(err.message || 'Lỗi tải danh mục');
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
