import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../types';
import { loginUser } from '../api/auth';
import { RootState } from '.';

const initialState: AuthState = { 
  token: localStorage.getItem('token') || "",
  isLoading: false,
  error: null
};

export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async ({username, password}: {username:string, password:string}) => {
      return await loginUser(username, password)      
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        localStorage.removeItem('token');
      });
  }
});

export const { logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;