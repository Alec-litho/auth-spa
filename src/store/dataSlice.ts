import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DataItem } from '../types';
import { fetchData, createItem, updateItem, deleteItem } from '../api/data';
import { RootState } from '.';

interface DataState {
  items: DataItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DataState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchDataThunk = createAsyncThunk(
  'data/fetchData',
  async (_, { getState }) => {
    const { auth } = getState() as RootState;
    return await fetchData(auth.token!);
  }
);

export const createItemThunk = createAsyncThunk(
  'data/createItem',
  async (item: Omit<DataItem, 'id'>, { getState }) => {
    const { auth } = getState() as RootState;
    return await createItem(auth.token!, item);
  }
);

export const updateItemThunk = createAsyncThunk(
    'data/updateItem',
    async ({ id, ...data }: DataItem, { getState }) => {
      const { auth } = getState() as RootState;
      return await updateItem(auth.token!, id, data);
    }
  );

  export const deleteItemThunk = createAsyncThunk(
    'data/deleteItem',
    async ( id:string , { getState }) => {
      const { auth } = getState() as RootState;
      await deleteItem(auth.token!, id);
      return id
    }
  );


const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDataThunk.fulfilled, (state, action: PayloadAction<DataItem[]>) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchDataThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch data';
        state.isLoading = false;
      })
      .addCase(createItemThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createItemThunk.fulfilled, (state, action: PayloadAction<DataItem>) => {
        state.items.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createItemThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create item';
        state.isLoading = false;
      })
      .addCase(updateItemThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateItemThunk.fulfilled, (state, action: PayloadAction<DataItem>) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(updateItemThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update item';
        state.isLoading = false;
      })
      .addCase(deleteItemThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteItemThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(item => item.id !== action.payload)
        state.isLoading = false;
      })
      .addCase(deleteItemThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete item';
        state.isLoading = false;
      })
  },
});

export default dataSlice.reducer;