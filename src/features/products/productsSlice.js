import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts, getCategories, getProductsByCategory } from '../../services/api'

export const loadProducts = createAsyncThunk(
  'products/loadAll',
  async ({ limit, skip }, { rejectWithValue }) => {
    try {
      return await getProducts(limit, skip)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const loadCategories = createAsyncThunk(
  'products/loadCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await getCategories()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const loadCategoryProducts = createAsyncThunk(
  'products/loadByCategory',
  async (slug, { rejectWithValue }) => {
    try {
      return await getProductsByCategory(slug)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const initialState = {
  items: [],
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
      // General Products Load
      .addCase(loadProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.products
        state.total = action.payload.total
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Categories
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })

      // Category Filter
      .addCase(loadCategoryProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loadCategoryProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.products
        state.total = action.payload.total
      })
      .addCase(loadCategoryProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export default productsSlice.reducer
