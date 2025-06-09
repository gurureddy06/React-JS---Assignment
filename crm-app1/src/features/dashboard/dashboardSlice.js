import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// This slice can be used for fetching specific dashboard analytics
// For now, we might rely on productsSlice to get data for graphs.

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        loading: false,
        error: null,
        // Example: If you had an API for sales data
        // salesData: [],
    },
    reducers: {
        // clearDashboardError: (state) => { state.error = null; }
    },
    extraReducers: (builder) => {
        // Add cases for async thunks if you introduce dashboard-specific API calls
    },
});

export default dashboardSlice.reducer;