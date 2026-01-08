import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login as loginApi } from '../../services/api'

export const login = createAsyncThunk(
  'auth/login',
  async (creds, { rejectWithValue }) => {
    try {
      const data = await loginApi(creds)
      localStorage.setItem('token', data.token) // Side effect here is cleaner for simple apps
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.token = action.payload.token
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
