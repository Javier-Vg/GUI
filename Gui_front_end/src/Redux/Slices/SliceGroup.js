// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para realizar la llamada a la API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://api.example.com/products'); // Cambia esto por tu API
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true; // Indica que la carga ha comenzado
        state.error = null; // Resetea cualquier error anterior
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.items = action.payload; // Almacena los productos en el estado
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.error = action.error.message; // Almacena el error
      });
  },
});

// Exporta el reducer
export default productSlice.reducer;
