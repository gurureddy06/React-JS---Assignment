import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunk for Login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (!response.ok) {
                // DummyJSON returns an error message in 'message' field for failed auth
                return rejectWithValue(data.message || 'Login failed');
            }
            // Store token and user data in localStorage for persistence
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data));
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async Thunk for User Profile (to get user details after login, if needed)
export const fetchUserProfile = createAsyncThunk(
    'auth/fetchUserProfile',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token || localStorage.getItem('userToken');
        if (!token) {
            return rejectWithValue('No authentication token found.');
        }
        try {
            const response = await fetch('https://dummyjson.com/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to fetch user profile');
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('userData')) || null,
        token: localStorage.getItem('userToken') || null,
        isLoggedIn: !!localStorage.getItem('userToken'), // Check if token exists
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            state.error = null;
            localStorage.removeItem('userToken');
            localStorage.removeItem('userData');
        },
        clearAuthError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload; // Contains user data from dummyjson
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.user = null;
                state.token = null;
                state.error = action.payload || 'Login failed';
            })
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = { ...state.user, ...action.payload }; // Merge profile data
                state.error = null;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // Optionally log out if profile fetch fails due to invalid token
                if (action.payload === 'No authentication token found.' || action.payload.includes('Invalid Token')) {
                    localStorage.removeItem('userToken');
                    localStorage.removeItem('userData');
                    state.isLoggedIn = false;
                    state.user = null;
                    state.token = null;
                }
            });
    },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;