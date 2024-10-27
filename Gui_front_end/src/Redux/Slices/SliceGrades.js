// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const domain = window.location.hostname 

// Thunk para realizar la llamada a la API
export const fetchGrades = createAsyncThunk(
  'grades/fetchGrades',
  async () => {
    const response = await fetch(`http://${domain}:8000/api/grades/grades/`); // Cambia esto por tu API
    if (!response.ok) {
      throw new Error('Failed to fetch Grades');
    }
    return response.json();
  }
);

const GradesSlice = createSlice({
  name: 'grades',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrades.pending, (state) => {
        state.loading = true; // Indica que la carga ha comenzado
        state.error = null; // Resetea cualquier error anterior
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.items = action.payload; // Almacena los productos en el estado
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.error = action.error.message; // Almacena el error
      });
  },
});

// Exporta el reducer
export default GradesSlice.reducer;
