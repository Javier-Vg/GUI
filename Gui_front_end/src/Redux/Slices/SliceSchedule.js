// scheduleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const domain = window.location.hostname 

// Thunk para realizar la llamada a la API
export const fetchSchedule = createAsyncThunk(
  'schedule/fetchSchedule',
  async () => {
    const response = await fetch(`http://${domain}:8000/api/schedule/schedule/`); // Cambia esto por tu API
    if (!response.ok) {
      throw new Error('Failed to fetch schedule');
    }
    return response.json();
  }
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedule.pending, (state) => {
        state.loading = true; // Indica que la carga ha comenzado
        state.error = null; // Resetea cualquier error anterior
      })
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.items = action.payload; // Almacena los productos en el estado
      })
      .addCase(fetchSchedule.rejected, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.error = action.error.message; // Almacena el error
      });
  },
});

// Exporta el reducer
export default scheduleSlice.reducer;
