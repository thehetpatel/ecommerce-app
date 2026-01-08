import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchProductsApi,
  fetchCategoriesApi,
  fetchProductsByCategoryApi,
} from '../../services/api'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ limit, skip }, { rejectWithValue }) => {
    try {
      return await fetchProductsApi(limit, skip)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCategoriesApi()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category, { rejectWithValue }) => {
    try {
      return await fetchProductsByCategoryApi(category)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  products: [],
  categories: [],
  total: 0,
  isLoading: false,
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload.products
        state.total = action.payload.total
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload.products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export default productsSlice.reducer
