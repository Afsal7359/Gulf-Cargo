import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetAllInvoice } from '../../Api/Invoice';

export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async (pageNumber, { getState }) => {
    const { invoices } = getState();
    const response = await GetAllInvoice(pageNumber);
    if (response.success) {
      return response.data.data;
    } else {
      throw new Error(response.message || 'Unexpected data format');
    }
  }
);

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState: {
    data: [],
    page: 1,
    loading: false,
    hasMore: true,
  },
  reducers: {
    resetInvoices: (state) => {
      state.data = [];
      state.page = 1;
      state.hasMore = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, ...action.payload];
        state.page += 1;
        if (action.payload.length === 0) {
          state.hasMore = false;
        }
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        console.error('Fetch failed:', action.error.message);
      });
  },
});

export const { resetInvoices } = invoiceSlice.actions;

export default invoiceSlice.reducer;
