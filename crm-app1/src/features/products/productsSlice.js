import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunks for Products CRUD Operations

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to fetch products');
            }
            return data.products; // DummyJSON returns { products: [], total, skip, limit }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data.message || `Failed to fetch product with ID: ${id}`);
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (newProduct, { rejectWithValue }) => {
        try {
            // DummyJSON doesn't actually persist data, but it simulates a successful addition.
            const response = await fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            });
            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to add product');
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, updatedProduct }, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'PUT', // Or PATCH
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct)
            });
            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to update product');
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to delete product');
            }
            return { id, data }; // Return the ID to easily remove from state
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        selectedProduct: null, // For edit/view
        loading: false,
        error: null,
        successMessage: null, // For displaying success messages
    },
    reducers: {
        clearProductError: (state) => {
            state.error = null;
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch products';
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedProduct = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
                state.error = null;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch product';
                state.selectedProduct = null;
            })
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                // DummyJSON returns a new product with an ID, so add it to the state
                state.products.push(action.payload);
                state.error = null;
                state.successMessage = 'Product added successfully!';
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to add product';
                state.successMessage = null;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                // Update the product in the array
                const index = state.products.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                state.error = null;
                state.successMessage = 'Product updated successfully!';
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to update product';
                state.successMessage = null;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(product => product.id !== action.payload.id);
                state.error = null;
                state.successMessage = 'Product deleted successfully!';
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to delete product';
                state.successMessage = null;
            });
    },
});

export const { clearProductError, clearSuccessMessage } = productsSlice.actions;
export default productsSlice.reducer;