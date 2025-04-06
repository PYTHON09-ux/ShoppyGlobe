import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }
    const data = await response.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    filteredItems: [],
    selectedProduct: null,
    searchTerm: '',
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredItems = state.items.filter(product => 
        product.title.toLowerCase().includes(action.payload.toLowerCase()) ||
        product.description.toLowerCase().includes(action.payload.toLowerCase()) ||
        product.category.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    clearSearch: (state) => {
      state.searchTerm = '';
      state.filteredItems = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm, clearSearch } = productsSlice.actions;

export const selectAllProducts = state => state.products.items;
export const selectFilteredProducts = state => state.products.filteredItems;
export const selectProductById = state => state.products.selectedProduct;
export const selectProductsStatus = state => state.products.status;
export const selectProductsError = state => state.products.error;

export default productsSlice.reducer;