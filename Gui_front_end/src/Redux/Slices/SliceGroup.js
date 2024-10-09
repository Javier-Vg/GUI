// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const domain = window.location.hostname 

// Thunk para realizar la llamada a la API
export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async () => {
    const response = await fetch(`http://${domain}:8000/api/groups/groups/`); // Cambia esto por tu API
    if (!response.ok) {
      throw new Error('Failed to fetch groups');
    }
    return response.json();
  }
);

const productSlice = createSlice({
  name: 'group',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true; // Indica que la carga ha comenzado
        state.error = null; // Resetea cualquier error anterior
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.items = action.payload; // Almacena los productos en el estado
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.error = action.error.message; // Almacena el error
      });
  },
});

// Exporta el reducer
export default productSlice.reducer;
