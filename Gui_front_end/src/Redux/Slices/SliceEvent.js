// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const domain = window.location.hostname 

// Thunk para realizar la llamada a la API
export const fetchEvent = createAsyncThunk(
  'event/fetchEvent',
  async () => {
    const response = await fetch(`http://${domain}:8000/api/events/events/`); // Cambia esto por tu API
    if (!response.ok) {
      throw new Error('Failed to fetch Event');
    }
    return response.json();
  }
);

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvent.pending, (state) => {
        state.loading = true; // Indica que la carga ha comenzado
        state.error = null; // Resetea cualquier error anterior
      })
      .addCase(fetchEvent.fulfilled, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.items = action.payload; // Almacena los productos en el estado
      })
      .addCase(fetchEvent.rejected, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.error = action.error.message; // Almacena el error
      });
  },
});

// Exporta el reducer
export default eventSlice.reducer;
