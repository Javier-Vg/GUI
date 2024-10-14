// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const domain = window.location.hostname 

// Thunk para realizar la llamada a la API
export const fetchContract = createAsyncThunk(
  'contract/fetchContract',
  async () => {
    const response = await fetch(`http://${domain}:8000/api/contracts/contracts/`); // Cambia esto por tu API
    if (!response.ok) {
      throw new Error('Failed to fetch Contract');
    }
    return response.json();
  }
);

const productSlice = createSlice({
  name: 'contract',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContract.pending, (state) => {
        state.loading = true; // Indica que la carga ha comenzado
        state.error = null; // Resetea cualquier error anterior
      })
      .addCase(fetchContract.fulfilled, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.items = action.payload; // Almacena los productos en el estado
      })
      .addCase(fetchContract.rejected, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.error = action.error.message; // Almacena el error
      });
  },
});

// Exporta el reducer
export default productSlice.reducer;
