// subjectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const domain = window.location.hostname 

// Thunk para realizar la llamada a la API
export const fetchSubjects = createAsyncThunk(
  'subjects/fetchSubjects',
  async () => {
    const response = await fetch(`http://${domain}:8000/api/subjects/subjects/`); // Cambia esto por tu API
    if (!response.ok) {
      throw new Error('Failed to fetch subjects');
    }
    return response.json();
  }
);

const subjectSlice = createSlice({
  name: 'subject',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true; // Indica que la carga ha comenzado
        state.error = null; // Resetea cualquier error anterior
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.items = action.payload; // Almacena los productos en el estado
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.error = action.error.message; // Almacena el error
      });
  },
});

// Exporta el reducer
export default subjectSlice.reducer;
