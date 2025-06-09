import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        dashboard: dashboardReducer, // Will be used for graph data
    },
    // We can add middleware here if needed
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myLogger),
});